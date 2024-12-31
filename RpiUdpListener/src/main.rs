use flate2::read::GzDecoder;
use itertools::Itertools;
use serde::{Deserialize, Serialize};
use warp::Filter;

use std::fmt;
use std::io::{ErrorKind, Read};
use std::net::{Ipv4Addr, SocketAddrV4, UdpSocket};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration, time::Instant};
use warp::hyper::body::Bytes;

const LED_COUNT: usize = 300;
const COLOR_CHANNELS: usize = 4;
const SOCKET_PORT: u16 = 34254;

// The power supply can go up to 75W, and I want to limit that to no more than 85% utilization.
const POWER_SUPPLY_LIMIT_WATTS: f64 = 75.0;
const POWER_UTILIZATION_LIMIT: f64 = 0.5;
const POWER_LIMIT_WATTS: f64 = POWER_SUPPLY_LIMIT_WATTS * POWER_UTILIZATION_LIMIT;

/* Turning on 150 lights at full brightness white took 4amps from the ammeter.
   Assume 4amps equates to 45W for safety. 45W number was taken from Amazon specs: https://www.amazon.ca/gp/product/B07FVPN3PH/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&th=1

   Amps vs brightness measurements taken with multimeter:
   brightness,amps
   0.1,0.6
   0.2,1.095
   0.3,1.599
   0.4,2.078
   0.5,2.539
   0.6,2.988
   0.7,3.290 (heated up to 3.356)
   0.8,3.580
   0.9,3.803
   1.0,3.918

   Looks kinda like a square root function
*/
const WATTS_PER_LED: f64 = 45.0 / 150.0;
const MAX_FULL_BRIGHTNESS_LEDS: f64 = POWER_LIMIT_WATTS / WATTS_PER_LED;
type PixelColor = [u8; COLOR_CHANNELS];

fn calc_color_with_brightness(color: &[f64; 3], brightness: f64) -> [u8; 3] {
    let calc_channel =
        |color: f64, brightness: f64| ((color * brightness).round() as u8).max(0).min(255);
    [
        calc_channel(color[0], brightness),
        calc_channel(color[1], brightness),
        calc_channel(color[2], brightness),
    ]
}

fn env_var_is_defined(var: &str) -> bool {
    match std::env::var(var) {
        Ok(val) => !val.is_empty(),
        Err(_) => false,
    }
}

struct OptFmt<T>(Option<T>);

impl<T: fmt::Display> fmt::Display for OptFmt<T> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(ref t) = self.0 {
            fmt::Display::fmt(t, f)
        } else {
            f.write_str("-")
        }
    }
}

// adapted from https://github.com/seanmonstar/warp/blob/1cbf029b1867505e1e6f75ae9674613ae3533710/src/filters/log.rs#L33
pub fn make_warp_log_filter(
) -> warp::filters::log::Log<impl Fn(warp::filters::log::Info<'_>) + Copy> {
    let func = move |info: warp::filters::log::Info<'_>| {
        log::info!(
            "{} \"{} {} {:?}\" {} \"{}\" {:?}",
            OptFmt(info.remote_addr()),
            info.method(),
            info.path(),
            info.version(),
            info.status().as_u16(),
            OptFmt(info.referer()),
            info.elapsed(),
        );
    };
    warp::filters::log::custom(func)
}

async fn decompress_body(
    encoding: Option<String>,
    body_bytes: Bytes,
) -> Result<Bytes, warp::Rejection> {
    match encoding.as_deref() {
        Some("gzip" | "x-gzip") => {
            log::info!(
                "Body received with compressed size: {:.2}kb",
                body_bytes.len() as f32 / 1000.0
            );
            let decompressed = tokio::task::spawn_blocking(move || {
                let mut decompressed = Vec::new();
                let mut decoder = GzDecoder::new(body_bytes.as_ref());
                decoder.read_to_end(&mut decompressed).map_err(|err| {
                    log::error!("Failed to decompress: {err}");
                    warp::reject::reject()
                })?;
                Result::<_, warp::Rejection>::Ok(Bytes::from(decompressed))
            })
            .await
            .map_err(|err| {
                log::error!("Failed to join decompression task: {err}");
                warp::reject::reject()
            })??;
            Ok(decompressed)
        }
        Some(encoding) => {
            log::error!("Unknown encoding: {encoding}");
            Err(warp::reject::reject())
        }
        _ => Ok(body_bytes),
    }
}

