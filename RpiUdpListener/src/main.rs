use rs_ws281x::ChannelBuilder;
use rs_ws281x::Controller;
use rs_ws281x::ControllerBuilder;
use rs_ws281x::StripType;

use itertools::Itertools;

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
    print_colors_from_udp();
}

fn make_controller() -> Controller {
    ControllerBuilder::new()
        .channel(
            0,
            ChannelBuilder::new()
                .pin(18)
                .count(LED_COUNT as i32)
                .strip_type(StripType::Ws2811Grb)
                .brightness(255)
                .build(),
        )
        .build()
        .expect("Error creating LED controller")
}

fn clear(controller: &mut Controller) {
    let leds = controller.leds_mut(0);
    for led_index in 0..leds.len() {
        leds[led_index] = [0, 0, 0, 0];
    }
    controller.render().unwrap();
}

fn render(controller: &mut Controller, colors: &Vec<[u8; 3]>) {
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
        let mut controller = make_controller();

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

            counter += 1;
            thread::sleep(Duration::from_millis(500));
        }
    })
    .join()
    .unwrap();
}

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
        let mut controller = make_controller();

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

fn print_colors_from_udp() {
    let shared_array: Arc<Mutex<Vec<PixelColor>>> = Arc::new(Mutex::new(Vec::new()));
    let shared_array_1 = shared_array.clone();
    let shared_array_2 = shared_array.clone();

    let program_cancelled = Arc::new(AtomicBool::new(false));
    let program_cancelled_1 = program_cancelled.clone();
    let program_cancelled_2 = program_cancelled.clone();
    let program_cancelled_3 = program_cancelled.clone();

    ctrlc::set_handler(move || {
        println!("Program cancelled");
        program_cancelled_1.store(true, Ordering::SeqCst);
    })
    .expect("Error setting Ctrl-C handler");

    let receiver_thread_handle = thread::spawn(move || {
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
                    // println!("received {:?} colors", received_colors.len());
                    {
                        let mut shared_array = shared_array_1.lock().unwrap();
                        *shared_array = received_colors;
                    }
                }
                Err(err) => {
                    println!("{:?}", err);
                }
            }
        }
    });

    let render_thread_handle = thread::spawn(move || {
        let mut controller = make_controller();

        println!("LED_COUNT: {:?}", LED_COUNT);
        println!("Number of LEDs: {:?}", controller.leds_mut(0).len());

        // [B, G, R]
        let color = [233.0, 182.0, 115.0];
        let mut i = 0;

        let start = Instant::now();

        //  max is about 159 on rpi
        let TARGET_FPS: f64 = 60.0;
        let TARGET_FRAME_TIME: u128 = (1_000_000_000.0 / TARGET_FPS).round() as u128;

        loop {
            let frame_start = Instant::now();
            let leds = controller.leds_mut(0);
            let mut colors: [[u8; 3]; LED_COUNT] = [[0; 3]; LED_COUNT];

            if program_cancelled_3.load(Ordering::SeqCst) {
                clear(&mut controller);
                break;
            }

            let received_color_array: Vec<PixelColor> = {
                let shared_array = shared_array_2.lock().unwrap();
                shared_array.to_vec()
            };

            for led_index in 0..colors.len() {
                if led_index < received_color_array.len() {
                    let received_color = received_color_array[led_index];
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
            i += 1;

            if (i % (TARGET_FPS as i32) == 0) {
                let fps = i as f32 / Instant::now().duration_since(start).as_secs_f32();
                println!("Render rate: {:?}Hz, frametime: {:?}ms", fps, 1000.0 / fps);

                let total_pixel_brightness = colors.to_vec().iter().fold(0.0, |acc, color| {
                    acc + color[0] as f64 + color[1] as f64 + color[2] as f64
                }) / (255.0 * 3.0);

                let scale_down_factor = if total_pixel_brightness > MAX_FULL_BRIGHTNESS_LEDS {
                    MAX_FULL_BRIGHTNESS_LEDS / total_pixel_brightness
                } else {
                    1.0
                };
                let scale_down = |val| (val as f64 * scale_down_factor).round() as u8;

                let scaled_colors: Vec<[u8; 3]> = colors
                    .to_vec()
                    .iter()
                    .map(|color| {
                        [
                            scale_down(color[0]),
                            scale_down(color[1]),
                            scale_down(color[2]),
                        ]
                    })
                    .collect();

                let final_total_pixel_brightness = scaled_colors.iter().fold(0.0, |acc, color| {
                    acc + color[0] as f64 + color[1] as f64 + color[2] as f64
                }) / (255.0 * 3.0);

                println!(
                    "total_pixel_brightness={:?}, scale_down_factor={:?}, final_total_pixel_brightness={:?}",
                    total_pixel_brightness, scale_down_factor, final_total_pixel_brightness
                );
            }

            let now = Instant::now();
            let current_frame_time_nanos = now.duration_since(frame_start).as_nanos();

            if (current_frame_time_nanos < TARGET_FRAME_TIME) {
                thread::sleep(Duration::from_nanos(
                    (TARGET_FRAME_TIME - current_frame_time_nanos) as u64,
                ));
            }
        }
    });

    receiver_thread_handle.join().unwrap();
    render_thread_handle.join().unwrap();
}
