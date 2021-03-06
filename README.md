Clone of this project from stand up maths: https://www.youtube.com/watch?v=TvlpIojusBE.

It is an set of applications that can be used to help map out the 3d coordinates of an array of LEDs on your christmas tree and then control and run some 3D-aware animations through your mobile phone.

## RpiUdpListener

Rust program meant to run on a Raspberry Pi that's connected some WS2812B LED lights. It listens to UDP messages on the local Wifi where each message contains the full list of colors to display. As soon as such a message is received, the lights are updated with the new values. It also includes some other utilities like some simple animations used for the `LedPosHelper` as well as limiting the total brightness of the LEDs so as to limit the power usage if necessary.

## LedPosHelper

Python program that displays images one by one and lets you click a certain location in each image (or refrain from doing so) and records your results in a json file. I took 4 videos of the tree while it was turning on the LEDs one by one, then converted the videos to lists of images (1 per frame), then ran `markLocations.py` once per video. The folder also includes a script `processResults.js` that converts the resulting coordinates from the various tree views into a best-guess 3D coordinate by using the results of the python program.



## TreeControllerApp

React native app meant to run on my Android phone (never tested iOS) which talks to the RpiUdpListener in order to control the lights. Unfortunately, this means that animations only work while the phone screen is on, as the app stops sending UDP messages as soon as you turn it off. Some sample animations can be seen below.

## Showcase

### 3D points of the tree

The 3D positions of the lights for my tree can be seen on this [codepen](https://codepen.io/davidster/pen/rNGVPmJ)


https://user-images.githubusercontent.com/2389735/179577630-4e01d634-5dd8-4789-94b2-3ca10cc83314.mp4

### Cross-section animation

This animation is similar to the one that's produced by the `animateRandomCrossSections` function in `TreeControllerApp/App.tsx`, except that it uses a hardcoded direction for the plane to move in as opposed to a random one.

https://user-images.githubusercontent.com/2389735/148658301-e69fe64c-c0df-4549-a96e-c3fb9146aea3.mp4

### Phone-controlled animation

This animation which is similar to the one produced by the `orientationRainbow` function in `TreeControllerApp/App.tsx` uses the phone's "tilt sensor" to control the lights, changing the pitch of the phone controls the position of the rainbow along the vertical axis of the tree, and changing the roll controls the level of [saturation](https://en.wikipedia.org/wiki/HSL_and_HSV) of the rainbow.

https://user-images.githubusercontent.com/2389735/148658290-517858ca-cf97-4016-84e2-2178caf471f5.mp4

## Products

Here are the particular products I used to get this project up and running:

- 2 x 150 [Alitove 16.4ft WS2812B LEDs](https://www.amazon.ca/gp/product/B07FVPN3PH), for a total of 300 LEDs:

![image](https://user-images.githubusercontent.com/2389735/148700921-a7084d02-b202-4a18-9cdc-1e6d8fda1c4b.png)

- [Raspberry Pi 2 Model B](https://www.raspberrypi.com/products/raspberry-pi-2-model-b/) with a Micro USB cable and AC adapter:

![image](https://user-images.githubusercontent.com/2389735/148700931-bfeb23c3-b007-404e-a098-3b46c5eb113a.png)

- [JOVNO 5V 15A AC Adapter](https://www.amazon.ca/gp/product/B08CZW6L1G) (theoretically underpowered for 300 LEDs):

![image](https://user-images.githubusercontent.com/2389735/148700940-b9913ae2-489a-4635-9c14-00756dbd02b5.png)

- [Some 18 Gauge Wires](https://www.amazon.ca/gp/product/B01LH1FQJ0):

![image](https://user-images.githubusercontent.com/2389735/148700948-1fc57524-ede5-41ab-a4cf-893d9ced3038.png)

- [DC 5.5MM x 2.1MM Female Plug to Bare Wire Open End Power Wire](https://www.amazon.ca/gp/product/B08PYT6HZ2):

![image](https://user-images.githubusercontent.com/2389735/148700960-43cf0873-e8f2-426b-b899-dbf2e587399a.png)