pub fn body_bytes_with_decompression(
) -> impl Filter<Extract = (Bytes,), Error = warp::Rejection> + Clone {
    warp::header::optional("content-encoding")
        .and(warp::body::bytes())
        .and_then(|encoding: Option<String>, body_bytes: Bytes| async move {
            decompress_body(encoding, body_bytes).await
        })
}

fn main() {
    if !env_var_is_defined("RUST_BACKTRACE") {
        std::env::set_var("RUST_BACKTRACE", "1");
    }

    if env_var_is_defined("RUST_LOG") {
        env_logger::init();
    } else {
        env_logger::builder()
            .filter_level(log::LevelFilter::Error)
            .filter(Some(env!("CARGO_PKG_NAME")), log::LevelFilter::Debug)
            .filter(Some(env!("CARGO_BIN_NAME")), log::LevelFilter::Debug)
            .filter(Some("warp"), log::LevelFilter::Debug)
            .init();
    }

    start_http_server();
}

#[cfg(feature = "rs_ws281x")]
fn build_led_controller() -> rs_ws281x::Controller {
    rs_ws281x::ControllerBuilder::new()
        .channel(
            0,
            rs_ws281x::ChannelBuilder::new()
                .pin(18)
                .count(LED_COUNT as i32)
                .strip_type(rs_ws281x::StripType::Ws2811Grb)
                .brightness(255)
                .build(),
        )
        .build()
        .expect("Error creating LED controller")
}

#[cfg(feature = "rs_ws281x")]
fn clear(controller: &mut rs_ws281x::Controller) {
    let leds = controller.leds_mut(0);
    for led_index in 0..leds.len() {
        leds[led_index] = [0, 0, 0, 0];
    }
    controller.render().unwrap();
}

#[cfg(feature = "rs_ws281x")]
fn render(controller: &mut rs_ws281x::Controller, colors: &Vec<[u8; 3]>) {
    // measured in number of full brightness white pixels
    let total_pixel_brightness = colors.iter().fold(0.0, |acc, color| {
        acc + color[0] as f64 + color[1] as f64 + color[2] as f64
    }) / (255.0 * 3.0);

    let scale_down_factor = if total_pixel_brightness > MAX_FULL_BRIGHTNESS_LEDS {
        MAX_FULL_BRIGHTNESS_LEDS / total_pixel_brightness
    } else {
        1.0
    };
    let scale_down = |val| (val as f64 * scale_down_factor).round() as u8;

    // log::info!("scale_down_factor={:?}", scale_down_factor);

    let leds = controller.leds_mut(0);
    for led_index in 0..leds.len() {
        leds[led_index] = [
            scale_down(colors[led_index][0]),
            scale_down(colors[led_index][1]),
            scale_down(colors[led_index][2]),
            0,
        ];
    }

    controller.render().unwrap();
}

#[cfg(feature = "rs_ws281x")]
fn photograph_pixels() {
    let program_cancelled = Arc::new(AtomicBool::new(false));
    let program_cancelled_1 = program_cancelled.clone();
    let program_cancelled_2 = program_cancelled.clone();

    ctrlc::set_handler(move || {
        log::info!("Program cancelled");
        program_cancelled_1.store(true, Ordering::SeqCst);
    })
    .expect("Error setting Ctrl-C handler");

    thread::spawn(move || {
        let mut controller = build_led_controller();

        let mut colors: [[u8; 3]; LED_COUNT] = [[0; 3]; LED_COUNT];
        let white = calc_color_with_brightness(&[255.0, 255.0, 255.0], 1.0);
        // colors[0] = color;
        // colors[275] = color;

        render(&mut controller, &colors.to_vec());

        let mut counter = 0;

        loop {
            if program_cancelled_2.load(Ordering::SeqCst) || counter == LED_COUNT {
                clear(&mut controller);
                break;
            }

            let mut colors: [[u8; 3]; LED_COUNT] = [[0; 3]; LED_COUNT];
            let color = calc_color_with_brightness(&[255.0, 255.0, 255.0], 1.0);
            colors[counter] = color;

            render(&mut controller, &colors.to_vec());

            counter += 1;
            thread::sleep(Duration::from_millis(500));
        }
    })
    .join()
    .unwrap();
}

