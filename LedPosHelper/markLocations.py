import numpy as np
import argparse
import cv2
import json
from os import listdir
from os.path import isfile, join

# litFrameRanges.json is inclusive ranges. It is the range of frames numbers for each video for which the LEDs are actually on

# the folder pointed to by path contains the video of the tree converted into images
# with image per frame, and the image file names contain the frame number so they
# can be sorted chronologically
viewNumber = "4"
path = f"/home/david/Videos/tree_{viewNumber}/frames"

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
onlyfiles.sort()

imagePositionDict = {}
currentMousePos = None


def onMouseMove(event, x, y, p1, p2):
    global currentMousePos
    currentMousePos = (x, y)


for file in onlyfiles:
    print(file)
    image = cv2.imread(join(path, file))
    row, col = image.shape[:2]
    bottom = image[row-2:row, 0:col]
    mean = cv2.mean(bottom)[0]

    bordersize = 3
    border = cv2.copyMakeBorder(
        image,
        top=bordersize,
        bottom=bordersize,
        left=bordersize,
        right=bordersize,
        borderType=cv2.BORDER_CONSTANT,
        value=[255, 255, 255]
    )
    # print(file)
    cv2.imshow("img", image)
    cv2.namedWindow('img')
    cv2.setMouseCallback('img', onMouseMove)
    key = cv2.waitKey(0)
    val = None
    if key == 27:  # space bar
        quit()
    if key == 32:  # space bar
        val = currentMousePos
    imagePositionDict[file] = val
    print(f"Added {val} to {file}")

with open(f"tree_{viewNumber}.json", 'w') as fp:
    json.dump(imagePositionDict, fp)

# def on_click(event, x, y, p1, p2):
#     if event == cv2.EVENT_LBUTTONDOWN:
#         cv2.circle(lastImage, (x, y), 3, (255, 0, 0), -1)