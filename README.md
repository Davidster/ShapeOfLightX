## RpiUdpListener

Rust program meant to run on a Raspberry Pi that's connected to the LED lights. It listens to UDP messages on the local Wifi where each message contains the full list of colors to display. As soon as such a message is received, the lights are updated with the new values. It also includes some other utilities like some simple animations used for the `LedPosHelper` as well as limiting the total brightness of the LEDs so as to limit the power usage if necessary.

## LedPosHelper

Python program that displays images one by one and lets you click a certain location in each image (or refrain from doing so) and records your results in a json file. I took 4 videos of the tree while it was turning on the LEDs one by one, then converted the videos to lists of images (1 per frame), then ran `markLocations.py` once per video. The folder also includes a script `processResults.js` that converts the resulting coordinates from the various tree views into a best-guess 3D coordinate by using the results of the python program.

## TreeControllerApp

React native app meant to run on my Android phone (never tested iOS) which talks to the RpiUdpListener in order to control the lights. Unfortunately, this means that animations only work while the phone screen is on, as the app stops sending UDP messages as soon as you turn it off. Some sample animations can be seen below:

This animation is similar to the one that's produced by the `animateRandomCrossSections` function in `TreeControllerApp/App.tsx`, except that it uses a hardcoded direction for the plane to move in as opposed to a random one.

https://user-images.githubusercontent.com/2389735/148658290-517858ca-cf97-4016-84e2-2178caf471f5.mp4

This animation uses the phone's tilt feature to control the lights, changing the pitch of the phone controls the position of the rainbow along the vertical axis of the tree, and changing the roll controls the level of [saturation](https://en.wikipedia.org/wiki/HSL_and_HSV) of the rainbow.

https://user-images.githubusercontent.com/2389735/148658301-e69fe64c-c0df-4549-a96e-c3fb9146aea3.mp4

## Products

Here are the particular products I used to get this project up and running:

- 2 x 150 [Alitove 16.4ft WS2812B LEDs](https://www.amazon.ca/gp/product/B07FVPN3PH), for a total of 300 LEDs
- [Raspberry Pi 2 Model B](https://www.raspberrypi.com/products/raspberry-pi-2-model-b/) with a Micro USB cable and AC adapter
- [JOVNO 5V 15A AC Adapter](https://www.amazon.ca/gp/product/B08CZW6L1G)
- [Some 18 Gauge Wires](https://www.amazon.ca/gp/product/B01LH1FQJ0)
- [DC 5.5MM x 2.1MM Female Plug to Bare Wire Open End Power Wire](https://www.amazon.ca/gp/product/B08PYT6HZ2)

TODO: add pictures!