#[cfg(feature = "rs_ws281x")]
fn brightness_breathe_animation() {
    let program_cancelled = Arc::new(AtomicBool::new(false));
    let program_cancelled_1 = program_cancelled.clone();
    let program_cancelled_2 = program_cancelled.clone();

    ctrlc::set_handler(move || {
        log::info!("Program cancelled");
        program_cancelled_1.store(true, Ordering::SeqCst);
    })
    .expect("Error setting Ctrl-C handler");

    thread::spawn(move || {
        let mut controller = build_led_controller();

        log::info!("Number of LEDs: {:?}", controller.leds_mut(0).len());

        // [B, G, R]
        let color = [255.0, 255.0, 255.0];
        let max_brightness = 0.25;
        let mut brightness = 0.0;
        let mut increasing = true;
        let mut i = 0;

        let start = Instant::now();

        //  max is about 159 on rpi
        let TARGET_FPS: f64 = 60.0;
        let TARGET_FRAME_TIME: u128 = (1_000_000_000.0 / TARGET_FPS).round() as u128;

        loop {
            let mut colors: [[u8; 3]; LED_COUNT] = [[0; 3]; LED_COUNT];

            if program_cancelled_2.load(Ordering::SeqCst) {
                clear(&mut controller);
                break;
            }

            let frame_start = Instant::now();

            for led_index in 0..colors.len() {
                if (led_index % 2 == 0) {
                    colors[led_index] = calc_color_with_brightness(&color, brightness);
                }
            }

            // log::info!("Brightness: {:?}, Color: {:?}", brightness, colors[30]);
            render(&mut controller, &colors.to_vec());
            brightness += (if increasing { 1.0 } else { -1.0 }) * max_brightness / 100.0;
            if (brightness > max_brightness && increasing) {
                increasing = false;
                brightness = max_brightness;
            }
            if (brightness < 0.0 && increasing == false) {
                increasing = true;
                brightness = 0.0;
            }
            i += 1;

            if (i % (TARGET_FPS as i32) == 0) {
                let fps = i as f32 / Instant::now().duration_since(start).as_secs_f32();
                log::info!("Render rate: {:?}Hz, frametime: {:?}ms", fps, 1000.0 / fps);
                log::info!("Brightness: {:?}", brightness);
            }

            let now = Instant::now();
            let current_frame_time_nanos = now.duration_since(frame_start).as_nanos();

            if (current_frame_time_nanos < TARGET_FRAME_TIME) {
                thread::sleep(Duration::from_nanos(
                    (TARGET_FRAME_TIME - current_frame_time_nanos) as u64,
                ));
            }
        }
    })
    .join()
    .unwrap();
}

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
struct Animation {
    frames: Vec<PixelColor>, // flattened list
    should_loop: bool,
}

