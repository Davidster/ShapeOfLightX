export type LedCoord = {
  confidence: number;
  value: number;
};

export type LedPosition = {
  frameRange: [number, number];
  x: LedCoord | null;
  y: LedCoord;
  z: LedCoord | null;
};

const rawLedPositions: LedPosition[] = [
  {
    frameRange: [0, 2],
    x: {
      confidence: 3,
      value: 120.99999999999999,
    },
    y: {
      confidence: 6,
      value: 775.6666666666666,
    },
    z: {
      confidence: 3,
      value: 1.6666666666666665,
    },
  },
  {
    frameRange: [2, 4],
    x: {
      confidence: 4,
      value: 126.25,
    },
    y: {
      confidence: 8,
      value: 772.75,
    },
    z: {
      confidence: 4,
      value: -14.75,
    },
  },
  {
    frameRange: [4, 6],
    x: {
      confidence: 4,
      value: 127.75,
    },
    y: {
      confidence: 8,
      value: 763.625,
    },
    z: {
      confidence: 4,
      value: -29.75,
    },
  },
  {
    frameRange: [6, 8],
    x: {
      confidence: 4,
      value: 112.75,
    },
    y: {
      confidence: 8,
      value: 764.875,
    },
    z: {
      confidence: 4,
      value: -47,
    },
  },
  {
    frameRange: [8, 10],
    x: {
      confidence: 4,
      value: 96,
    },
    y: {
      confidence: 8,
      value: 762.875,
    },
    z: {
      confidence: 4,
      value: -75,
    },
  },
  {
    frameRange: [10, 12],
    x: {
      confidence: 4,
      value: 77.75,
    },
    y: {
      confidence: 7.111111111111111,
      value: 765.3515625,
    },
    z: {
      confidence: 3.111111111111111,
      value: -79.64285714285714,
    },
  },
  {
    frameRange: [12, 13],
    x: {
      confidence: 2,
      value: 58.5,
    },
    y: {
      confidence: 4,
      value: 770.75,
    },
    z: {
      confidence: 2,
      value: -92,
    },
  },
  {
    frameRange: [13, 15],
    x: {
      confidence: 4,
      value: 40.75,
    },
    y: {
      confidence: 8,
      value: 764.5,
    },
    z: {
      confidence: 4,
      value: -93.25,
    },
  },
  {
    frameRange: [15, 17],
    x: {
      confidence: 4,
      value: 26,
    },
    y: {
      confidence: 8,
      value: 753.375,
    },
    z: {
      confidence: 4,
      value: -83.5,
    },
  },
  {
    frameRange: [17, 19],
    x: {
      confidence: 4,
      value: 23.5,
    },
    y: {
      confidence: 8,
      value: 744.625,
    },
    z: {
      confidence: 4,
      value: -61.75,
    },
  },
  {
    frameRange: [19, 21],
    x: {
      confidence: 4,
      value: 34,
    },
    y: {
      confidence: 8,
      value: 733.25,
    },
    z: {
      confidence: 4,
      value: -39.25,
    },
  },
  {
    frameRange: [21, 23],
    x: {
      confidence: 4,
      value: 47.25,
    },
    y: {
      confidence: 8,
      value: 720.75,
    },
    z: {
      confidence: 4,
      value: -34.75,
    },
  },
  {
    frameRange: [23, 25],
    x: {
      confidence: 4,
      value: 59.75,
    },
    y: {
      confidence: 8,
      value: 707.375,
    },
    z: {
      confidence: 4,
      value: -46.25,
    },
  },
  {
    frameRange: [25, 27],
    x: {
      confidence: 4,
      value: 66.25,
    },
    y: {
      confidence: 8,
      value: 687.125,
    },
    z: {
      confidence: 4,
      value: -63.25,
    },
  },
  {
    frameRange: [27, 29],
    x: {
      confidence: 4,
      value: 61.25,
    },
    y: {
      confidence: 8,
      value: 677,
    },
    z: {
      confidence: 4,
      value: -76,
    },
  },
  {
    frameRange: [29, 31],
    x: {
      confidence: 4,
      value: 37.5,
    },
    y: {
      confidence: 8,
      value: 662.5,
    },
    z: {
      confidence: 4,
      value: -71.5,
    },
  },
  {
    frameRange: [31, 33],
    x: {
      confidence: 4,
      value: 22.75,
    },
    y: {
      confidence: 8,
      value: 646.5,
    },
    z: {
      confidence: 4,
      value: -52.75,
    },
  },
  {
    frameRange: [33, 35],
    x: {
      confidence: 4,
      value: 15.5,
    },
    y: {
      confidence: 8,
      value: 644.125,
    },
    z: {
      confidence: 4,
      value: -37.5,
    },
  },
  {
    frameRange: [35, 37],
    x: {
      confidence: 4,
      value: 22.5,
    },
    y: {
      confidence: 8,
      value: 631.5,
    },
    z: {
      confidence: 4,
      value: -21.25,
    },
  },
  {
    frameRange: [37, 39],
    x: {
      confidence: 3.111111111111111,
      value: 35.089285714285715,
    },
    y: {
      confidence: 7.111111111111111,
      value: 623.3515625,
    },
    z: {
      confidence: 4,
      value: -12.25,
    },
  },
  {
    frameRange: [39, 40],
    x: {
      confidence: 2,
      value: 53.5,
    },
    y: {
      confidence: 4,
      value: 611,
    },
    z: {
      confidence: 2,
      value: -22.5,
    },
  },
  {
    frameRange: [40, 42],
    x: {
      confidence: 4,
      value: 58.25,
    },
    y: {
      confidence: 8,
      value: 599.125,
    },
    z: {
      confidence: 4,
      value: -31.25,
    },
  },
  {
    frameRange: [42, 44],
    x: {
      confidence: 4,
      value: 65.25,
    },
    y: {
      confidence: 7.555555555555555,
      value: 589.8455882352941,
    },
    z: {
      confidence: 3.5555555555555554,
      value: -46.015625,
    },
  },
  {
    frameRange: [44, 46],
    x: {
      confidence: 3.111111111111111,
      value: 47.91071428571428,
    },
    y: {
      confidence: 6.666666666666666,
      value: 578.675,
    },
    z: {
      confidence: 3.5555555555555554,
      value: -65.90625,
    },
  },
  {
    frameRange: [46, 48],
    x: {
      confidence: 4,
      value: 29.75,
    },
    y: {
      confidence: 8,
      value: 581.875,
    },
    z: {
      confidence: 4,
      value: -62,
    },
  },
  {
    frameRange: [48, 50],
    x: {
      confidence: 3,
      value: 27.33333333333333,
    },
    y: {
      confidence: 6.111111111111111,
      value: 585.8818181818182,
    },
    z: {
      confidence: 3.111111111111111,
      value: -47.28571428571428,
    },
  },
  {
    frameRange: [50, 52],
    x: {
      confidence: 2.4444444444444446,
      value: 42.15909090909091,
    },
    y: {
      confidence: 6.444444444444445,
      value: 572.7672413793102,
    },
    z: {
      confidence: 4,
      value: -29.75,
    },
  },
  {
    frameRange: [52, 54],
    x: {
      confidence: 2.111111111111111,
      value: 59.84210526315789,
    },
    y: {
      confidence: 6.111111111111111,
      value: 562.7818181818182,
    },
    z: {
      confidence: 4,
      value: -28.75,
    },
  },
  {
    frameRange: [54, 56],
    x: {
      confidence: 4,
      value: 64.75,
    },
    y: {
      confidence: 7.333333333333334,
      value: 536.1590909090909,
    },
    z: {
      confidence: 3.3333333333333335,
      value: -37.9,
    },
  },
  {
    frameRange: [56, 58],
    x: {
      confidence: 3.111111111111111,
      value: 55.03571428571428,
    },
    y: {
      confidence: 6,
      value: 519.3611111111111,
    },
    z: {
      confidence: 2.8888888888888893,
      value: -55.71153846153846,
    },
  },
  {
    frameRange: [58, 60],
    x: {
      confidence: 2.666666666666667,
      value: 35.25,
    },
    y: {
      confidence: 4.777777777777779,
      value: 521.8255813953488,
    },
    z: {
      confidence: 2.111111111111111,
      value: -62.55263157894736,
    },
  },
  {
    frameRange: [60, 62],
    x: {
      confidence: 1.1111111111111112,
      value: 34.8,
    },
    y: {
      confidence: 3.555555555555556,
      value: 522.15625,
    },
    z: {
      confidence: 2.4444444444444446,
      value: -45.86363636363636,
    },
  },
  {
    frameRange: [62, 64],
    x: {
      confidence: 2.111111111111111,
      value: 39.55263157894737,
    },
    y: {
      confidence: 5.111111111111111,
      value: 511.92391304347825,
    },
    z: {
      confidence: 3,
      value: -29.666666666666664,
    },
  },
  {
    frameRange: [64, 66],
    x: {
      confidence: 2,
      value: 56,
    },
    y: {
      confidence: 5.333333333333334,
      value: 494.56249999999994,
    },
    z: {
      confidence: 3.3333333333333335,
      value: -30.6,
    },
  },
  {
    frameRange: [66, 67],
    x: {
      confidence: 1,
      value: 64,
    },
    y: {
      confidence: 2.5555555555555554,
      value: 485.6521739130435,
    },
    z: {
      confidence: 1.5555555555555556,
      value: -50.78571428571428,
    },
  },
  {
    frameRange: [67, 69],
    x: {
      confidence: 4,
      value: 57.25,
    },
    y: {
      confidence: 7.333333333333334,
      value: 469.3636363636364,
    },
    z: {
      confidence: 3.3333333333333335,
      value: -72.89999999999999,
    },
  },
  {
    frameRange: [69, 71],
    x: {
      confidence: 4,
      value: 39.25,
    },
    y: {
      confidence: 8,
      value: 459.25,
    },
    z: {
      confidence: 4,
      value: -76.5,
    },
  },
  {
    frameRange: [71, 73],
    x: {
      confidence: 4,
      value: 15.25,
    },
    y: {
      confidence: 8,
      value: 446.875,
    },
    z: {
      confidence: 4,
      value: -65,
    },
  },
  {
    frameRange: [73, 75],
    x: {
      confidence: 4,
      value: 8.5,
    },
    y: {
      confidence: 7.777777777777778,
      value: 442.4642857142858,
    },
    z: {
      confidence: 3.7777777777777777,
      value: -46.75,
    },
  },
  {
    frameRange: [75, 77],
    x: {
      confidence: 3.111111111111111,
      value: 13.125,
    },
    y: {
      confidence: 7.111111111111111,
      value: 432.3515625,
    },
    z: {
      confidence: 4,
      value: -13.25,
    },
  },
  {
    frameRange: [77, 79],
    x: {
      confidence: 4,
      value: 27.5,
    },
    y: {
      confidence: 8,
      value: 420.125,
    },
    z: {
      confidence: 4,
      value: -10.5,
    },
  },
  {
    frameRange: [79, 81],
    x: {
      confidence: 3.3333333333333335,
      value: 43.15,
    },
    y: {
      confidence: 7.111111111111111,
      value: 401.5703125,
    },
    z: {
      confidence: 3.7777777777777777,
      value: -8.808823529411764,
    },
  },
  {
    frameRange: [81, 83],
    x: {
      confidence: 2.8888888888888893,
      value: 56.480769230769226,
    },
    y: {
      confidence: 6.888888888888889,
      value: 375.75,
    },
    z: {
      confidence: 4,
      value: -10.25,
    },
  },
  {
    frameRange: [83, 85],
    x: {
      confidence: 4,
      value: 72.25,
    },
    y: {
      confidence: 7.333333333333334,
      value: 354.9090909090909,
    },
    z: {
      confidence: 3.3333333333333335,
      value: -32.7,
    },
  },
  {
    frameRange: [85, 87],
    x: {
      confidence: 4,
      value: 56.25,
    },
    y: {
      confidence: 6.888888888888889,
      value: 336.91935483870964,
    },
    z: {
      confidence: 2.8888888888888893,
      value: -47.17307692307692,
    },
  },
  {
    frameRange: [87, 89],
    x: {
      confidence: 4,
      value: 12.25,
    },
    y: {
      confidence: 8,
      value: 328.75,
    },
    z: {
      confidence: 4,
      value: -56.5,
    },
  },
  {
    frameRange: [89, 91],
    x: {
      confidence: 4,
      value: 11,
    },
    y: {
      confidence: 7.777777777777778,
      value: 329.28571428571433,
    },
    z: {
      confidence: 3.7777777777777777,
      value: -38.602941176470594,
    },
  },
  {
    frameRange: [91, 92],
    x: {
      confidence: 2,
      value: 14,
    },
    y: {
      confidence: 4,
      value: 322.25,
    },
    z: {
      confidence: 2,
      value: 5.5,
    },
  },
  {
    frameRange: [92, 94],
    x: {
      confidence: 4,
      value: 26.5,
    },
    y: {
      confidence: 8,
      value: 316.5,
    },
    z: {
      confidence: 4,
      value: 10,
    },
  },
  {
    frameRange: [94, 96],
    x: {
      confidence: 3.7777777777777777,
      value: 46.80882352941177,
    },
    y: {
      confidence: 7.777777777777778,
      value: 306.25,
    },
    z: {
      confidence: 4,
      value: 5.25,
    },
  },
  {
    frameRange: [96, 98],
    x: {
      confidence: 4,
      value: 62.5,
    },
    y: {
      confidence: 7.111111111111111,
      value: 288.9453125,
    },
    z: {
      confidence: 3.111111111111111,
      value: 1.053571428571428,
    },
  },
  {
    frameRange: [98, 100],
    x: {
      confidence: 4,
      value: 60,
    },
    y: {
      confidence: 6.666666666666667,
      value: 270.2,
    },
    z: {
      confidence: 2.666666666666667,
      value: -16.9375,
    },
  },
  {
    frameRange: [100, 102],
    x: {
      confidence: 4,
      value: 43.75,
    },
    y: {
      confidence: 6.888888888888889,
      value: 256.67741935483866,
    },
    z: {
      confidence: 2.888888888888889,
      value: -41.69230769230769,
    },
  },
  {
    frameRange: [102, 104],
    x: {
      confidence: 3.7777777777777777,
      value: 24.558823529411764,
    },
    y: {
      confidence: 7.777777777777778,
      value: 258.95714285714286,
    },
    z: {
      confidence: 4,
      value: -66.25,
    },
  },
  {
    frameRange: [104, 106],
    x: {
      confidence: 4,
      value: 4.25,
    },
    y: {
      confidence: 8,
      value: 261.625,
    },
    z: {
      confidence: 4,
      value: -52.25,
    },
  },
  {
    frameRange: [106, 108],
    x: {
      confidence: 4,
      value: -6.5,
    },
    y: {
      confidence: 7.111111111111111,
      value: 253.921875,
    },
    z: {
      confidence: 3.111111111111111,
      value: -35.92857142857143,
    },
  },
  {
    frameRange: [108, 110],
    x: {
      confidence: 4,
      value: -10,
    },
    y: {
      confidence: 6.666666666666667,
      value: 241.47499999999997,
    },
    z: {
      confidence: 2.666666666666667,
      value: -19.4375,
    },
  },
  {
    frameRange: [110, 112],
    x: {
      confidence: 4,
      value: 1.25,
    },
    y: {
      confidence: 7.111111111111111,
      value: 223.515625,
    },
    z: {
      confidence: 3.111111111111111,
      value: -1.9821428571428577,
    },
  },
  {
    frameRange: [112, 114],
    x: {
      confidence: 4,
      value: 25.25,
    },
    y: {
      confidence: 8,
      value: 206.875,
    },
    z: {
      confidence: 4,
      value: 8.75,
    },
  },
  {
    frameRange: [114, 116],
    x: {
      confidence: 4,
      value: 42,
    },
    y: {
      confidence: 8,
      value: 182.875,
    },
    z: {
      confidence: 4,
      value: -16,
    },
  },
  {
    frameRange: [116, 118],
    x: {
      confidence: 2.8888888888888893,
      value: 16.807692307692303,
    },
    y: {
      confidence: 6.888888888888889,
      value: 167.06451612903226,
    },
    z: {
      confidence: 4,
      value: -39.5,
    },
  },
  {
    frameRange: [118, 119],
    x: {
      confidence: 1.3333333333333335,
      value: 2.2500000000000004,
    },
    y: {
      confidence: 2.4444444444444446,
      value: 173.7272727272727,
    },
    z: {
      confidence: 1.1111111111111112,
      value: -37.5,
    },
  },
  {
    frameRange: [119, 121],
    x: {
      confidence: 4,
      value: -13.75,
    },
    y: {
      confidence: 6.666666666666667,
      value: 176.2,
    },
    z: {
      confidence: 2.666666666666667,
      value: -25.312499999999996,
    },
  },
  {
    frameRange: [121, 123],
    x: {
      confidence: 2.8888888888888893,
      value: 0.6730769230769234,
    },
    y: {
      confidence: 6,
      value: 171.8425925925926,
    },
    z: {
      confidence: 3.111111111111111,
      value: -6.982142857142858,
    },
  },
  {
    frameRange: [123, 125],
    x: {
      confidence: 3.3333333333333335,
      value: 16.45,
    },
    y: {
      confidence: 7.333333333333334,
      value: 158.29545454545453,
    },
    z: {
      confidence: 4,
      value: 0.75,
    },
  },
  {
    frameRange: [125, 127],
    x: {
      confidence: 4,
      value: 31.75,
    },
    y: {
      confidence: 7,
      value: 143.57142857142856,
    },
    z: {
      confidence: 3,
      value: -6,
    },
  },
  {
    frameRange: [127, 129],
    x: {
      confidence: 2.4444444444444446,
      value: 25.636363636363633,
    },
    y: {
      confidence: 4.888888888888889,
      value: 122.5340909090909,
    },
    z: {
      confidence: 2.4444444444444446,
      value: -19.409090909090907,
    },
  },
  {
    frameRange: [129, 131],
    x: {
      confidence: 2.4444444444444446,
      value: 21.545454545454543,
    },
    y: {
      confidence: 4.555555555555555,
      value: 104.73170731707317,
    },
    z: {
      confidence: 2.111111111111111,
      value: -19.31578947368421,
    },
  },
  {
    frameRange: [131, 133],
    x: {
      confidence: 4,
      value: -4,
    },
    y: {
      confidence: 8,
      value: 98.125,
    },
    z: {
      confidence: 4,
      value: -34.5,
    },
  },
  {
    frameRange: [133, 135],
    x: {
      confidence: 4,
      value: -10.75,
    },
    y: {
      confidence: 8,
      value: 80.5,
    },
    z: {
      confidence: 4,
      value: -16,
    },
  },
  {
    frameRange: [135, 137],
    x: {
      confidence: 4,
      value: -1,
    },
    y: {
      confidence: 8,
      value: 69.5,
    },
    z: {
      confidence: 4,
      value: 3.25,
    },
  },
  {
    frameRange: [137, 139],
    x: {
      confidence: 3.111111111111111,
      value: 14.44642857142857,
    },
    y: {
      confidence: 7.111111111111111,
      value: 53.3359375,
    },
    z: {
      confidence: 4,
      value: 5,
    },
  },
  {
    frameRange: [139, 141],
    x: {
      confidence: 4,
      value: 21.75,
    },
    y: {
      confidence: 8,
      value: 39.375,
    },
    z: {
      confidence: 4,
      value: -6.25,
    },
  },
  {
    frameRange: [141, 143],
    x: {
      confidence: 4,
      value: 13.5,
    },
    y: {
      confidence: 8,
      value: 27.875,
    },
    z: {
      confidence: 4,
      value: -19,
    },
  },
  {
    frameRange: [143, 145],
    x: {
      confidence: 4,
      value: 4,
    },
    y: {
      confidence: 8,
      value: 15.25,
    },
    z: {
      confidence: 4,
      value: -24,
    },
  },
  {
    frameRange: [145, 146],
    x: {
      confidence: 2,
      value: -3.5,
    },
    y: {
      confidence: 4,
      value: 9.75,
    },
    z: {
      confidence: 2,
      value: -12,
    },
  },
  {
    frameRange: [146, 148],
    x: {
      confidence: 4,
      value: -2.75,
    },
    y: {
      confidence: 8,
      value: 6.25,
    },
    z: {
      confidence: 4,
      value: 0,
    },
  },
  {
    frameRange: [148, 150],
    x: {
      confidence: 4,
      value: 11,
    },
    y: {
      confidence: 8,
      value: 10,
    },
    z: {
      confidence: 4,
      value: 8.5,
    },
  },
  {
    frameRange: [150, 152],
    x: {
      confidence: 4,
      value: 20.5,
    },
    y: {
      confidence: 8,
      value: 27.25,
    },
    z: {
      confidence: 4,
      value: 3,
    },
  },
  {
    frameRange: [152, 154],
    x: {
      confidence: 4,
      value: 22.5,
    },
    y: {
      confidence: 8,
      value: 44.875,
    },
    z: {
      confidence: 4,
      value: -9,
    },
  },
  {
    frameRange: [154, 156],
    x: {
      confidence: 4,
      value: 18.25,
    },
    y: {
      confidence: 8,
      value: 57.25,
    },
    z: {
      confidence: 4,
      value: -23.75,
    },
  },
  {
    frameRange: [156, 158],
    x: {
      confidence: 4,
      value: 10,
    },
    y: {
      confidence: 8,
      value: 65.875,
    },
    z: {
      confidence: 4,
      value: -34.25,
    },
  },
  {
    frameRange: [158, 160],
    x: {
      confidence: 3,
      value: -0.6666666666666667,
    },
    y: {
      confidence: 7,
      value: 73.71428571428571,
    },
    z: {
      confidence: 4,
      value: -51,
    },
  },
  {
    frameRange: [160, 162],
    x: {
      confidence: 2,
      value: -12.5,
    },
    y: {
      confidence: 6,
      value: 76.66666666666666,
    },
    z: {
      confidence: 4,
      value: -64.75,
    },
  },
  {
    frameRange: [162, 164],
    x: {
      confidence: 2.111111111111111,
      value: -24.499999999999996,
    },
    y: {
      confidence: 6.111111111111111,
      value: 83.04545454545455,
    },
    z: {
      confidence: 4,
      value: -55.25,
    },
  },
  {
    frameRange: [164, 166],
    x: {
      confidence: 2,
      value: -32,
    },
    y: {
      confidence: 5,
      value: 91.4,
    },
    z: {
      confidence: 3,
      value: -41.666666666666664,
    },
  },
  {
    frameRange: [166, 168],
    x: {
      confidence: 4,
      value: -37.75,
    },
    y: {
      confidence: 6.444444444444445,
      value: 104.48275862068968,
    },
    z: {
      confidence: 2.4444444444444446,
      value: -26.27272727272727,
    },
  },
  {
    frameRange: [168, 170],
    x: {
      confidence: 4,
      value: -26.5,
    },
    y: {
      confidence: 6.111111111111111,
      value: 115.31818181818183,
    },
    z: {
      confidence: 2.111111111111111,
      value: -12.868421052631579,
    },
  },
  {
    frameRange: [170, 171],
    x: {
      confidence: 2,
      value: -16,
    },
    y: {
      confidence: 4,
      value: 117,
    },
    z: {
      confidence: 2,
      value: 14,
    },
  },
  {
    frameRange: [171, 173],
    x: {
      confidence: 3,
      value: -13.666666666666666,
    },
    y: {
      confidence: 7,
      value: 122.57142857142856,
    },
    z: {
      confidence: 4,
      value: 24.5,
    },
  },
  {
    frameRange: [173, 175],
    x: {
      confidence: 2.4444444444444446,
      value: 18.795454545454547,
    },
    y: {
      confidence: 6.444444444444445,
      value: 126.99137931034483,
    },
    z: {
      confidence: 4,
      value: 27.5,
    },
  },
  {
    frameRange: [175, 177],
    x: {
      confidence: 2.111111111111111,
      value: 44.28947368421052,
    },
    y: {
      confidence: 6.111111111111111,
      value: 136.81818181818184,
    },
    z: {
      confidence: 4,
      value: 16,
    },
  },
  {
    frameRange: [177, 179],
    x: {
      confidence: 4,
      value: 53.5,
    },
    y: {
      confidence: 8,
      value: 143.25,
    },
    z: {
      confidence: 4,
      value: 3,
    },
  },
  {
    frameRange: [179, 181],
    x: {
      confidence: 4,
      value: 59,
    },
    y: {
      confidence: 8,
      value: 147.125,
    },
    z: {
      confidence: 4,
      value: -19,
    },
  },
  {
    frameRange: [181, 183],
    x: {
      confidence: 3,
      value: 59,
    },
    y: {
      confidence: 7,
      value: 145.42857142857142,
    },
    z: {
      confidence: 4,
      value: -39,
    },
  },
  {
    frameRange: [183, 185],
    x: {
      confidence: 2,
      value: 52,
    },
    y: {
      confidence: 6,
      value: 142.83333333333331,
    },
    z: {
      confidence: 4,
      value: -50,
    },
  },
  {
    frameRange: [185, 187],
    x: {
      confidence: 2,
      value: 41,
    },
    y: {
      confidence: 6,
      value: 140.5,
    },
    z: {
      confidence: 4,
      value: -70.75,
    },
  },
  {
    frameRange: [187, 189],
    x: {
      confidence: 2,
      value: 25.5,
    },
    y: {
      confidence: 6,
      value: 137.5,
    },
    z: {
      confidence: 4,
      value: -76.5,
    },
  },
  {
    frameRange: [189, 191],
    x: {
      confidence: 2,
      value: 9,
    },
    y: {
      confidence: 6,
      value: 137.16666666666666,
    },
    z: {
      confidence: 4,
      value: -96.75,
    },
  },
  {
    frameRange: [191, 193],
    x: {
      confidence: 2,
      value: -8.5,
    },
    y: {
      confidence: 6,
      value: 137.33333333333331,
    },
    z: {
      confidence: 4,
      value: -105.5,
    },
  },
  {
    frameRange: [193, 195],
    x: {
      confidence: 2,
      value: -32.5,
    },
    y: {
      confidence: 6,
      value: 151.83333333333331,
    },
    z: {
      confidence: 4,
      value: -96.5,
    },
  },
  {
    frameRange: [195, 197],
    x: {
      confidence: 2,
      value: -39,
    },
    y: {
      confidence: 5.777777777777778,
      value: 159.375,
    },
    z: {
      confidence: 3.7777777777777777,
      value: -83.48529411764707,
    },
  },
  {
    frameRange: [197, 198],
    x: {
      confidence: 1,
      value: -48,
    },
    y: {
      confidence: 3,
      value: 162.33333333333331,
    },
    z: {
      confidence: 2,
      value: -74.5,
    },
  },
  {
    frameRange: [198, 200],
    x: {
      confidence: 2,
      value: -46.5,
    },
    y: {
      confidence: 5,
      value: 164.8,
    },
    z: {
      confidence: 3,
      value: -61.666666666666664,
    },
  },
  {
    frameRange: [200, 202],
    x: {
      confidence: 2,
      value: -57.5,
    },
    y: {
      confidence: 4,
      value: 167.25,
    },
    z: {
      confidence: 2,
      value: -46.5,
    },
  },
  {
    frameRange: [202, 204],
    x: {
      confidence: 2,
      value: -56,
    },
    y: {
      confidence: 4,
      value: 173.25,
    },
    z: {
      confidence: 2,
      value: -24,
    },
  },
  {
    frameRange: [204, 206],
    x: {
      confidence: 3,
      value: -51.66666666666666,
    },
    y: {
      confidence: 5,
      value: 181.2,
    },
    z: {
      confidence: 2,
      value: -11,
    },
  },
  {
    frameRange: [206, 208],
    x: {
      confidence: 2,
      value: -43.5,
    },
    y: {
      confidence: 4,
      value: 180.5,
    },
    z: {
      confidence: 2,
      value: 18,
    },
  },
  {
    frameRange: [208, 210],
    x: {
      confidence: 2,
      value: -29,
    },
    y: {
      confidence: 4,
      value: 173.75,
    },
    z: {
      confidence: 2,
      value: 32,
    },
  },
  {
    frameRange: [210, 212],
    x: {
      confidence: 2,
      value: -13,
    },
    y: {
      confidence: 4,
      value: 174,
    },
    z: {
      confidence: 2,
      value: 42.5,
    },
  },
  {
    frameRange: [212, 214],
    x: {
      confidence: 2,
      value: 4,
    },
    y: {
      confidence: 4,
      value: 173,
    },
    z: {
      confidence: 2,
      value: 54.5,
    },
  },
  {
    frameRange: [214, 216],
    x: {
      confidence: 2,
      value: 18.5,
    },
    y: {
      confidence: 6,
      value: 182.66666666666666,
    },
    z: {
      confidence: 4,
      value: 62,
    },
  },
  {
    frameRange: [216, 218],
    x: {
      confidence: 2,
      value: 43,
    },
    y: {
      confidence: 4.222222222222222,
      value: 186.39849624060147,
    },
    z: {
      confidence: 2.2222222222222223,
      value: 37.54285714285713,
    },
  },
  {
    frameRange: [218, 220],
    x: {
      confidence: 2,
      value: 53,
    },
    y: {
      confidence: 4.444444444444445,
      value: 191.28750000000002,
    },
    z: {
      confidence: 2.4444444444444446,
      value: 24.454545454545453,
    },
  },
  {
    frameRange: [220, 222],
    x: {
      confidence: 2,
      value: 65,
    },
    y: {
      confidence: 3,
      value: 170,
    },
    z: {
      confidence: 1,
      value: 28,
    },
  },
  {
    frameRange: [222, 223],
    x: {
      confidence: 1,
      value: 78,
    },
    y: {
      confidence: 2,
      value: 168,
    },
    z: {
      confidence: 1,
      value: 13,
    },
  },
  {
    frameRange: [223, 225],
    x: {
      confidence: 3,
      value: 100.33333333333333,
    },
    y: {
      confidence: 5,
      value: 176.8,
    },
    z: {
      confidence: 2,
      value: -4,
    },
  },
  {
    frameRange: [225, 227],
    x: {
      confidence: 2,
      value: 90.5,
    },
    y: {
      confidence: 4,
      value: 163,
    },
    z: {
      confidence: 2,
      value: -26,
    },
  },
  {
    frameRange: [227, 229],
    x: {
      confidence: 2,
      value: 71.5,
    },
    y: {
      confidence: 4,
      value: 163.5,
    },
    z: {
      confidence: 2,
      value: -41.5,
    },
  },
  {
    frameRange: [229, 231],
    x: {
      confidence: 2,
      value: 53.5,
    },
    y: {
      confidence: 4,
      value: 167.5,
    },
    z: {
      confidence: 2,
      value: -65.5,
    },
  },
  {
    frameRange: [231, 233],
    x: {
      confidence: 2,
      value: 39,
    },
    y: {
      confidence: 4,
      value: 173.75,
    },
    z: {
      confidence: 2,
      value: -74.5,
    },
  },
  {
    frameRange: [233, 235],
    x: {
      confidence: 2,
      value: 25.5,
    },
    y: {
      confidence: 5,
      value: 189.39999999999998,
    },
    z: {
      confidence: 3,
      value: -81.66666666666666,
    },
  },
  {
    frameRange: [235, 237],
    x: {
      confidence: 2,
      value: 4,
    },
    y: {
      confidence: 6,
      value: 201.66666666666666,
    },
    z: {
      confidence: 4,
      value: -93.5,
    },
  },
  {
    frameRange: [237, 239],
    x: {
      confidence: 2,
      value: -11,
    },
    y: {
      confidence: 6,
      value: 203.16666666666663,
    },
    z: {
      confidence: 4,
      value: -94.75,
    },
  },
  {
    frameRange: [239, 241],
    x: {
      confidence: 2,
      value: -30.5,
    },
    y: {
      confidence: 6,
      value: 205.33333333333331,
    },
    z: {
      confidence: 4,
      value: -87,
    },
  },
  {
    frameRange: [241, 243],
    x: {
      confidence: 2,
      value: -41,
    },
    y: {
      confidence: 6,
      value: 210.33333333333331,
    },
    z: {
      confidence: 4,
      value: -76.75,
    },
  },
  {
    frameRange: [243, 245],
    x: {
      confidence: 2,
      value: -56,
    },
    y: {
      confidence: 4,
      value: 213.25,
    },
    z: {
      confidence: 2,
      value: -67,
    },
  },
  {
    frameRange: [245, 247],
    x: {
      confidence: 2,
      value: -67,
    },
    y: {
      confidence: 4,
      value: 220,
    },
    z: {
      confidence: 2,
      value: -51,
    },
  },
  {
    frameRange: [247, 249],
    x: {
      confidence: 4,
      value: -86,
    },
    y: {
      confidence: 6,
      value: 244.5,
    },
    z: {
      confidence: 2,
      value: -27,
    },
  },
  {
    frameRange: [249, 250],
    x: {
      confidence: 2,
      value: -87,
    },
    y: {
      confidence: 3,
      value: 248.66666666666666,
    },
    z: {
      confidence: 1,
      value: -12,
    },
  },
  {
    frameRange: [250, 252],
    x: {
      confidence: 4,
      value: -87,
    },
    y: {
      confidence: 6,
      value: 256.8333333333333,
    },
    z: {
      confidence: 2,
      value: 5.5,
    },
  },
  {
    frameRange: [252, 254],
    x: {
      confidence: 4,
      value: -81.25,
    },
    y: {
      confidence: 6,
      value: 259.8333333333333,
    },
    z: {
      confidence: 2,
      value: 35.5,
    },
  },
  {
    frameRange: [254, 256],
    x: {
      confidence: 4,
      value: -61.25,
    },
    y: {
      confidence: 6,
      value: 257.66666666666663,
    },
    z: {
      confidence: 2,
      value: 62.5,
    },
  },
  {
    frameRange: [256, 258],
    x: {
      confidence: 4,
      value: -40,
    },
    y: {
      confidence: 6,
      value: 260,
    },
    z: {
      confidence: 2,
      value: 68.5,
    },
  },
  {
    frameRange: [258, 260],
    x: {
      confidence: 4,
      value: -31.75,
    },
    y: {
      confidence: 6,
      value: 264.8333333333333,
    },
    z: {
      confidence: 2,
      value: 82.5,
    },
  },
  {
    frameRange: [260, 262],
    x: {
      confidence: 2,
      value: -12,
    },
    y: {
      confidence: 4,
      value: 257.25,
    },
    z: {
      confidence: 2,
      value: 91.5,
    },
  },
  {
    frameRange: [262, 264],
    x: {
      confidence: 2,
      value: 5.5,
    },
    y: {
      confidence: 5,
      value: 255.2,
    },
    z: {
      confidence: 3,
      value: 89,
    },
  },
  {
    frameRange: [264, 266],
    x: {
      confidence: 2,
      value: 26.5,
    },
    y: {
      confidence: 6,
      value: 254.33333333333331,
    },
    z: {
      confidence: 4,
      value: 98,
    },
  },
  {
    frameRange: [266, 268],
    x: {
      confidence: 2,
      value: 58.5,
    },
    y: {
      confidence: 6,
      value: 252.5,
    },
    z: {
      confidence: 4,
      value: 88.75,
    },
  },
  {
    frameRange: [268, 270],
    x: {
      confidence: 2,
      value: 79.5,
    },
    y: {
      confidence: 6,
      value: 260,
    },
    z: {
      confidence: 4,
      value: 83.75,
    },
  },
  {
    frameRange: [270, 272],
    x: {
      confidence: 2,
      value: 92,
    },
    y: {
      confidence: 6,
      value: 264,
    },
    z: {
      confidence: 4,
      value: 71,
    },
  },
  {
    frameRange: [272, 274],
    x: {
      confidence: 2,
      value: 101.5,
    },
    y: {
      confidence: 6,
      value: 264.3333333333333,
    },
    z: {
      confidence: 4,
      value: 51.25,
    },
  },
  {
    frameRange: [274, 276],
    x: {
      confidence: 2,
      value: 117.5,
    },
    y: {
      confidence: 5,
      value: 259.8,
    },
    z: {
      confidence: 3,
      value: 40.33333333333333,
    },
  },
  {
    frameRange: [276, 277],
    x: {
      confidence: 2,
      value: 124,
    },
    y: {
      confidence: 3,
      value: 261.66666666666663,
    },
    z: {
      confidence: 1,
      value: 32,
    },
  },
  {
    frameRange: [277, 279],
    x: {
      confidence: 4,
      value: 137,
    },
    y: {
      confidence: 6,
      value: 263.66666666666663,
    },
    z: {
      confidence: 2,
      value: 20.5,
    },
  },
  {
    frameRange: [279, 281],
    x: {
      confidence: 4,
      value: 140.5,
    },
    y: {
      confidence: 6,
      value: 266.16666666666663,
    },
    z: {
      confidence: 2,
      value: 0,
    },
  },
  {
    frameRange: [281, 283],
    x: {
      confidence: 4,
      value: 127.75,
    },
    y: {
      confidence: 6,
      value: 273.3333333333333,
    },
    z: {
      confidence: 2,
      value: -14.5,
    },
  },
  {
    frameRange: [283, 285],
    x: {
      confidence: 3,
      value: 122.66666666666666,
    },
    y: {
      confidence: 5,
      value: 272.4,
    },
    z: {
      confidence: 2,
      value: -49,
    },
  },
  {
    frameRange: [285, 287],
    x: {
      confidence: 2,
      value: 119.5,
    },
    y: {
      confidence: 4,
      value: 264.75,
    },
    z: {
      confidence: 2,
      value: -70.5,
    },
  },
  {
    frameRange: [287, 289],
    x: {
      confidence: 2,
      value: 102,
    },
    y: {
      confidence: 4,
      value: 264.5,
    },
    z: {
      confidence: 2,
      value: -82.5,
    },
  },
  {
    frameRange: [289, 291],
    x: {
      confidence: 2,
      value: 82,
    },
    y: {
      confidence: 4,
      value: 262,
    },
    z: {
      confidence: 2,
      value: -97.5,
    },
  },
  {
    frameRange: [291, 293],
    x: {
      confidence: 2,
      value: 66.5,
    },
    y: {
      confidence: 4,
      value: 262.75,
    },
    z: {
      confidence: 2,
      value: -114.5,
    },
  },
  {
    frameRange: [293, 295],
    x: {
      confidence: 2,
      value: 49,
    },
    y: {
      confidence: 4,
      value: 271,
    },
    z: {
      confidence: 2,
      value: -127,
    },
  },
  {
    frameRange: [295, 297],
    x: {
      confidence: 2,
      value: 30,
    },
    y: {
      confidence: 6,
      value: 289.5,
    },
    z: {
      confidence: 4,
      value: -137,
    },
  },
  {
    frameRange: [297, 299],
    x: {
      confidence: 2,
      value: 12.5,
    },
    y: {
      confidence: 6,
      value: 288.16666666666663,
    },
    z: {
      confidence: 4,
      value: -126.25,
    },
  },
  {
    frameRange: [299, 301],
    x: {
      confidence: 2,
      value: -14,
    },
    y: {
      confidence: 5,
      value: 288.2,
    },
    z: {
      confidence: 3,
      value: -112.99999999999999,
    },
  },
  {
    frameRange: [301, 302],
    x: {
      confidence: 1,
      value: -30,
    },
    y: {
      confidence: 2,
      value: 293,
    },
    z: {
      confidence: 1,
      value: -111,
    },
  },
  {
    frameRange: [302, 304],
    x: {
      confidence: 2,
      value: -43,
    },
    y: {
      confidence: 4,
      value: 294.5,
    },
    z: {
      confidence: 2,
      value: -108.5,
    },
  },
  {
    frameRange: [304, 306],
    x: {
      confidence: 2,
      value: -57,
    },
    y: {
      confidence: 4,
      value: 296,
    },
    z: {
      confidence: 2,
      value: -103,
    },
  },
  {
    frameRange: [306, 308],
    x: {
      confidence: 4,
      value: -82.25,
    },
    y: {
      confidence: 6,
      value: 306.8333333333333,
    },
    z: {
      confidence: 2,
      value: -79.5,
    },
  },
  {
    frameRange: [308, 310],
    x: {
      confidence: 4,
      value: -100.5,
    },
    y: {
      confidence: 6,
      value: 305.8333333333333,
    },
    z: {
      confidence: 2,
      value: -63,
    },
  },
  {
    frameRange: [310, 312],
    x: {
      confidence: 4,
      value: -109.5,
    },
    y: {
      confidence: 6,
      value: 308.16666666666663,
    },
    z: {
      confidence: 2,
      value: -45.5,
    },
  },
  {
    frameRange: [312, 314],
    x: {
      confidence: 4,
      value: -119.5,
    },
    y: {
      confidence: 6,
      value: 319.3333333333333,
    },
    z: {
      confidence: 2,
      value: -23.5,
    },
  },
  {
    frameRange: [314, 316],
    x: {
      confidence: 3.5555555555555554,
      value: -110.4375,
    },
    y: {
      confidence: 5.555555555555555,
      value: 328.54999999999995,
    },
    z: {
      confidence: 2,
      value: 2.5,
    },
  },
  {
    frameRange: [316, 318],
    x: {
      confidence: 3.5555555555555554,
      value: -102.703125,
    },
    y: {
      confidence: 5.555555555555555,
      value: 334.63,
    },
    z: {
      confidence: 2,
      value: 12,
    },
  },
  {
    frameRange: [318, 320],
    x: {
      confidence: 4,
      value: -93.75,
    },
    y: {
      confidence: 6,
      value: 341.66666666666663,
    },
    z: {
      confidence: 2,
      value: 33.5,
    },
  },
  {
    frameRange: [320, 322],
    x: {
      confidence: 4,
      value: -83.5,
    },
    y: {
      confidence: 6,
      value: 344.8333333333333,
    },
    z: {
      confidence: 2,
      value: 47.5,
    },
  },
  {
    frameRange: [322, 324],
    x: {
      confidence: 3,
      value: -72.33333333333333,
    },
    y: {
      confidence: 5,
      value: 343.79999999999995,
    },
    z: {
      confidence: 2,
      value: 64.5,
    },
  },
  {
    frameRange: [324, 326],
    x: {
      confidence: 2,
      value: -59,
    },
    y: {
      confidence: 4,
      value: 344,
    },
    z: {
      confidence: 2,
      value: 79,
    },
  },
  {
    frameRange: [326, 328],
    x: {
      confidence: 2,
      value: -51.5,
    },
    y: {
      confidence: 4,
      value: 350.75,
    },
    z: {
      confidence: 2,
      value: 95,
    },
  },
  {
    frameRange: [328, 329],
    x: {
      confidence: 1,
      value: -46,
    },
    y: {
      confidence: 2,
      value: 355,
    },
    z: {
      confidence: 1,
      value: 115,
    },
  },
  {
    frameRange: [329, 331],
    x: {
      confidence: 2,
      value: -29,
    },
    y: {
      confidence: 4,
      value: 357.25,
    },
    z: {
      confidence: 2,
      value: 120,
    },
  },
  {
    frameRange: [331, 333],
    x: {
      confidence: 2,
      value: -25.5,
    },
    y: {
      confidence: 6,
      value: 348.5,
    },
    z: {
      confidence: 4,
      value: 132.25,
    },
  },
  {
    frameRange: [333, 335],
    x: {
      confidence: 2,
      value: 15,
    },
    y: {
      confidence: 6,
      value: 354.8333333333333,
    },
    z: {
      confidence: 4,
      value: 129.75,
    },
  },
  {
    frameRange: [335, 337],
    x: {
      confidence: 2,
      value: 37.5,
    },
    y: {
      confidence: 6,
      value: 361.16666666666663,
    },
    z: {
      confidence: 4,
      value: 113.5,
    },
  },
  {
    frameRange: [337, 339],
    x: {
      confidence: 2,
      value: 68,
    },
    y: {
      confidence: 6,
      value: 362.83333333333326,
    },
    z: {
      confidence: 4,
      value: 102.75,
    },
  },
  {
    frameRange: [339, 341],
    x: {
      confidence: 2,
      value: 89.5,
    },
    y: {
      confidence: 6,
      value: 359.66666666666663,
    },
    z: {
      confidence: 4,
      value: 101.5,
    },
  },
  {
    frameRange: [341, 343],
    x: {
      confidence: 2,
      value: 103.5,
    },
    y: {
      confidence: 6,
      value: 357.66666666666663,
    },
    z: {
      confidence: 4,
      value: 89.75,
    },
  },
  {
    frameRange: [343, 345],
    x: {
      confidence: 2,
      value: 141.5,
    },
    y: {
      confidence: 6,
      value: 361.5,
    },
    z: {
      confidence: 4,
      value: 77.25,
    },
  },
  {
    frameRange: [345, 347],
    x: {
      confidence: 4,
      value: 154,
    },
    y: {
      confidence: 7,
      value: 361.4285714285714,
    },
    z: {
      confidence: 3,
      value: 62.33333333333333,
    },
  },
  {
    frameRange: [347, 349],
    x: {
      confidence: 4,
      value: 159.75,
    },
    y: {
      confidence: 6,
      value: 348,
    },
    z: {
      confidence: 2,
      value: 57.5,
    },
  },
  {
    frameRange: [349, 351],
    x: {
      confidence: 4,
      value: 163,
    },
    y: {
      confidence: 6,
      value: 349.8333333333333,
    },
    z: {
      confidence: 2,
      value: 36.5,
    },
  },
  {
    frameRange: [351, 353],
    x: {
      confidence: 3.111111111111111,
      value: 164.41071428571428,
    },
    y: {
      confidence: 5.111111111111111,
      value: 346.5326086956522,
    },
    z: {
      confidence: 2,
      value: 15,
    },
  },
  {
    frameRange: [353, 355],
    x: {
      confidence: 3,
      value: 167.33333333333331,
    },
    y: {
      confidence: 5,
      value: 332.4,
    },
    z: {
      confidence: 2,
      value: -5,
    },
  },
  {
    frameRange: [355, 356],
    x: {
      confidence: 1,
      value: 176,
    },
    y: {
      confidence: 2,
      value: 313,
    },
    z: {
      confidence: 1,
      value: -27,
    },
  },
  {
    frameRange: [356, 358],
    x: {
      confidence: 2,
      value: 177,
    },
    y: {
      confidence: 4,
      value: 319,
    },
    z: {
      confidence: 2,
      value: -36,
    },
  },
  {
    frameRange: [358, 360],
    x: {
      confidence: 2,
      value: 187.5,
    },
    y: {
      confidence: 4,
      value: 318,
    },
    z: {
      confidence: 2,
      value: -60,
    },
  },
  {
    frameRange: [360, 362],
    x: {
      confidence: 2,
      value: 170.5,
    },
    y: {
      confidence: 4,
      value: 314.5,
    },
    z: {
      confidence: 2,
      value: -69,
    },
  },
  {
    frameRange: [362, 364],
    x: {
      confidence: 2,
      value: 165,
    },
    y: {
      confidence: 5,
      value: 340.59999999999997,
    },
    z: {
      confidence: 3,
      value: -92.66666666666666,
    },
  },
  {
    frameRange: [364, 366],
    x: {
      confidence: 2,
      value: 152,
    },
    y: {
      confidence: 6,
      value: 360.5,
    },
    z: {
      confidence: 4,
      value: -125.75,
    },
  },
  {
    frameRange: [366, 368],
    x: {
      confidence: 2,
      value: 134,
    },
    y: {
      confidence: 5.555555555555555,
      value: 358.23,
    },
    z: {
      confidence: 3.5555555555555554,
      value: -138.171875,
    },
  },
  {
    frameRange: [368, 370],
    x: {
      confidence: 2,
      value: 122,
    },
    y: {
      confidence: 5.555555555555555,
      value: 362.89,
    },
    z: {
      confidence: 3.5555555555555554,
      value: -143.9375,
    },
  },
  {
    frameRange: [370, 372],
    x: {
      confidence: 2,
      value: 98.5,
    },
    y: {
      confidence: 6,
      value: 372.16666666666663,
    },
    z: {
      confidence: 4,
      value: -151.75,
    },
  },
  {
    frameRange: [372, 374],
    x: {
      confidence: 2,
      value: 79.5,
    },
    y: {
      confidence: 6,
      value: 374.16666666666663,
    },
    z: {
      confidence: 4,
      value: -157.5,
    },
  },
  {
    frameRange: [374, 376],
    x: {
      confidence: 2,
      value: 69,
    },
    y: {
      confidence: 6,
      value: 376.8333333333333,
    },
    z: {
      confidence: 4,
      value: -161,
    },
  },
  {
    frameRange: [376, 378],
    x: {
      confidence: 2,
      value: 44.5,
    },
    y: {
      confidence: 6,
      value: 382.8333333333333,
    },
    z: {
      confidence: 4,
      value: -162,
    },
  },
  {
    frameRange: [378, 380],
    x: {
      confidence: 2,
      value: 14,
    },
    y: {
      confidence: 6,
      value: 385.8333333333333,
    },
    z: {
      confidence: 4,
      value: -157,
    },
  },
  {
    frameRange: [380, 381],
    x: {
      confidence: 1,
      value: 0,
    },
    y: {
      confidence: 3,
      value: 390.3333333333333,
    },
    z: {
      confidence: 2,
      value: -146.5,
    },
  },
  {
    frameRange: [381, 383],
    x: {
      confidence: 2,
      value: -15,
    },
    y: {
      confidence: 6,
      value: 394.66666666666663,
    },
    z: {
      confidence: 4,
      value: -138.5,
    },
  },
  {
    frameRange: [383, 385],
    x: {
      confidence: 2,
      value: -24.5,
    },
    y: {
      confidence: 6,
      value: 399.3333333333333,
    },
    z: {
      confidence: 4,
      value: -130,
    },
  },
  {
    frameRange: [385, 387],
    x: {
      confidence: 2,
      value: -50,
    },
    y: {
      confidence: 6,
      value: 402.49999999999994,
    },
    z: {
      confidence: 4,
      value: -121.25,
    },
  },
  {
    frameRange: [387, 389],
    x: {
      confidence: 4,
      value: -73.75,
    },
    y: {
      confidence: 8,
      value: 429.125,
    },
    z: {
      confidence: 4,
      value: -111.75,
    },
  },
  {
    frameRange: [389, 391],
    x: {
      confidence: 4,
      value: -85.5,
    },
    y: {
      confidence: 7,
      value: 436.1428571428571,
    },
    z: {
      confidence: 3,
      value: -105.99999999999999,
    },
  },
  {
    frameRange: [391, 393],
    x: {
      confidence: 4,
      value: -100.75,
    },
    y: {
      confidence: 6,
      value: 444.16666666666663,
    },
    z: {
      confidence: 2,
      value: -97,
    },
  },
  {
    frameRange: [393, 395],
    x: {
      confidence: 4,
      value: -112,
    },
    y: {
      confidence: 6,
      value: 448,
    },
    z: {
      confidence: 2,
      value: -75.5,
    },
  },
  {
    frameRange: [395, 397],
    x: {
      confidence: 4,
      value: -97.75,
    },
    y: {
      confidence: 6,
      value: 451.16666666666663,
    },
    z: {
      confidence: 2,
      value: -56,
    },
  },
  {
    frameRange: [397, 399],
    x: {
      confidence: 4,
      value: -88.75,
    },
    y: {
      confidence: 6,
      value: 454.16666666666663,
    },
    z: {
      confidence: 2,
      value: -40,
    },
  },
  {
    frameRange: [399, 401],
    x: {
      confidence: 4,
      value: -84.25,
    },
    y: {
      confidence: 6,
      value: 458.66666666666663,
    },
    z: {
      confidence: 2,
      value: -20,
    },
  },
  {
    frameRange: [401, 403],
    x: {
      confidence: 4,
      value: -77.75,
    },
    y: {
      confidence: 6,
      value: 468.16666666666663,
    },
    z: {
      confidence: 2,
      value: 7,
    },
  },
  {
    frameRange: [403, 405],
    x: {
      confidence: 4,
      value: -72,
    },
    y: {
      confidence: 6,
      value: 472,
    },
    z: {
      confidence: 2,
      value: 38.5,
    },
  },
  {
    frameRange: [405, 407],
    x: {
      confidence: 4,
      value: -60.75,
    },
    y: {
      confidence: 6,
      value: 468.33333333333326,
    },
    z: {
      confidence: 2,
      value: 60,
    },
  },
  {
    frameRange: [407, 408],
    x: {
      confidence: 1,
      value: -51,
    },
    y: {
      confidence: 2,
      value: 470.5,
    },
    z: {
      confidence: 1,
      value: 70,
    },
  },
  {
    frameRange: [408, 410],
    x: {
      confidence: 2,
      value: -43.5,
    },
    y: {
      confidence: 4,
      value: 471.5,
    },
    z: {
      confidence: 2,
      value: 81.5,
    },
  },
  {
    frameRange: [410, 412],
    x: {
      confidence: 2,
      value: -34.5,
    },
    y: {
      confidence: 4,
      value: 474,
    },
    z: {
      confidence: 2,
      value: 96.5,
    },
  },
  {
    frameRange: [412, 414],
    x: {
      confidence: 2,
      value: -27.5,
    },
    y: {
      confidence: 4,
      value: 476.75,
    },
    z: {
      confidence: 2,
      value: 115.5,
    },
  },
  {
    frameRange: [414, 416],
    x: {
      confidence: 2,
      value: -16.5,
    },
    y: {
      confidence: 4,
      value: 478.5,
    },
    z: {
      confidence: 2,
      value: 135,
    },
  },
  {
    frameRange: [416, 418],
    x: {
      confidence: 2,
      value: 0.5,
    },
    y: {
      confidence: 4,
      value: 479,
    },
    z: {
      confidence: 2,
      value: 142,
    },
  },
  {
    frameRange: [418, 420],
    x: {
      confidence: 2,
      value: 25,
    },
    y: {
      confidence: 4,
      value: 483.25,
    },
    z: {
      confidence: 2,
      value: 149,
    },
  },
  {
    frameRange: [420, 422],
    x: {
      confidence: 2,
      value: 48.5,
    },
    y: {
      confidence: 4,
      value: 491.5,
    },
    z: {
      confidence: 2,
      value: 154,
    },
  },
  {
    frameRange: [422, 424],
    x: {
      confidence: 2,
      value: 76.5,
    },
    y: {
      confidence: 6,
      value: 481.8333333333333,
    },
    z: {
      confidence: 4,
      value: 152.25,
    },
  },
  {
    frameRange: [424, 426],
    x: {
      confidence: 2,
      value: 94,
    },
    y: {
      confidence: 6,
      value: 485.8333333333333,
    },
    z: {
      confidence: 4,
      value: 133.75,
    },
  },
  {
    frameRange: [426, 428],
    x: {
      confidence: 2,
      value: 113,
    },
    y: {
      confidence: 6,
      value: 489.5,
    },
    z: {
      confidence: 4,
      value: 117.25,
    },
  },
  {
    frameRange: [428, 430],
    x: {
      confidence: 2,
      value: 125,
    },
    y: {
      confidence: 6,
      value: 493.16666666666663,
    },
    z: {
      confidence: 4,
      value: 103,
    },
  },
  {
    frameRange: [430, 432],
    x: {
      confidence: 2,
      value: 137,
    },
    y: {
      confidence: 5,
      value: 485.8,
    },
    z: {
      confidence: 3,
      value: 102.66666666666666,
    },
  },
  {
    frameRange: [432, 434],
    x: {
      confidence: 2,
      value: 151,
    },
    y: {
      confidence: 4,
      value: 472.25,
    },
    z: {
      confidence: 2,
      value: 84.5,
    },
  },
  {
    frameRange: [434, 435],
    x: {
      confidence: 1,
      value: 156,
    },
    y: {
      confidence: 2,
      value: 472,
    },
    z: {
      confidence: 1,
      value: 69,
    },
  },
  {
    frameRange: [435, 437],
    x: {
      confidence: 2,
      value: 164.5,
    },
    y: {
      confidence: 4,
      value: 473.25,
    },
    z: {
      confidence: 2,
      value: 53.5,
    },
  },
  {
    frameRange: [437, 439],
    x: {
      confidence: 2,
      value: 175.5,
    },
    y: {
      confidence: 4,
      value: 474,
    },
    z: {
      confidence: 2,
      value: 37.5,
    },
  },
  {
    frameRange: [439, 441],
    x: {
      confidence: 2,
      value: 183,
    },
    y: {
      confidence: 4,
      value: 473.25,
    },
    z: {
      confidence: 2,
      value: 11,
    },
  },
  {
    frameRange: [441, 443],
    x: {
      confidence: 2,
      value: 179,
    },
    y: {
      confidence: 4,
      value: 469,
    },
    z: {
      confidence: 2,
      value: -9.5,
    },
  },
  {
    frameRange: [443, 445],
    x: {
      confidence: 4,
      value: 173,
    },
    y: {
      confidence: 6,
      value: 466.5,
    },
    z: {
      confidence: 2,
      value: -29,
    },
  },
  {
    frameRange: [445, 447],
    x: {
      confidence: 4,
      value: 167,
    },
    y: {
      confidence: 6,
      value: 467.66666666666663,
    },
    z: {
      confidence: 2,
      value: -52.5,
    },
  },
  {
    frameRange: [447, 449],
    x: {
      confidence: 2,
      value: 167,
    },
    y: {
      confidence: 4,
      value: 437,
    },
    z: {
      confidence: 2,
      value: -65.5,
    },
  },
  {
    frameRange: [449, 451],
    x: {
      confidence: 2.111111111111111,
      value: 152.28947368421052,
    },
    y: {
      confidence: 4.111111111111111,
      value: 443.58108108108115,
    },
    z: {
      confidence: 2,
      value: -95,
    },
  },
  {
    frameRange: [451, 453],
    x: {
      confidence: 2,
      value: 148.5,
    },
    y: {
      confidence: 4,
      value: 445,
    },
    z: {
      confidence: 2,
      value: -114.5,
    },
  },
  {
    frameRange: [453, 455],
    x: {
      confidence: 3,
      value: 133,
    },
    y: {
      confidence: 5,
      value: 470.4,
    },
    z: {
      confidence: 2,
      value: -132.5,
    },
  },
  {
    frameRange: [455, 457],
    x: {
      confidence: 3.2222222222222223,
      value: 121.01724137931032,
    },
    y: {
      confidence: 5.222222222222222,
      value: 478.08510638297867,
    },
    z: {
      confidence: 2,
      value: -146.5,
    },
  },
  {
    frameRange: [457, 459],
    x: {
      confidence: 4,
      value: 105.5,
    },
    y: {
      confidence: 6,
      value: 494.5,
    },
    z: {
      confidence: 2,
      value: -162.5,
    },
  },
  {
    frameRange: [459, 460],
    x: {
      confidence: 1,
      value: 102,
    },
    y: {
      confidence: 2,
      value: 462.5,
    },
    z: {
      confidence: 1,
      value: -173,
    },
  },
  {
    frameRange: [460, 462],
    x: {
      confidence: 2,
      value: 82,
    },
    y: {
      confidence: 4,
      value: 465.5,
    },
    z: {
      confidence: 2,
      value: -181,
    },
  },
  {
    frameRange: [462, 464],
    x: {
      confidence: 2,
      value: 63,
    },
    y: {
      confidence: 6,
      value: 475.8333333333333,
    },
    z: {
      confidence: 4,
      value: -183.75,
    },
  },
  {
    frameRange: [464, 466],
    x: {
      confidence: 2,
      value: 41,
    },
    y: {
      confidence: 6,
      value: 480.66666666666663,
    },
    z: {
      confidence: 4,
      value: -179.25,
    },
  },
  {
    frameRange: [466, 468],
    x: {
      confidence: 2,
      value: 22,
    },
    y: {
      confidence: 6,
      value: 490.99999999999994,
    },
    z: {
      confidence: 4,
      value: -179.75,
    },
  },
  {
    frameRange: [468, 470],
    x: {
      confidence: 2,
      value: -3.5,
    },
    y: {
      confidence: 6,
      value: 496.66666666666663,
    },
    z: {
      confidence: 4,
      value: -184.25,
    },
  },
  {
    frameRange: [470, 472],
    x: {
      confidence: 2,
      value: -21,
    },
    y: {
      confidence: 6,
      value: 504.83333333333326,
    },
    z: {
      confidence: 4,
      value: -180,
    },
  },
  {
    frameRange: [472, 474],
    x: {
      confidence: 4,
      value: -49,
    },
    y: {
      confidence: 8,
      value: 529.125,
    },
    z: {
      confidence: 4,
      value: -173.75,
    },
  },
  {
    frameRange: [474, 476],
    x: {
      confidence: 3,
      value: -71.66666666666666,
    },
    y: {
      confidence: 7,
      value: 530.2857142857142,
    },
    z: {
      confidence: 4,
      value: -165,
    },
  },
  {
    frameRange: [476, 478],
    x: {
      confidence: 2,
      value: -96.5,
    },
    y: {
      confidence: 6,
      value: 530,
    },
    z: {
      confidence: 4,
      value: -153.5,
    },
  },
  {
    frameRange: [478, 480],
    x: {
      confidence: 2,
      value: -115.5,
    },
    y: {
      confidence: 6,
      value: 538.3333333333333,
    },
    z: {
      confidence: 4,
      value: -139.75,
    },
  },
  {
    frameRange: [480, 482],
    x: {
      confidence: 2,
      value: -124,
    },
    y: {
      confidence: 6,
      value: 541.5,
    },
    z: {
      confidence: 4,
      value: -119,
    },
  },
  {
    frameRange: [482, 484],
    x: {
      confidence: 2,
      value: -133.5,
    },
    y: {
      confidence: 6,
      value: 547.3333333333333,
    },
    z: {
      confidence: 4,
      value: -104.75,
    },
  },
  {
    frameRange: [484, 486],
    x: {
      confidence: 2,
      value: -135,
    },
    y: {
      confidence: 5,
      value: 550.8,
    },
    z: {
      confidence: 3,
      value: -93.66666666666666,
    },
  },
  {
    frameRange: [486, 487],
    x: {
      confidence: 1,
      value: -129,
    },
    y: {
      confidence: 2,
      value: 543,
    },
    z: {
      confidence: 1,
      value: -91,
    },
  },
  {
    frameRange: [487, 489],
    x: {
      confidence: 3,
      value: -133.33333333333331,
    },
    y: {
      confidence: 5,
      value: 546.4,
    },
    z: {
      confidence: 2,
      value: -77.5,
    },
  },
  {
    frameRange: [489, 491],
    x: {
      confidence: 4,
      value: -135.75,
    },
    y: {
      confidence: 6,
      value: 547.8333333333333,
    },
    z: {
      confidence: 2,
      value: -57,
    },
  },
  {
    frameRange: [491, 493],
    x: {
      confidence: 3.111111111111111,
      value: -130.64285714285714,
    },
    y: {
      confidence: 5.111111111111111,
      value: 558.4347826086957,
    },
    z: {
      confidence: 2,
      value: -28,
    },
  },
  {
    frameRange: [493, 495],
    x: {
      confidence: 2.666666666666667,
      value: -124.31249999999999,
    },
    y: {
      confidence: 4.666666666666667,
      value: 561.9642857142857,
    },
    z: {
      confidence: 2,
      value: 1,
    },
  },
  {
    frameRange: [495, 497],
    x: {
      confidence: 3.111111111111111,
      value: -115.32142857142856,
    },
    y: {
      confidence: 5.111111111111111,
      value: 558.413043478261,
    },
    z: {
      confidence: 2,
      value: 23.5,
    },
  },
  {
    frameRange: [497, 499],
    x: {
      confidence: 4,
      value: -99.75,
    },
    y: {
      confidence: 6,
      value: 562.3333333333333,
    },
    z: {
      confidence: 2,
      value: 59.5,
    },
  },
  {
    frameRange: [499, 501],
    x: {
      confidence: 3,
      value: -92,
    },
    y: {
      confidence: 5,
      value: 568.6,
    },
    z: {
      confidence: 2,
      value: 61,
    },
  },
  {
    frameRange: [501, 503],
    x: {
      confidence: 2,
      value: -84.5,
    },
    y: {
      confidence: 4,
      value: 581.5,
    },
    z: {
      confidence: 2,
      value: 77,
    },
  },
  {
    frameRange: [503, 505],
    x: {
      confidence: 2,
      value: -63.5,
    },
    y: {
      confidence: 4,
      value: 584.25,
    },
    z: {
      confidence: 2,
      value: 77,
    },
  },
  {
    frameRange: [505, 507],
    x: {
      confidence: 2,
      value: -35,
    },
    y: {
      confidence: 4,
      value: 596,
    },
    z: {
      confidence: 2,
      value: 84,
    },
  },
  {
    frameRange: [507, 509],
    x: {
      confidence: 2,
      value: -19.5,
    },
    y: {
      confidence: 4,
      value: 599.25,
    },
    z: {
      confidence: 2,
      value: 88.5,
    },
  },
  {
    frameRange: [509, 511],
    x: {
      confidence: 2,
      value: -6.5,
    },
    y: {
      confidence: 4,
      value: 604.25,
    },
    z: {
      confidence: 2,
      value: 92.5,
    },
  },
  {
    frameRange: [511, 512],
    x: {
      confidence: 1,
      value: 7,
    },
    y: {
      confidence: 3,
      value: 598.3333333333333,
    },
    z: {
      confidence: 2,
      value: 114.5,
    },
  },
  {
    frameRange: [512, 514],
    x: {
      confidence: 2,
      value: 26,
    },
    y: {
      confidence: 6,
      value: 606.6666666666666,
    },
    z: {
      confidence: 4,
      value: 120.25,
    },
  },
  {
    frameRange: [514, 516],
    x: {
      confidence: 2,
      value: 55.5,
    },
    y: {
      confidence: 6,
      value: 610,
    },
    z: {
      confidence: 4,
      value: 118.5,
    },
  },
  {
    frameRange: [516, 518],
    x: {
      confidence: 2,
      value: 90.5,
    },
    y: {
      confidence: 6,
      value: 603.8333333333333,
    },
    z: {
      confidence: 4,
      value: 95.5,
    },
  },
  {
    frameRange: [518, 520],
    x: {
      confidence: 2,
      value: 124.5,
    },
    y: {
      confidence: 6,
      value: 605.8333333333333,
    },
    z: {
      confidence: 4,
      value: 88.75,
    },
  },
  {
    frameRange: [520, 522],
    x: {
      confidence: 2,
      value: 147.5,
    },
    y: {
      confidence: 4,
      value: 583.75,
    },
    z: {
      confidence: 2,
      value: 100.5,
    },
  },
  {
    frameRange: [522, 524],
    x: {
      confidence: 2,
      value: 162.5,
    },
    y: {
      confidence: 3.7777777777777777,
      value: 586.3676470588235,
    },
    z: {
      confidence: 1.7777777777777777,
      value: 98.9375,
    },
  },
  {
    frameRange: [524, 526],
    x: {
      confidence: 2,
      value: 172.5,
    },
    y: {
      confidence: 4,
      value: 579.75,
    },
    z: {
      confidence: 2,
      value: 86,
    },
  },
  {
    frameRange: [526, 528],
    x: {
      confidence: 2,
      value: 188,
    },
    y: {
      confidence: 4,
      value: 578,
    },
    z: {
      confidence: 2,
      value: 65,
    },
  },
  {
    frameRange: [528, 530],
    x: {
      confidence: 2,
      value: 196.5,
    },
    y: {
      confidence: 4,
      value: 577.5,
    },
    z: {
      confidence: 2,
      value: 51,
    },
  },
  {
    frameRange: [530, 532],
    x: {
      confidence: 2.5555555555555554,
      value: 194.04347826086956,
    },
    y: {
      confidence: 4.555555555555555,
      value: 575.890243902439,
    },
    z: {
      confidence: 2,
      value: 33.5,
    },
  },
  {
    frameRange: [532, 534],
    x: {
      confidence: 3.5555555555555554,
      value: 187.734375,
    },
    y: {
      confidence: 5.555555555555555,
      value: 581.8800000000001,
    },
    z: {
      confidence: 2,
      value: 6,
    },
  },
  {
    frameRange: [534, 536],
    x: {
      confidence: 4,
      value: 178.25,
    },
    y: {
      confidence: 6,
      value: 592.6666666666666,
    },
    z: {
      confidence: 2,
      value: -23.5,
    },
  },
  {
    frameRange: [536, 538],
    x: {
      confidence: 4,
      value: 165.75,
    },
    y: {
      confidence: 6,
      value: 599.3333333333333,
    },
    z: {
      confidence: 2,
      value: -40,
    },
  },
  {
    frameRange: [538, 539],
    x: {
      confidence: 2,
      value: 153.5,
    },
    y: {
      confidence: 3,
      value: 605,
    },
    z: {
      confidence: 1,
      value: -50,
    },
  },
  {
    frameRange: [539, 541],
    x: {
      confidence: 3.7777777777777777,
      value: 138.55882352941177,
    },
    y: {
      confidence: 5.777777777777778,
      value: 609.4134615384617,
    },
    z: {
      confidence: 2,
      value: -65,
    },
  },
  {
    frameRange: [541, 543],
    x: {
      confidence: 4,
      value: 119,
    },
    y: {
      confidence: 6,
      value: 616.5,
    },
    z: {
      confidence: 2,
      value: -80,
    },
  },
  {
    frameRange: [543, 545],
    x: {
      confidence: 4,
      value: 103,
    },
    y: {
      confidence: 6,
      value: 621.8333333333333,
    },
    z: {
      confidence: 2,
      value: -95.5,
    },
  },
  {
    frameRange: [545, 547],
    x: {
      confidence: 4,
      value: 85,
    },
    y: {
      confidence: 6,
      value: 626.1666666666666,
    },
    z: {
      confidence: 2,
      value: -102,
    },
  },
  {
    frameRange: [547, 549],
    x: {
      confidence: 4,
      value: 67.75,
    },
    y: {
      confidence: 6,
      value: 633,
    },
    z: {
      confidence: 2,
      value: -110.5,
    },
  },
  {
    frameRange: [549, 551],
    x: {
      confidence: 4,
      value: 45.5,
    },
    y: {
      confidence: 6,
      value: 639.1666666666666,
    },
    z: {
      confidence: 2,
      value: -120,
    },
  },
  {
    frameRange: [551, 553],
    x: {
      confidence: 4,
      value: 21.25,
    },
    y: {
      confidence: 6,
      value: 643.6666666666666,
    },
    z: {
      confidence: 2,
      value: -127.5,
    },
  },
  {
    frameRange: [553, 555],
    x: {
      confidence: 4,
      value: 7,
    },
    y: {
      confidence: 6,
      value: 648.8333333333333,
    },
    z: {
      confidence: 2,
      value: -131,
    },
  },
  {
    frameRange: [555, 557],
    x: {
      confidence: 4,
      value: -16,
    },
    y: {
      confidence: 6,
      value: 655.1666666666666,
    },
    z: {
      confidence: 2,
      value: -128,
    },
  },
  {
    frameRange: [557, 559],
    x: {
      confidence: 3.5555555555555554,
      value: -39.4375,
    },
    y: {
      confidence: 7.555555555555555,
      value: 654.2720588235295,
    },
    z: {
      confidence: 4,
      value: -144.25,
    },
  },
  {
    frameRange: [559, 561],
    x: {
      confidence: 3.5555555555555554,
      value: -67.578125,
    },
    y: {
      confidence: 7.555555555555555,
      value: 667.5220588235294,
    },
    z: {
      confidence: 4,
      value: -132.5,
    },
  },
  {
    frameRange: [561, 563],
    x: {
      confidence: 3.5555555555555554,
      value: -79.90625,
    },
    y: {
      confidence: 7.555555555555555,
      value: 680.25,
    },
    z: {
      confidence: 4,
      value: -110.5,
    },
  },
  {
    frameRange: [563, 565],
    x: {
      confidence: 3.5555555555555554,
      value: -70.3125,
    },
    y: {
      confidence: 5.555555555555555,
      value: 702.4200000000001,
    },
    z: {
      confidence: 2,
      value: -126.5,
    },
  },
  {
    frameRange: [565, 566],
    x: {
      confidence: 2,
      value: -66,
    },
    y: {
      confidence: 3,
      value: 716.6666666666666,
    },
    z: {
      confidence: 1,
      value: -110,
    },
  },
  {
    frameRange: [566, 568],
    x: {
      confidence: 4,
      value: -60.25,
    },
    y: {
      confidence: 6,
      value: 727.3333333333333,
    },
    z: {
      confidence: 2,
      value: -98,
    },
  },
  {
    frameRange: [568, 570],
    x: {
      confidence: 4,
      value: -49.5,
    },
    y: {
      confidence: 6,
      value: 741.8333333333333,
    },
    z: {
      confidence: 2,
      value: -71.5,
    },
  },
  {
    frameRange: [570, 572],
    x: {
      confidence: 4,
      value: -42.5,
    },
    y: {
      confidence: 6,
      value: 752.8333333333333,
    },
    z: {
      confidence: 2,
      value: -52,
    },
  },
  {
    frameRange: [572, 574],
    x: {
      confidence: 4,
      value: -38.75,
    },
    y: {
      confidence: 8,
      value: 750.75,
    },
    z: {
      confidence: 4,
      value: -28.25,
    },
  },
  {
    frameRange: [574, 576],
    x: {
      confidence: 4,
      value: -31,
    },
    y: {
      confidence: 8,
      value: 764,
    },
    z: {
      confidence: 4,
      value: -12,
    },
  },
  {
    frameRange: [576, 578],
    x: {
      confidence: 4,
      value: -23.25,
    },
    y: {
      confidence: 8,
      value: 779,
    },
    z: {
      confidence: 4,
      value: 7.25,
    },
  },
];

export default rawLedPositions;
