`LedPosHelper/` contains a python program that displays images one by one and lets you click a certain location in each image (or refrain from doing so) and records your results in a json file. I took 4 videos of the tree while it was turning on the LEDs one by one, then converted the videos to lists of images (1 per frame), then ran `markLocations.py` once per video. The folder also includes a script `processResults.js` that converts the resulting coordinates from the various tree views into a best-guess 3D coordinate by using the results of the python program.



https://user-images.githubusercontent.com/2389735/148658290-517858ca-cf97-4016-84e2-2178caf471f5.mp4



https://user-images.githubusercontent.com/2389735/148658301-e69fe64c-c0df-4549-a96e-c3fb9146aea3.mp4