fn start_http_server() {
    let shared_animation_id: Arc<Mutex<usize>> = Arc::new(Mutex::new(Default::default()));
    let shared_animation_id_1 = shared_animation_id.clone();
    #[cfg(feature = "rs_ws281x")]
    let shared_animation_id_2 = shared_animation_id.clone();

    let shared_animation: Arc<Mutex<Animation>> = Arc::new(Mutex::new(Default::default()));
    let shared_animation_1 = shared_animation.clone();
    #[cfg(feature = "rs_ws281x")]
    let shared_animation_2 = shared_animation.clone();

    let shared_frame: Arc<Mutex<Vec<PixelColor>>> = Arc::new(Mutex::new(Default::default()));
    let shared_frame_1 = shared_frame.clone();
    #[cfg(feature = "rs_ws281x")]
    let shared_frame_2 = shared_frame.clone();

    let program_cancelled = Arc::new(AtomicBool::new(false));
    let program_cancelled_1 = program_cancelled.clone();
    let program_cancelled_2 = program_cancelled.clone();
    #[cfg(feature = "rs_ws281x")]
    let program_cancelled_3 = program_cancelled.clone();

    let http_server_thread_handle =
        {
            thread::spawn(move || {
                tokio::runtime::Builder::new_multi_thread()
                    .enable_all()
                    .build()
                    .unwrap()
                    .block_on(async {
                        let port = 8000;

                        let frontend_static_files = warp::fs::dir("../TreeControllerWeb/dist");

                        let hello =
                            warp::path!("treecontroller-api" / "hello").map(|| "Hello from warp!");
                        let goodbye = warp::path!("treecontroller-api" / "goodbye")
                            .map(|| "Goodbye from warp!");

                        let post_animation = warp::post()
                            .and(warp::path!("treecontroller-api" / "animation"))
                            .and(warp::body::content_length_limit(
                                // max animation length of ~1 second?
                                std::mem::size_of::<[u8; LED_COUNT * (COLOR_CHANNELS * 2) * 3000]>(
                                )
                                .try_into()
                                .unwrap(),
                            ))
                            .and(body_bytes_with_decompression())
                            .map(move |body_bytes: Bytes| {
                                let first_byte = *body_bytes.first().unwrap();
                                let frames: Vec<PixelColor> =
                                    bytemuck::cast_slice(&body_bytes[1..]).to_vec();

                                let should_loop = first_byte != 0;

                                log::info!(
                                    "Body received with size: {:.2}kb",
                                    body_bytes.len() as f32 / 1000.0
                                );

                                *shared_animation_1.lock().unwrap() = Animation {
                                    frames,
                                    should_loop,
                                };
                                *shared_animation_id_1.lock().unwrap() += 1;
                                warp::reply()
                            })
                            .with(
                                warp::cors()
                                    .allow_any_origin()
                                    .allow_headers(&[warp::http::header::CONTENT_TYPE])
                                    .allow_headers(&[warp::http::header::CONTENT_ENCODING])
                                    .allow_methods(&[warp::http::method::Method::POST]),
                            );

                        let (http_server_shutdown_sender, mut http_server_shutdown_receiver) =
                            tokio::sync::mpsc::channel(8);

                        let (_addr, server) = warp::serve(
                            frontend_static_files
                                .or(hello)
                                .or(goodbye)
                                .or(post_animation)
                                .with(make_warp_log_filter())
                                .with(warp::compression::deflate()),
                        )
                        .bind_with_graceful_shutdown(([0, 0, 0, 0], port), async move {
                            http_server_shutdown_receiver.recv().await;
                        });

                        tokio::task::spawn(server);

                        tokio::signal::ctrl_c().await.unwrap();
                        log::info!("Received Ctrl-C signal");
                        program_cancelled_1.store(true, Ordering::SeqCst);
                        http_server_shutdown_sender.send(()).await.unwrap();
                    });
            })
        };

    let udp_server_thread_handle = thread::spawn(move || {
        let socket =
            UdpSocket::bind(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, SOCKET_PORT)).unwrap();
        socket
            .set_read_timeout(Some(Duration::from_millis(1000)))
            .unwrap();
        loop {
            if program_cancelled_2.load(Ordering::SeqCst) {
                break;
            }
            let mut received_data = [0u8; LED_COUNT * COLOR_CHANNELS];
            match socket.recv_from(&mut received_data) {
                Ok((numbers_received, _)) => {
                    let received_colors: Vec<PixelColor> = received_data
                        .iter()
                        .take(numbers_received)
                        .cloned()
                        .tuples::<(u8, u8, u8, u8)>()
                        .map(|(r, g, b, a)| [r, g, b, a])
                        .collect();
                    *shared_frame_1.lock().unwrap() = received_colors;
                }
                Err(err) => {
                    if err.kind() != ErrorKind::WouldBlock && err.kind() != ErrorKind::TimedOut {
                        log::info!("{:?}", err);
                    }
                }
            }
        }
    });

    #[cfg(feature = "rs_ws281x")]
    let led_render_thread_handle = thread::spawn(move || {
        let mut controller = build_led_controller();

        assert_eq!(LED_COUNT, controller.leds_mut(0).len(), "LED_COUNT variable should be equal to the number of LEDs we're connected to. Something seems to be misconfigured");

        let mut animation_frame_counter = 0;
        let mut animation_id = 0;

        loop {
            let frame_start = Instant::now();
            let leds = controller.leds_mut(0);

            if program_cancelled_3.load(Ordering::SeqCst) {
                clear(&mut controller);
                break;
            }

            let received_udp_frame: Vec<PixelColor> =
                shared_frame_2.lock().unwrap().drain(..).collect();

            let received_animation_id: usize = *shared_animation_id_2.lock().unwrap();

            if animation_id != received_animation_id {
                animation_frame_counter = 0;
                animation_id = received_animation_id;
            }

            let received_animation_frame = {
                let received_animation = shared_animation_2.lock().unwrap();

                match received_animation.frames.is_empty() {
                    false => {
                        let animation_frame_count =
                            (received_animation.frames.len() / LED_COUNT).max(1);

                        if !received_animation.should_loop
                            && animation_frame_counter == animation_frame_count
                        {
                            None
                        } else {
                            let frame_index = if received_animation.should_loop {
                                animation_frame_counter % animation_frame_count
                            } else {
                                animation_frame_counter.min(animation_frame_count - 1)
                            };
                            Some(
                                received_animation.frames
                                    [(frame_index * LED_COUNT)..((frame_index + 1) * LED_COUNT)]
                                    .to_vec(),
                            )
                        }
                    }
                    true => None,
                }
            };

            if received_animation_frame.is_some() {
                animation_frame_counter += 1;
            }

            let chosen_frame: Option<&[PixelColor]> = if !received_udp_frame.is_empty() {
                Some(&received_udp_frame)
            } else {
                received_animation_frame.as_deref()
            };

            if let Some(frame) = chosen_frame {
                let mut colors: [[u8; 3]; LED_COUNT] = [[0; 3]; LED_COUNT];

                for led_index in 0..colors.len() {
                    if led_index < frame.len() {
                        let received_color = frame[led_index];
                        // log::info!("final_color = {:?}", final_color);
                        colors[led_index] = calc_color_with_brightness(
                            &[
                                received_color[0] as f64,
                                received_color[1] as f64,
                                received_color[2] as f64,
                            ],
                            (received_color[3] as f64) / 255.0,
                        );
                    } else {
                        colors[led_index] = [0, 0, 0];
                    }
                }

                render(&mut controller, &colors.to_vec());

                let now = Instant::now();
                let current_frame_time_nanos = now.duration_since(frame_start).as_nanos();

                let TARGET_FPS: f64 = 60.0;
                let TARGET_FRAME_TIME: u128 = (1_000_000_000.0 / TARGET_FPS).round() as u128;

                if (current_frame_time_nanos < TARGET_FRAME_TIME) {
                    spin_sleep::sleep(Duration::from_nanos(
                        (TARGET_FRAME_TIME - current_frame_time_nanos) as u64,
                    ));
                } else {
                    log::info!(
                        "Warning: render took too long: {:?}",
                        now.duration_since(frame_start)
                    );
                }
            } else {
                spin_sleep::sleep(Duration::from_millis(30));
            }
        }
    });

    udp_server_thread_handle.join().unwrap();
    #[cfg(feature = "rs_ws281x")]
    led_render_thread_handle.join().unwrap();
    http_server_thread_handle.join().unwrap();
}
