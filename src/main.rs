use rs_ws281x::ChannelBuilder;
use rs_ws281x::ControllerBuilder;
use rs_ws281x::StripType;

use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::{thread, time::Duration, time::Instant};

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
    brightness_breathe_animation();
}

fn photograph_pixels() {
    let program_cancelled = Arc::new(AtomicBool::new(false));
    let program_cancelled_1 = program_cancelled.clone();
    let program_cancelled_2 = program_cancelled.clone();

    ctrlc::set_handler(move || {
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
                if (led_index%2 == 0) {
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

            if (i % 60 == 0) {
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