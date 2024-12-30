use itertools::Itertools;
use serde::{Deserialize, Serialize};
use warp::Filter;

use std::io::ErrorKind;
use std::net::{Ipv4Addr, SocketAddrV4, UdpSocket};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration, time::Instant};

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

fn main() {
    println!("MAX_FULL_BRIGHTNESS_LEDS={:?}", MAX_FULL_BRIGHTNESS_LEDS);
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

    // println!("scale_down_factor={:?}", scale_down_factor);

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
        println!("Program cancelled");
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
        println!("Program cancelled");
        program_cancelled_1.store(true, Ordering::SeqCst);
    })
    .expect("Error setting Ctrl-C handler");

    thread::spawn(move || {
        let mut controller = build_led_controller();

        println!("Number of LEDs: {:?}", controller.leds_mut(0).len());

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

            // println!("Brightness: {:?}, Color: {:?}", brightness, colors[30]);
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
                println!("Render rate: {:?}Hz, frametime: {:?}ms", fps, 1000.0 / fps);
                println!("Brightness: {:?}", brightness);
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
                            .and(warp::body::bytes())
                            .map(move |body_bytes: warp::hyper::body::Bytes| {
                                let frames: Vec<PixelColor> =
                                    bytemuck::cast_slice(&body_bytes).to_vec();

                                *shared_animation_1.lock().unwrap() = Animation {
                                    frames,
                                    should_loop: true,
                                };
                                *shared_animation_id_1.lock().unwrap() += 1;
                                warp::reply()
                            })
                            .with(
                                warp::cors()
                                    .allow_any_origin()
                                    .allow_headers(&[warp::http::header::CONTENT_TYPE])
                                    .allow_methods(&[warp::http::method::Method::POST]),
                            );

                        let (http_server_shutdown_sender, mut http_server_shutdown_receiver) =
                            tokio::sync::mpsc::channel(8);

                        let (_addr, server) = warp::serve(
                            frontend_static_files
                                .or(hello)
                                .or(goodbye)
                                .or(post_animation),
                        )
                        .bind_with_graceful_shutdown(([0, 0, 0, 0], port), async move {
                            http_server_shutdown_receiver.recv().await;
                        });

                        tokio::task::spawn(server);

                        tokio::signal::ctrl_c().await.unwrap();
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
                        println!("{:?}", err);
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
                        let animation_frame_count = received_animation.frames.len() / (LED_COUNT);

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
                        // println!("final_color = {:?}", final_color);
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
                    println!(
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
