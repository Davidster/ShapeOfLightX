use rs_ws281x::ChannelBuilder;
use rs_ws281x::ControllerBuilder;
use rs_ws281x::StripType;

use itertools::Itertools;

use std::net::{Ipv4Addr, SocketAddrV4, UdpSocket};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration, time::Instant};

const LED_COUNT: usize = 150;
const COLOR_CHANNELS: usize = 4;
const SOCKET_PORT: u16 = 34254;

type PixelColor = [u8; COLOR_CHANNELS];

fn get_color_channel(color: f64, brightness: f64) -> u8 {
    ((color * brightness).round() as u8).max(0).min(255)
}

fn get_color(color: &[f64; 3], brightness: f64) -> [u8; 3] {
    [
        get_color_channel(color[0], brightness),
        get_color_channel(color[1], brightness),
        get_color_channel(color[2], brightness),
    ]
}

fn main() {
    print_colors_from_udp();
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
        let mut controller = ControllerBuilder::new()
            .channel(
                0,
                ChannelBuilder::new()
                    .pin(18)
                    .count(300)
                    .strip_type(StripType::Ws2811Grb)
                    .brightness(255)
                    .build(),
            )
            .build()
            .expect("Error creating LED controller");

        let leds = controller.leds_mut(0);
        let color = get_color(&[255.0, 255.0, 255.0], 1.0);
        leds[0] = [color[0], color[1], color[2], 0];
        leds[275] = [color[0], color[1], color[2], 0];

        controller.render().unwrap();

        loop {
            let leds = controller.leds_mut(0);

            if program_cancelled_2.load(Ordering::SeqCst) == true {
                for led_index in 0..leds.len() {
                    leds[led_index] = [0, 0, 0, 0];
                }
                controller.render().unwrap();
                break;
            }

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
        let mut controller = ControllerBuilder::new()
            .channel(
                0,
                ChannelBuilder::new()
                    .pin(18)
                    .count(300)
                    .strip_type(StripType::Ws2811Grb)
                    .brightness(255)
                    .build(),
            )
            .build()
            .expect("Error creating LED controller");

        println!("Number of LEDs: {:?}", controller.leds_mut(0).len());

        // [B, G, R]
        let color = [255.0, 255.0, 255.0];
        let max_brightness = 0.25;
        let mut brightness = 0.0;
        let mut increasing = true;
        let mut i = 0;

        let start = Instant::now();

        //  max is about 159 on rpi
        let TARGET_FPS: f64 = 120.0;
        let TARGET_FRAME_TIME: u128 = (1_000_000_000.0 / TARGET_FPS).round() as u128;

        loop {
            let leds = controller.leds_mut(0);

            if program_cancelled_2.load(Ordering::SeqCst) == true {
                for led_index in 0..leds.len() {
                    let final_color = get_color(&color, brightness);
                    leds[led_index] = [0, 0, 0, 0];
                }
                controller.render().unwrap();
                break;
            }

            let frame_start = Instant::now();

            for led_index in 0..leds.len() {
                if (led_index % 2 == 0) {
                    let final_color = get_color(&color, brightness);
                    leds[led_index] = [final_color[0], final_color[1], final_color[2], 0];
                }
            }

            // println!("Brightness: {:?}, Color: {:?}", brightness, leds[30]);
            controller.render().unwrap();
            brightness += (if increasing { 1.0 } else { -1.0 }) * max_brightness / 100.0;
            if (brightness > max_brightness && increasing == true) {
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
            if program_cancelled_2.load(Ordering::SeqCst) == true {
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
        let mut controller = ControllerBuilder::new()
            .channel(
                0,
                ChannelBuilder::new()
                    .pin(18)
                    .count(LED_COUNT as i32)
                    .strip_type(StripType::Ws2812)
                    .brightness(255)
                    .build(),
            )
            .build()
            .expect("Error creating LED controller");

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

            if program_cancelled_3.load(Ordering::SeqCst) == true {
                for led_index in 0..leds.len() {
                    leds[led_index] = [0, 0, 0, 0];
                }
                controller.render().unwrap();
                break;
            }

            let received_color_array: Vec<PixelColor> = {
                let shared_array = shared_array_2.lock().unwrap();
                shared_array.to_vec()
            };

            for led_index in 0..leds.len() {
                if led_index < received_color_array.len() {
                    let received_color = received_color_array[led_index];
                    let final_color = get_color(
                        &[
                            received_color[0] as f64,
                            received_color[1] as f64,
                            received_color[2] as f64,
                        ],
                        (received_color[3] as f64) / 255.0,
                    );
                    // println!("final_color = {:?}", final_color);
                    leds[led_index] = [final_color[0], final_color[1], final_color[2], 0];
                } else {
                    leds[led_index] = [0, 0, 0, 0];
                }
            }

            controller.render().unwrap();
            i += 1;

            if (i % (TARGET_FPS as i32) == 0) {
                let fps = i as f32 / Instant::now().duration_since(start).as_secs_f32();
                println!("Render rate: {:?}Hz, frametime: {:?}ms", fps, 1000.0 / fps);
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
