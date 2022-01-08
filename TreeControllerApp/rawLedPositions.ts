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
    frameRange: [0, 4],
    x: {
      confidence: 4,
      value: 83.75,
    },
    y: {
      confidence: 8,
      value: 989.125,
    },
    z: {
      confidence: 4,
      value: -89,
    },
  },
  {
    frameRange: [4, 7],
    x: {
      confidence: 3,
      value: 60,
    },
    y: {
      confidence: 6,
      value: 974.6666666666665,
    },
    z: {
      confidence: 3,
      value: -91.33333333333333,
    },
  },
  {
    frameRange: [7, 11],
    x: {
      confidence: 4,
      value: 36.5,
    },
    y: {
      confidence: 8,
      value: 953.625,
    },
    z: {
      confidence: 4,
      value: -91.75,
    },
  },
  {
    frameRange: [11, 15],
    x: {
      confidence: 4,
      value: 12.25,
    },
    y: {
      confidence: 8,
      value: 944.75,
    },
    z: {
      confidence: 4,
      value: -92.5,
    },
  },
  {
    frameRange: [15, 18],
    x: {
      confidence: 3,
      value: -11.666666666666666,
    },
    y: {
      confidence: 6,
      value: 938.5,
    },
    z: {
      confidence: 3,
      value: -95.66666666666666,
    },
  },
  {
    frameRange: [18, 22],
    x: {
      confidence: 4,
      value: -32.5,
    },
    y: {
      confidence: 9,
      value: 925.4444444444443,
    },
    z: {
      confidence: 5,
      value: -84,
    },
  },
  {
    frameRange: [22, 26],
    x: {
      confidence: 4,
      value: -59.75,
    },
    y: {
      confidence: 12,
      value: 913.0833333333333,
    },
    z: {
      confidence: 8,
      value: -76.25,
    },
  },
  {
    frameRange: [26, 29],
    x: {
      confidence: 3,
      value: -82.66666666666666,
    },
    y: {
      confidence: 8,
      value: 910.5,
    },
    z: {
      confidence: 5,
      value: -66,
    },
  },
  {
    frameRange: [29, 33],
    x: {
      confidence: 4,
      value: -104.25,
    },
    y: {
      confidence: 8,
      value: 902.625,
    },
    z: {
      confidence: 4,
      value: -59,
    },
  },
  {
    frameRange: [33, 37],
    x: {
      confidence: 4,
      value: -117.25,
    },
    y: {
      confidence: 8,
      value: 897.375,
    },
    z: {
      confidence: 4,
      value: -44.75,
    },
  },
  {
    frameRange: [37, 41],
    x: {
      confidence: 4,
      value: -129,
    },
    y: {
      confidence: 8,
      value: 894.125,
    },
    z: {
      confidence: 4,
      value: -21,
    },
  },
  {
    frameRange: [41, 44],
    x: {
      confidence: 3,
      value: -145,
    },
    y: {
      confidence: 6,
      value: 887.4999999999999,
    },
    z: {
      confidence: 3,
      value: 9,
    },
  },
  {
    frameRange: [44, 48],
    x: {
      confidence: 4,
      value: -126,
    },
    y: {
      confidence: 8,
      value: 870.375,
    },
    z: {
      confidence: 4,
      value: 36.25,
    },
  },
  {
    frameRange: [48, 52],
    x: {
      confidence: 3,
      value: -116.33333333333333,
    },
    y: {
      confidence: 7,
      value: 862.2857142857142,
    },
    z: {
      confidence: 4,
      value: 51.5,
    },
  },
  {
    frameRange: [52, 55],
    x: null,
    y: {
      confidence: 3,
      value: 854.6666666666666,
    },
    z: {
      confidence: 3,
      value: 69.66666666666666,
    },
  },
  {
    frameRange: [55, 59],
    x: {
      confidence: 1,
      value: -153,
    },
    y: {
      confidence: 7,
      value: 853.5714285714284,
    },
    z: {
      confidence: 6,
      value: 100.16666666666666,
    },
  },
  {
    frameRange: [59, 63],
    x: {
      confidence: 4,
      value: -127.75,
    },
    y: {
      confidence: 8.666666666666666,
      value: 846.0119047619047,
    },
    z: {
      confidence: 4.666666666666667,
      value: 122.77891156462584,
    },
  },
  {
    frameRange: [63, 66],
    x: {
      confidence: 3,
      value: -108.33333333333333,
    },
    y: {
      confidence: 6,
      value: 850.3333333333333,
    },
    z: {
      confidence: 3,
      value: 146,
    },
  },
  {
    frameRange: [66, 70],
    x: {
      confidence: 4,
      value: -92,
    },
    y: {
      confidence: 8,
      value: 859.625,
    },
    z: {
      confidence: 4,
      value: 143,
    },
  },
  {
    frameRange: [70, 74],
    x: {
      confidence: 4,
      value: -64.75,
    },
    y: {
      confidence: 8,
      value: 867.25,
    },
    z: {
      confidence: 4,
      value: 125.5,
    },
  },
  {
    frameRange: [74, 77],
    x: {
      confidence: 3,
      value: -43.33333333333333,
    },
    y: {
      confidence: 6,
      value: 870.8333333333333,
    },
    z: {
      confidence: 3,
      value: 119.66666666666666,
    },
  },
  {
    frameRange: [77, 81],
    x: {
      confidence: 4,
      value: -9.75,
    },
    y: {
      confidence: 8,
      value: 875.5,
    },
    z: {
      confidence: 4,
      value: 112.75,
    },
  },
  {
    frameRange: [81, 85],
    x: {
      confidence: 4,
      value: 12.25,
    },
    y: {
      confidence: 8,
      value: 879,
    },
    z: {
      confidence: 4,
      value: 106.25,
    },
  },
  {
    frameRange: [85, 88],
    x: {
      confidence: 3,
      value: 20.666666666666664,
    },
    y: {
      confidence: 6,
      value: 885.3333333333333,
    },
    z: {
      confidence: 3,
      value: 93.66666666666666,
    },
  },
  {
    frameRange: [88, 92],
    x: {
      confidence: 4,
      value: 41,
    },
    y: {
      confidence: 8,
      value: 887.25,
    },
    z: {
      confidence: 4,
      value: 82.25,
    },
  },
  {
    frameRange: [92, 96],
    x: {
      confidence: 4,
      value: 72.5,
    },
    y: {
      confidence: 8,
      value: 888.5,
    },
    z: {
      confidence: 4,
      value: 68.5,
    },
  },
  {
    frameRange: [96, 100],
    x: {
      confidence: 4,
      value: 114.25,
    },
    y: {
      confidence: 8,
      value: 883,
    },
    z: {
      confidence: 4,
      value: 47.75,
    },
  },
  {
    frameRange: [100, 103],
    x: {
      confidence: 3,
      value: 131.33333333333331,
    },
    y: {
      confidence: 6,
      value: 874.6666666666666,
    },
    z: {
      confidence: 3,
      value: 30.666666666666664,
    },
  },
  {
    frameRange: [103, 107],
    x: {
      confidence: 6,
      value: 71.16666666666666,
    },
    y: {
      confidence: 10,
      value: 851,
    },
    z: {
      confidence: 4,
      value: 6.25,
    },
  },
  {
    frameRange: [107, 111],
    x: {
      confidence: 8,
      value: 42.375,
    },
    y: {
      confidence: 12,
      value: 835.8333333333333,
    },
    z: {
      confidence: 4,
      value: -11.5,
    },
  },
  {
    frameRange: [111, 114],
    x: {
      confidence: 4,
      value: 22.25,
    },
    y: {
      confidence: 7,
      value: 828.1428571428571,
    },
    z: {
      confidence: 3,
      value: -21.333333333333332,
    },
  },
  {
    frameRange: [114, 118],
    x: {
      confidence: 4,
      value: -1.5,
    },
    y: {
      confidence: 8,
      value: 825.5,
    },
    z: {
      confidence: 4,
      value: -23.5,
    },
  },
  {
    frameRange: [118, 122],
    x: {
      confidence: 4,
      value: -18.5,
    },
    y: {
      confidence: 8,
      value: 818.5,
    },
    z: {
      confidence: 4,
      value: -27.25,
    },
  },
  {
    frameRange: [122, 125],
    x: {
      confidence: 3,
      value: -34.33333333333333,
    },
    y: {
      confidence: 6,
      value: 815.8333333333333,
    },
    z: {
      confidence: 3,
      value: -29,
    },
  },
  {
    frameRange: [125, 129],
    x: {
      confidence: 4,
      value: -63,
    },
    y: {
      confidence: 8,
      value: 809.625,
    },
    z: {
      confidence: 4,
      value: -22.75,
    },
  },
  {
    frameRange: [129, 133],
    x: {
      confidence: 4,
      value: -97.75,
    },
    y: {
      confidence: 8,
      value: 805.625,
    },
    z: {
      confidence: 4,
      value: -20.25,
    },
  },
  {
    frameRange: [133, 136],
    x: {
      confidence: 3,
      value: -112.66666666666666,
    },
    y: {
      confidence: 8.777777777777779,
      value: 792.1329113924049,
    },
    z: {
      confidence: 5.777777777777778,
      value: -24.71153846153846,
    },
  },
  {
    frameRange: [136, 140],
    x: {
      confidence: 4,
      value: -132.75,
    },
    y: {
      confidence: 9,
      value: 785.5555555555557,
    },
    z: {
      confidence: 5,
      value: -21.000000000000004,
    },
  },
  {
    frameRange: [140, 144],
    x: {
      confidence: 5,
      value: -125.4,
    },
    y: {
      confidence: 9,
      value: 789.6666666666666,
    },
    z: {
      confidence: 4,
      value: -5,
    },
  },
  {
    frameRange: [144, 147],
    x: {
      confidence: 3,
      value: -105.33333333333333,
    },
    y: {
      confidence: 6,
      value: 790.3333333333333,
    },
    z: {
      confidence: 3,
      value: 7.999999999999999,
    },
  },
  {
    frameRange: [147, 151],
    x: {
      confidence: 4,
      value: -97.25,
    },
    y: {
      confidence: 8,
      value: 789.375,
    },
    z: {
      confidence: 4,
      value: 19.75,
    },
  },
  {
    frameRange: [151, 155],
    x: {
      confidence: 4,
      value: -65.75,
    },
    y: {
      confidence: 8,
      value: 787.125,
    },
    z: {
      confidence: 4,
      value: 30.25,
    },
  },
  {
    frameRange: [155, 159],
    x: {
      confidence: 4,
      value: -39.75,
    },
    y: {
      confidence: 5,
      value: 789.4,
    },
    z: {
      confidence: 1,
      value: 53,
    },
  },
  {
    frameRange: [159, 162],
    x: {
      confidence: 3,
      value: -20.666666666666664,
    },
    y: {
      confidence: 3,
      value: 786.3333333333333,
    },
    z: null,
  },
  {
    frameRange: [162, 166],
    x: {
      confidence: 7,
      value: -11.714285714285714,
    },
    y: {
      confidence: 10,
      value: 772.8,
    },
    z: {
      confidence: 3,
      value: 14,
    },
  },
  {
    frameRange: [166, 170],
    x: {
      confidence: 4,
      value: -29.25,
    },
    y: {
      confidence: 8,
      value: 760.25,
    },
    z: {
      confidence: 4,
      value: 7,
    },
  },
  {
    frameRange: [170, 173],
    x: {
      confidence: 3,
      value: -44.33333333333333,
    },
    y: {
      confidence: 6,
      value: 740.1666666666666,
    },
    z: {
      confidence: 3,
      value: -3.9999999999999996,
    },
  },
  {
    frameRange: [173, 177],
    x: {
      confidence: 4,
      value: -55.25,
    },
    y: {
      confidence: 4,
      value: 716.5,
    },
    z: null,
  },
  {
    frameRange: [177, 181],
    x: {
      confidence: 4,
      value: -78.5,
    },
    y: {
      confidence: 7,
      value: 684.4285714285713,
    },
    z: {
      confidence: 3,
      value: -8.666666666666666,
    },
  },
  {
    frameRange: [181, 184],
    x: {
      confidence: 2,
      value: -98,
    },
    y: {
      confidence: 5,
      value: 667.6000000000001,
    },
    z: {
      confidence: 3,
      value: -3,
    },
  },
  {
    frameRange: [184, 188],
    x: {
      confidence: 3,
      value: -76,
    },
    y: {
      confidence: 4,
      value: 641.25,
    },
    z: {
      confidence: 1,
      value: 7,
    },
  },
  {
    frameRange: [188, 192],
    x: {
      confidence: 4,
      value: -47.5,
    },
    y: {
      confidence: 6,
      value: 648,
    },
    z: {
      confidence: 2,
      value: 49,
    },
  },
  {
    frameRange: [192, 195],
    x: {
      confidence: 3,
      value: -21.333333333333332,
    },
    y: {
      confidence: 6,
      value: 642.3333333333333,
    },
    z: {
      confidence: 3,
      value: 52.66666666666666,
    },
  },
  {
    frameRange: [195, 199],
    x: {
      confidence: 4,
      value: -4.5,
    },
    y: {
      confidence: 8,
      value: 626,
    },
    z: {
      confidence: 4,
      value: 58.5,
    },
  },
  {
    frameRange: [199, 203],
    x: {
      confidence: 4,
      value: 12,
    },
    y: {
      confidence: 8,
      value: 612.5,
    },
    z: {
      confidence: 4,
      value: 64,
    },
  },
  {
    frameRange: [203, 206],
    x: {
      confidence: 3,
      value: 23,
    },
    y: {
      confidence: 7,
      value: 592.8571428571428,
    },
    z: {
      confidence: 4,
      value: 62,
    },
  },
  {
    frameRange: [206, 210],
    x: {
      confidence: 7,
      value: 45.14285714285714,
    },
    y: {
      confidence: 15,
      value: 572.3333333333334,
    },
    z: {
      confidence: 8,
      value: 54,
    },
  },
  {
    frameRange: [210, 214],
    x: {
      confidence: 8,
      value: 46.25,
    },
    y: {
      confidence: 13,
      value: 570.5384615384615,
    },
    z: {
      confidence: 5,
      value: 38.4,
    },
  },
  {
    frameRange: [214, 218],
    x: {
      confidence: 8,
      value: 31.875,
    },
    y: {
      confidence: 12,
      value: 576.9166666666666,
    },
    z: {
      confidence: 4,
      value: 13.75,
    },
  },
  {
    frameRange: [218, 221],
    x: {
      confidence: 4,
      value: 22.25,
    },
    y: {
      confidence: 7,
      value: 574.5714285714284,
    },
    z: {
      confidence: 3,
      value: -11.666666666666666,
    },
  },
  {
    frameRange: [221, 225],
    x: {
      confidence: 4,
      value: 10.75,
    },
    y: {
      confidence: 8,
      value: 570,
    },
    z: {
      confidence: 4,
      value: -38,
    },
  },
  {
    frameRange: [225, 229],
    x: {
      confidence: 4,
      value: -16,
    },
    y: {
      confidence: 10,
      value: 559.3,
    },
    z: {
      confidence: 6,
      value: -60.5,
    },
  },
  {
    frameRange: [229, 232],
    x: {
      confidence: 3,
      value: -36.33333333333333,
    },
    y: {
      confidence: 9,
      value: 552.9999999999999,
    },
    z: {
      confidence: 6,
      value: -63.33333333333333,
    },
  },
  {
    frameRange: [232, 236],
    x: {
      confidence: 4,
      value: -58.5,
    },
    y: {
      confidence: 12,
      value: 560.25,
    },
    z: {
      confidence: 8,
      value: -46,
    },
  },
  {
    frameRange: [236, 240],
    x: {
      confidence: 4,
      value: -72,
    },
    y: {
      confidence: 12,
      value: 570.3333333333333,
    },
    z: {
      confidence: 8,
      value: -30.25,
    },
  },
  {
    frameRange: [240, 243],
    x: {
      confidence: 3,
      value: -77.66666666666666,
    },
    y: {
      confidence: 6,
      value: 563.1666666666666,
    },
    z: {
      confidence: 3,
      value: -16.333333333333332,
    },
  },
  {
    frameRange: [243, 247],
    x: {
      confidence: 4,
      value: -82.5,
    },
    y: {
      confidence: 8,
      value: 563.125,
    },
    z: {
      confidence: 4,
      value: 8.5,
    },
  },
  {
    frameRange: [247, 251],
    x: {
      confidence: 7,
      value: -67,
    },
    y: {
      confidence: 11,
      value: 570.3636363636363,
    },
    z: {
      confidence: 4,
      value: 36.75,
    },
  },
  {
    frameRange: [251, 254],
    x: {
      confidence: 3,
      value: -48,
    },
    y: {
      confidence: 6,
      value: 566.1666666666666,
    },
    z: {
      confidence: 3,
      value: 54.66666666666666,
    },
  },
  {
    frameRange: [254, 258],
    x: {
      confidence: 4,
      value: -30.5,
    },
    y: {
      confidence: 12,
      value: 570.3333333333333,
    },
    z: {
      confidence: 8,
      value: 62.625,
    },
  },
  {
    frameRange: [258, 262],
    x: {
      confidence: 4,
      value: -12.5,
    },
    y: {
      confidence: 12,
      value: 559.25,
    },
    z: {
      confidence: 8,
      value: 59.125,
    },
  },
  {
    frameRange: [262, 265],
    x: {
      confidence: 3,
      value: 3.9999999999999996,
    },
    y: {
      confidence: 9,
      value: 544,
    },
    z: {
      confidence: 6,
      value: 43.83333333333333,
    },
  },
  {
    frameRange: [265, 269],
    x: {
      confidence: 4,
      value: 20,
    },
    y: {
      confidence: 10,
      value: 533.6,
    },
    z: {
      confidence: 6,
      value: 31.499999999999996,
    },
  },
  {
    frameRange: [269, 273],
    x: {
      confidence: 4,
      value: 31.25,
    },
    y: {
      confidence: 8,
      value: 521.875,
    },
    z: {
      confidence: 4,
      value: 20.75,
    },
  },
  {
    frameRange: [273, 277],
    x: {
      confidence: 7,
      value: 25.142857142857142,
    },
    y: {
      confidence: 11,
      value: 495.0909090909091,
    },
    z: {
      confidence: 4,
      value: 5.5,
    },
  },
  {
    frameRange: [277, 280],
    x: {
      confidence: 4.888888888888889,
      value: 16.96590909090909,
    },
    y: {
      confidence: 7.888888888888889,
      value: 476.281690140845,
    },
    z: {
      confidence: 3,
      value: -3,
    },
  },
  {
    frameRange: [280, 284],
    x: {
      confidence: 7.333333333333334,
      value: 4.2727272727272725,
    },
    y: {
      confidence: 11.333333333333334,
      value: 454.5,
    },
    z: {
      confidence: 4,
      value: -13.75,
    },
  },
  {
    frameRange: [284, 288],
    x: {
      confidence: 8,
      value: -7.875,
    },
    y: {
      confidence: 12,
      value: 445.5833333333333,
    },
    z: {
      confidence: 4,
      value: -21.25,
    },
  },
  {
    frameRange: [288, 291],
    x: {
      confidence: 4.111111111111111,
      value: -32.41891891891892,
    },
    y: {
      confidence: 6.111111111111111,
      value: 441.5454545454545,
    },
    z: {
      confidence: 2,
      value: -23.5,
    },
  },
  {
    frameRange: [291, 295],
    x: {
      confidence: 5.444444444444445,
      value: -50.57142857142857,
    },
    y: {
      confidence: 8.444444444444445,
      value: 431.7565789473684,
    },
    z: {
      confidence: 3,
      value: -24.666666666666664,
    },
  },
  {
    frameRange: [295, 299],
    x: {
      confidence: 8,
      value: -62.75,
    },
    y: {
      confidence: 12,
      value: 434.91666666666663,
    },
    z: {
      confidence: 4,
      value: -12,
    },
  },
  {
    frameRange: [299, 302],
    x: {
      confidence: 5,
      value: -57.00000000000001,
    },
    y: {
      confidence: 8,
      value: 438.125,
    },
    z: {
      confidence: 3,
      value: 10,
    },
  },
  {
    frameRange: [302, 306],
    x: {
      confidence: 4,
      value: -38.75,
    },
    y: {
      confidence: 8,
      value: 432.875,
    },
    z: {
      confidence: 4,
      value: 27,
    },
  },
  {
    frameRange: [306, 310],
    x: {
      confidence: 4,
      value: -15,
    },
    y: {
      confidence: 11,
      value: 434.36363636363626,
    },
    z: {
      confidence: 7,
      value: 46.14285714285714,
    },
  },
  {
    frameRange: [310, 313],
    x: {
      confidence: 3,
      value: 2,
    },
    y: {
      confidence: 6,
      value: 424.3333333333333,
    },
    z: {
      confidence: 3,
      value: 23.666666666666664,
    },
  },
  {
    frameRange: [313, 317],
    x: {
      confidence: 4,
      value: -0.25,
    },
    y: {
      confidence: 8,
      value: 405.25,
    },
    z: {
      confidence: 4,
      value: 11.5,
    },
  },
  {
    frameRange: [317, 321],
    x: {
      confidence: 6,
      value: -33.166666666666664,
    },
    y: {
      confidence: 11,
      value: 378,
    },
    z: {
      confidence: 5,
      value: 7.4,
    },
  },
  {
    frameRange: [321, 324],
    x: {
      confidence: 5.555555555555555,
      value: -37.25,
    },
    y: {
      confidence: 11.555555555555555,
      value: 361.52403846153845,
    },
    z: {
      confidence: 6,
      value: 6,
    },
  },
  {
    frameRange: [324, 328],
    x: {
      confidence: 7.555555555555555,
      value: -30.860294117647058,
    },
    y: {
      confidence: 15.555555555555555,
      value: 344.08928571428567,
    },
    z: {
      confidence: 8,
      value: 12.375,
    },
  },
  {
    frameRange: [328, 332],
    x: {
      confidence: 8,
      value: -23.25,
    },
    y: {
      confidence: 16,
      value: 325.0625,
    },
    z: {
      confidence: 8,
      value: 23.75,
    },
  },
  {
    frameRange: [332, 335],
    x: {
      confidence: 6,
      value: -4.333333333333333,
    },
    y: {
      confidence: 12,
      value: 299.0833333333333,
    },
    z: {
      confidence: 6,
      value: 30.666666666666664,
    },
  },
  {
    frameRange: [335, 339],
    x: {
      confidence: 8,
      value: 5.625,
    },
    y: {
      confidence: 16,
      value: 280.8125,
    },
    z: {
      confidence: 8,
      value: 21.25,
    },
  },
  {
    frameRange: [339, 343],
    x: {
      confidence: 8,
      value: 5.625,
    },
    y: {
      confidence: 16,
      value: 267.625,
    },
    z: {
      confidence: 8,
      value: 4.125,
    },
  },
  {
    frameRange: [343, 347],
    x: {
      confidence: 8,
      value: -15.875,
    },
    y: {
      confidence: 16,
      value: 254.125,
    },
    z: {
      confidence: 8,
      value: -5.875,
    },
  },
  {
    frameRange: [347, 350],
    x: {
      confidence: 6,
      value: -20.666666666666664,
    },
    y: {
      confidence: 12,
      value: 242.33333333333331,
    },
    z: {
      confidence: 6,
      value: 10.666666666666666,
    },
  },
  {
    frameRange: [350, 354],
    x: {
      confidence: 8,
      value: -5,
    },
    y: {
      confidence: 16,
      value: 232.25,
    },
    z: {
      confidence: 8,
      value: 17.5,
    },
  },
  {
    frameRange: [354, 358],
    x: {
      confidence: 8,
      value: 2,
    },
    y: {
      confidence: 16,
      value: 221.3125,
    },
    z: {
      confidence: 8,
      value: 0.125,
    },
  },
  {
    frameRange: [358, 361],
    x: {
      confidence: 4.888888888888889,
      value: -12.568181818181818,
    },
    y: {
      confidence: 10.88888888888889,
      value: 209.2091836734694,
    },
    z: {
      confidence: 6,
      value: -5.666666666666667,
    },
  },
  {
    frameRange: [361, 365],
    x: {
      confidence: 7.333333333333334,
      value: -26.454545454545453,
    },
    y: {
      confidence: 12.333333333333334,
      value: 187.94594594594594,
    },
    z: {
      confidence: 5,
      value: 4.4,
    },
  },
  {
    frameRange: [365, 369],
    x: {
      confidence: 8,
      value: -20.875,
    },
    y: {
      confidence: 12.11111111111111,
      value: 167.22018348623854,
    },
    z: {
      confidence: 4.111111111111111,
      value: 9.027027027027028,
    },
  },
  {
    frameRange: [369, 372],
    x: {
      confidence: 6,
      value: -5.833333333333332,
    },
    y: {
      confidence: 12,
      value: 153.08333333333331,
    },
    z: {
      confidence: 6,
      value: 21.5,
    },
  },
  {
    frameRange: [372, 376],
    x: {
      confidence: 8,
      value: -1.5,
    },
    y: {
      confidence: 16,
      value: 142.6875,
    },
    z: {
      confidence: 8,
      value: 13,
    },
  },
  {
    frameRange: [376, 380],
    x: {
      confidence: 8,
      value: 3.875,
    },
    y: {
      confidence: 16,
      value: 125.6875,
    },
    z: {
      confidence: 8,
      value: -2.125,
    },
  },
  {
    frameRange: [380, 383],
    x: {
      confidence: 6,
      value: 3,
    },
    y: {
      confidence: 12,
      value: 104.58333333333331,
    },
    z: {
      confidence: 6,
      value: -8.666666666666666,
    },
  },
  {
    frameRange: [383, 387],
    x: {
      confidence: 8,
      value: -2.25,
    },
    y: {
      confidence: 16,
      value: 87.0625,
    },
    z: {
      confidence: 8,
      value: -7.125,
    },
  },
  {
    frameRange: [387, 391],
    x: {
      confidence: 8,
      value: -8,
    },
    y: {
      confidence: 16,
      value: 71,
    },
    z: {
      confidence: 8,
      value: -1.125,
    },
  },
  {
    frameRange: [391, 394],
    x: {
      confidence: 6,
      value: -6.166666666666666,
    },
    y: {
      confidence: 12,
      value: 52.33333333333333,
    },
    z: {
      confidence: 6,
      value: 6.333333333333333,
    },
  },
  {
    frameRange: [394, 398],
    x: {
      confidence: 8,
      value: 5.375,
    },
    y: {
      confidence: 16,
      value: 31.8125,
    },
    z: {
      confidence: 8,
      value: 13.625,
    },
  },
  {
    frameRange: [398, 402],
    x: {
      confidence: 8,
      value: 10.125,
    },
    y: {
      confidence: 16,
      value: 16.875,
    },
    z: {
      confidence: 8,
      value: 7.875,
    },
  },
  {
    frameRange: [402, 406],
    x: {
      confidence: 8,
      value: 2.875,
    },
    y: {
      confidence: 16,
      value: 3.9375,
    },
    z: {
      confidence: 8,
      value: -0.875,
    },
  },
  {
    frameRange: [406, 409],
    x: {
      confidence: 6,
      value: -5.666666666666666,
    },
    y: {
      confidence: 12,
      value: 8.5,
    },
    z: {
      confidence: 6,
      value: 7.666666666666666,
    },
  },
  {
    frameRange: [409, 413],
    x: {
      confidence: 8,
      value: -3.625,
    },
    y: {
      confidence: 16,
      value: 24.9375,
    },
    z: {
      confidence: 8,
      value: 14.5,
    },
  },
  {
    frameRange: [413, 417],
    x: {
      confidence: 8,
      value: 6.75,
    },
    y: {
      confidence: 16,
      value: 49.5,
    },
    z: {
      confidence: 8,
      value: 14.5,
    },
  },
  {
    frameRange: [417, 420],
    x: {
      confidence: 6,
      value: 10.666666666666666,
    },
    y: {
      confidence: 12,
      value: 67.66666666666666,
    },
    z: {
      confidence: 6,
      value: 8.666666666666666,
    },
  },
  {
    frameRange: [420, 424],
    x: {
      confidence: 8,
      value: 11.875,
    },
    y: {
      confidence: 16,
      value: 84.5625,
    },
    z: {
      confidence: 8,
      value: 1.25,
    },
  },
  {
    frameRange: [424, 428],
    x: {
      confidence: 8,
      value: 4.375,
    },
    y: {
      confidence: 16,
      value: 104.4375,
    },
    z: {
      confidence: 8,
      value: -9.5,
    },
  },
  {
    frameRange: [428, 431],
    x: {
      confidence: 6,
      value: -9.166666666666666,
    },
    y: {
      confidence: 12,
      value: 122.41666666666666,
    },
    z: {
      confidence: 6,
      value: -6.833333333333333,
    },
  },
  {
    frameRange: [431, 435],
    x: {
      confidence: 8,
      value: -17.125,
    },
    y: {
      confidence: 16,
      value: 131.875,
    },
    z: {
      confidence: 8,
      value: 0,
    },
  },
  {
    frameRange: [435, 439],
    x: {
      confidence: 8,
      value: -18.375,
    },
    y: {
      confidence: 16,
      value: 144.375,
    },
    z: {
      confidence: 8,
      value: 15,
    },
  },
  {
    frameRange: [439, 442],
    x: {
      confidence: 6,
      value: -9.833333333333332,
    },
    y: {
      confidence: 12,
      value: 157.16666666666666,
    },
    z: {
      confidence: 6,
      value: 30.5,
    },
  },
  {
    frameRange: [442, 446],
    x: {
      confidence: 8,
      value: 2.75,
    },
    y: {
      confidence: 16,
      value: 167.4375,
    },
    z: {
      confidence: 8,
      value: 38.125,
    },
  },
  {
    frameRange: [446, 450],
    x: {
      confidence: 7,
      value: 18.285714285714285,
    },
    y: {
      confidence: 15,
      value: 177.13333333333333,
    },
    z: {
      confidence: 8,
      value: 35.625,
    },
  },
  {
    frameRange: [450, 453],
    x: {
      confidence: 3.111111111111111,
      value: 39.80357142857143,
    },
    y: {
      confidence: 9.11111111111111,
      value: 191.0060975609756,
    },
    z: {
      confidence: 6,
      value: 19.5,
    },
  },
  {
    frameRange: [453, 457],
    x: {
      confidence: 5,
      value: 42.2,
    },
    y: {
      confidence: 12,
      value: 203.66666666666666,
    },
    z: {
      confidence: 7,
      value: 10,
    },
  },
  {
    frameRange: [457, 461],
    x: {
      confidence: 8,
      value: 38.375,
    },
    y: {
      confidence: 12,
      value: 217.74999999999997,
    },
    z: {
      confidence: 4,
      value: -9.25,
    },
  },
  {
    frameRange: [461, 465],
    x: {
      confidence: 8,
      value: 31.125,
    },
    y: {
      confidence: 12,
      value: 229,
    },
    z: {
      confidence: 4,
      value: -24.5,
    },
  },
  {
    frameRange: [465, 468],
    x: {
      confidence: 6,
      value: 22,
    },
    y: {
      confidence: 9,
      value: 243.1111111111111,
    },
    z: {
      confidence: 3,
      value: -33,
    },
  },
  {
    frameRange: [468, 472],
    x: {
      confidence: 8,
      value: 6.125,
    },
    y: {
      confidence: 12,
      value: 260.3333333333333,
    },
    z: {
      confidence: 4,
      value: -43.75,
    },
  },
  {
    frameRange: [472, 476],
    x: {
      confidence: 8,
      value: -21,
    },
    y: {
      confidence: 14,
      value: 276.6428571428571,
    },
    z: {
      confidence: 6,
      value: -47.66666666666666,
    },
  },
  {
    frameRange: [476, 479],
    x: {
      confidence: 6,
      value: -35.166666666666664,
    },
    y: {
      confidence: 12,
      value: 285.75,
    },
    z: {
      confidence: 6,
      value: -48,
    },
  },
  {
    frameRange: [479, 483],
    x: {
      confidence: 8,
      value: -44.875,
    },
    y: {
      confidence: 16,
      value: 297.4375,
    },
    z: {
      confidence: 8,
      value: -41.625,
    },
  },
  {
    frameRange: [483, 487],
    x: {
      confidence: 8,
      value: -60.25,
    },
    y: {
      confidence: 16,
      value: 313.8125,
    },
    z: {
      confidence: 8,
      value: -32.125,
    },
  },
  {
    frameRange: [487, 490],
    x: {
      confidence: 6,
      value: -75.83333333333333,
    },
    y: {
      confidence: 12,
      value: 329,
    },
    z: {
      confidence: 6,
      value: -21.333333333333332,
    },
  },
  {
    frameRange: [490, 494],
    x: {
      confidence: 8,
      value: -80.75,
    },
    y: {
      confidence: 16,
      value: 344.875,
    },
    z: {
      confidence: 8,
      value: -6.625,
    },
  },
  {
    frameRange: [494, 498],
    x: {
      confidence: 6.111111111111111,
      value: -79.85454545454544,
    },
    y: {
      confidence: 12.11111111111111,
      value: 356.8853211009175,
    },
    z: {
      confidence: 6,
      value: 11.333333333333332,
    },
  },
  {
    frameRange: [498, 501],
    x: {
      confidence: 3.4444444444444446,
      value: -70.43548387096774,
    },
    y: {
      confidence: 6.444444444444445,
      value: 357.67241379310343,
    },
    z: {
      confidence: 3,
      value: 44.33333333333333,
    },
  },
  {
    frameRange: [501, 505],
    x: {
      confidence: 8,
      value: -65.625,
    },
    y: {
      confidence: 12,
      value: 369.3333333333333,
    },
    z: {
      confidence: 4,
      value: 59.5,
    },
  },
  {
    frameRange: [505, 509],
    x: {
      confidence: 4,
      value: -56.5,
    },
    y: {
      confidence: 10,
      value: 377.49999999999994,
    },
    z: {
      confidence: 6,
      value: 82,
    },
  },
  {
    frameRange: [509, 512],
    x: {
      confidence: 3,
      value: -35.33333333333333,
    },
    y: {
      confidence: 9,
      value: 385.88888888888886,
    },
    z: {
      confidence: 6,
      value: 90.5,
    },
  },
  {
    frameRange: [512, 516],
    x: {
      confidence: 4,
      value: -8.25,
    },
    y: {
      confidence: 12,
      value: 383.74999999999994,
    },
    z: {
      confidence: 8,
      value: 94.875,
    },
  },
  {
    frameRange: [516, 520],
    x: {
      confidence: 4,
      value: 5.5,
    },
    y: {
      confidence: 12,
      value: 383.41666666666663,
    },
    z: {
      confidence: 8,
      value: 104.75,
    },
  },
  {
    frameRange: [520, 524],
    x: {
      confidence: 4,
      value: 25.75,
    },
    y: {
      confidence: 12,
      value: 380.91666666666663,
    },
    z: {
      confidence: 8,
      value: 109,
    },
  },
  {
    frameRange: [524, 527],
    x: {
      confidence: 3,
      value: 58,
    },
    y: {
      confidence: 8,
      value: 374.375,
    },
    z: {
      confidence: 5,
      value: 105.60000000000001,
    },
  },
  {
    frameRange: [527, 531],
    x: {
      confidence: 4,
      value: 77.5,
    },
    y: {
      confidence: 8,
      value: 365.5,
    },
    z: {
      confidence: 4,
      value: 101.25,
    },
  },
  {
    frameRange: [531, 535],
    x: {
      confidence: 4,
      value: 84.75,
    },
    y: {
      confidence: 8,
      value: 363,
    },
    z: {
      confidence: 4,
      value: 85,
    },
  },
  {
    frameRange: [535, 538],
    x: {
      confidence: 3,
      value: 89,
    },
    y: {
      confidence: 6,
      value: 362.8333333333333,
    },
    z: {
      confidence: 3,
      value: 64.33333333333333,
    },
  },
  {
    frameRange: [538, 542],
    x: {
      confidence: 4,
      value: 69,
    },
    y: {
      confidence: 8,
      value: 365,
    },
    z: {
      confidence: 4,
      value: 41.25,
    },
  },
  {
    frameRange: [542, 546],
    x: {
      confidence: 4,
      value: 58.25,
    },
    y: {
      confidence: 8,
      value: 363.125,
    },
    z: {
      confidence: 4,
      value: 13.5,
    },
  },
  {
    frameRange: [546, 549],
    x: {
      confidence: 2.111111111111111,
      value: 43.6578947368421,
    },
    y: {
      confidence: 5.111111111111111,
      value: 368.4891304347826,
    },
    z: {
      confidence: 3,
      value: -3.6666666666666665,
    },
  },
  {
    frameRange: [549, 553],
    x: {
      confidence: 6,
      value: 60.02777777777777,
    },
    y: {
      confidence: 10,
      value: 376.9555555555555,
    },
    z: {
      confidence: 4,
      value: -17.5,
    },
  },
  {
    frameRange: [553, 557],
    x: {
      confidence: 5,
      value: 23.2,
    },
    y: {
      confidence: 9,
      value: 393.7777777777777,
    },
    z: {
      confidence: 4,
      value: -59,
    },
  },
  {
    frameRange: [557, 560],
    x: {
      confidence: 3,
      value: -106.33333333333333,
    },
    y: {
      confidence: 6,
      value: 418.99999999999994,
    },
    z: {
      confidence: 3,
      value: -48.66666666666666,
    },
  },
  {
    frameRange: [560, 564],
    x: {
      confidence: 4,
      value: -123,
    },
    y: {
      confidence: 8,
      value: 425.5,
    },
    z: {
      confidence: 4,
      value: -33.25,
    },
  },
  {
    frameRange: [564, 568],
    x: {
      confidence: 4,
      value: -134.5,
    },
    y: {
      confidence: 8,
      value: 431,
    },
    z: {
      confidence: 4,
      value: -0.75,
    },
  },
  {
    frameRange: [568, 571],
    x: {
      confidence: 3,
      value: -119.33333333333333,
    },
    y: {
      confidence: 6,
      value: 430.99999999999994,
    },
    z: {
      confidence: 3,
      value: 23.999999999999996,
    },
  },
  {
    frameRange: [571, 575],
    x: {
      confidence: 4,
      value: -118.75,
    },
    y: {
      confidence: 8,
      value: 430,
    },
    z: {
      confidence: 4,
      value: 37.25,
    },
  },
  {
    frameRange: [575, 579],
    x: {
      confidence: 4,
      value: -109,
    },
    y: {
      confidence: 8,
      value: 430.875,
    },
    z: {
      confidence: 4,
      value: 59,
    },
  },
  {
    frameRange: [579, 582],
    x: {
      confidence: 3,
      value: -100,
    },
    y: {
      confidence: 6,
      value: 432.83333333333326,
    },
    z: {
      confidence: 3,
      value: 79.33333333333333,
    },
  },
  {
    frameRange: [582, 586],
    x: {
      confidence: 4,
      value: -87.25,
    },
    y: {
      confidence: 8,
      value: 436.625,
    },
    z: {
      confidence: 4,
      value: 95,
    },
  },
  {
    frameRange: [586, 590],
    x: {
      confidence: 4,
      value: -78,
    },
    y: {
      confidence: 10,
      value: 448.5,
    },
    z: {
      confidence: 6,
      value: 115.83333333333333,
    },
  },
  {
    frameRange: [590, 594],
    x: {
      confidence: 4,
      value: -70,
    },
    y: {
      confidence: 11.11111111111111,
      value: 462.455,
    },
    z: {
      confidence: 7.111111111111111,
      value: 136.2890625,
    },
  },
  {
    frameRange: [594, 597],
    x: {
      confidence: 3,
      value: -51,
    },
    y: {
      confidence: 7.111111111111111,
      value: 469.0390625,
    },
    z: {
      confidence: 4.111111111111111,
      value: 147.98648648648648,
    },
  },
  {
    frameRange: [597, 601],
    x: {
      confidence: 4,
      value: -32.5,
    },
    y: {
      confidence: 9.444444444444445,
      value: 478.48823529411766,
    },
    z: {
      confidence: 5.444444444444445,
      value: 160.0816326530612,
    },
  },
  {
    frameRange: [601, 605],
    x: {
      confidence: 4,
      value: -1.5,
    },
    y: {
      confidence: 10.555555555555555,
      value: 492.36541353383456,
    },
    z: {
      confidence: 6.555555555555555,
      value: 166.6440677966102,
    },
  },
  {
    frameRange: [605, 608],
    x: {
      confidence: 3,
      value: 18.666666666666664,
    },
    y: {
      confidence: 7.444444444444445,
      value: 510.8880597014926,
    },
    z: {
      confidence: 4.444444444444445,
      value: 158.86249999999998,
    },
  },
  {
    frameRange: [608, 612],
    x: {
      confidence: 4,
      value: 38.75,
    },
    y: {
      confidence: 12,
      value: 524.1666666666666,
    },
    z: {
      confidence: 8,
      value: 158.25,
    },
  },
  {
    frameRange: [612, 616],
    x: {
      confidence: 4,
      value: 58.25,
    },
    y: {
      confidence: 9,
      value: 532.4444444444443,
    },
    z: {
      confidence: 5,
      value: 156.20000000000002,
    },
  },
  {
    frameRange: [616, 619],
    x: {
      confidence: 3,
      value: 72.33333333333333,
    },
    y: {
      confidence: 6,
      value: 539,
    },
    z: {
      confidence: 3,
      value: 147.66666666666666,
    },
  },
  {
    frameRange: [619, 623],
    x: {
      confidence: 4,
      value: 79.75,
    },
    y: {
      confidence: 10,
      value: 546.2,
    },
    z: {
      confidence: 6,
      value: 120.66666666666666,
    },
  },
  {
    frameRange: [623, 627],
    x: {
      confidence: 4,
      value: 105.25,
    },
    y: {
      confidence: 8,
      value: 556.25,
    },
    z: {
      confidence: 4,
      value: 116.25,
    },
  },
  {
    frameRange: [627, 630],
    x: {
      confidence: 2.7777777777777777,
      value: 117.26,
    },
    y: {
      confidence: 5.777777777777778,
      value: 563.4807692307693,
    },
    z: {
      confidence: 3,
      value: 94.99999999999999,
    },
  },
  {
    frameRange: [630, 634],
    x: {
      confidence: 4,
      value: 115,
    },
    y: {
      confidence: 8,
      value: 566.75,
    },
    z: {
      confidence: 4,
      value: 73.75,
    },
  },
  {
    frameRange: [634, 638],
    x: {
      confidence: 4,
      value: 126.5,
    },
    y: {
      confidence: 8,
      value: 573.75,
    },
    z: {
      confidence: 4,
      value: 51,
    },
  },
  {
    frameRange: [638, 641],
    x: {
      confidence: 3,
      value: 133.33333333333331,
    },
    y: {
      confidence: 6,
      value: 577.5,
    },
    z: {
      confidence: 3,
      value: 48.33333333333333,
    },
  },
  {
    frameRange: [641, 645],
    x: {
      confidence: 6,
      value: 137.83333333333331,
    },
    y: {
      confidence: 10,
      value: 585.4,
    },
    z: {
      confidence: 4,
      value: 15.5,
    },
  },
  {
    frameRange: [645, 649],
    x: {
      confidence: 4,
      value: 136.75,
    },
    y: {
      confidence: 8,
      value: 586.125,
    },
    z: {
      confidence: 4,
      value: -21.75,
    },
  },
  {
    frameRange: [649, 653],
    x: {
      confidence: 4,
      value: 126.25,
    },
    y: {
      confidence: 8,
      value: 585,
    },
    z: {
      confidence: 4,
      value: -40.75,
    },
  },
  {
    frameRange: [653, 656],
    x: {
      confidence: 3,
      value: 109,
    },
    y: {
      confidence: 6,
      value: 583.3333333333333,
    },
    z: {
      confidence: 3,
      value: -53.99999999999999,
    },
  },
  {
    frameRange: [656, 660],
    x: {
      confidence: 4,
      value: 89.5,
    },
    y: {
      confidence: 8,
      value: 580.625,
    },
    z: {
      confidence: 4,
      value: -74.25,
    },
  },
  {
    frameRange: [660, 664],
    x: {
      confidence: 4,
      value: 76,
    },
    y: {
      confidence: 8,
      value: 577.25,
    },
    z: {
      confidence: 4,
      value: -94.25,
    },
  },
  {
    frameRange: [664, 667],
    x: {
      confidence: 3,
      value: 53.666666666666664,
    },
    y: {
      confidence: 6,
      value: 574.1666666666666,
    },
    z: {
      confidence: 3,
      value: -103.66666666666666,
    },
  },
  {
    frameRange: [667, 671],
    x: {
      confidence: 4,
      value: 38.5,
    },
    y: {
      confidence: 8,
      value: 570,
    },
    z: {
      confidence: 4,
      value: -121.75,
    },
  },
  {
    frameRange: [671, 675],
    x: {
      confidence: 4,
      value: 18.75,
    },
    y: {
      confidence: 8,
      value: 565.25,
    },
    z: {
      confidence: 4,
      value: -140.25,
    },
  },
  {
    frameRange: [675, 678],
    x: {
      confidence: 3,
      value: 0.3333333333333339,
    },
    y: {
      confidence: 8,
      value: 554.875,
    },
    z: {
      confidence: 5,
      value: -151.60000000000002,
    },
  },
  {
    frameRange: [678, 682],
    x: {
      confidence: 4,
      value: -19.75,
    },
    y: {
      confidence: 12,
      value: 552.8333333333333,
    },
    z: {
      confidence: 8,
      value: -160.625,
    },
  },
  {
    frameRange: [682, 686],
    x: {
      confidence: 4,
      value: -42.25,
    },
    y: {
      confidence: 12,
      value: 559.3333333333333,
    },
    z: {
      confidence: 8,
      value: -164.875,
    },
  },
  {
    frameRange: [686, 689],
    x: {
      confidence: 3,
      value: -64,
    },
    y: {
      confidence: 9,
      value: 564.3333333333333,
    },
    z: {
      confidence: 6,
      value: -161.33333333333331,
    },
  },
  {
    frameRange: [689, 693],
    x: {
      confidence: 4,
      value: -92.75,
    },
    y: {
      confidence: 9.111111111111112,
      value: 565.5182926829267,
    },
    z: {
      confidence: 5.111111111111112,
      value: -155.11956521739128,
    },
  },
  {
    frameRange: [693, 697],
    x: {
      confidence: 4,
      value: -103,
    },
    y: {
      confidence: 10,
      value: 580,
    },
    z: {
      confidence: 6,
      value: -142.16666666666666,
    },
  },
  {
    frameRange: [697, 700],
    x: {
      confidence: 3,
      value: -115.33333333333333,
    },
    y: {
      confidence: 6,
      value: 577.5,
    },
    z: {
      confidence: 3,
      value: -126.99999999999999,
    },
  },
  {
    frameRange: [700, 704],
    x: {
      confidence: 4,
      value: -134.25,
    },
    y: {
      confidence: 8,
      value: 585.75,
    },
    z: {
      confidence: 4,
      value: -122.25,
    },
  },
  {
    frameRange: [704, 708],
    x: {
      confidence: 4,
      value: -150.25,
    },
    y: {
      confidence: 8,
      value: 594,
    },
    z: {
      confidence: 4,
      value: -106.5,
    },
  },
  {
    frameRange: [708, 712],
    x: {
      confidence: 4,
      value: -165.25,
    },
    y: {
      confidence: 8,
      value: 598.625,
    },
    z: {
      confidence: 4,
      value: -85,
    },
  },
  {
    frameRange: [712, 715],
    x: {
      confidence: 3,
      value: -177.33333333333331,
    },
    y: {
      confidence: 6,
      value: 603.5,
    },
    z: {
      confidence: 3,
      value: -58.33333333333333,
    },
  },
  {
    frameRange: [715, 719],
    x: {
      confidence: 4,
      value: -186.75,
    },
    y: {
      confidence: 8,
      value: 608.125,
    },
    z: {
      confidence: 4,
      value: -36.25,
    },
  },
  {
    frameRange: [719, 723],
    x: {
      confidence: 2,
      value: -197.5,
    },
    y: {
      confidence: 6,
      value: 607.5,
    },
    z: {
      confidence: 4,
      value: -18.5,
    },
  },
  {
    frameRange: [723, 726],
    x: null,
    y: {
      confidence: 3,
      value: 605,
    },
    z: {
      confidence: 3,
      value: 4,
    },
  },
  {
    frameRange: [726, 730],
    x: {
      confidence: 4,
      value: -191.5,
    },
    y: {
      confidence: 8,
      value: 619,
    },
    z: {
      confidence: 4,
      value: 26,
    },
  },
  {
    frameRange: [730, 734],
    x: {
      confidence: 4,
      value: -181.5,
    },
    y: {
      confidence: 8,
      value: 623.625,
    },
    z: {
      confidence: 4,
      value: 53,
    },
  },
  {
    frameRange: [734, 737],
    x: {
      confidence: 3,
      value: -160,
    },
    y: {
      confidence: 6,
      value: 632,
    },
    z: {
      confidence: 3,
      value: 76.66666666666666,
    },
  },
  {
    frameRange: [737, 741],
    x: {
      confidence: 4,
      value: -136.5,
    },
    y: {
      confidence: 8,
      value: 637.625,
    },
    z: {
      confidence: 4,
      value: 96,
    },
  },
  {
    frameRange: [741, 745],
    x: {
      confidence: 4,
      value: -118.25,
    },
    y: {
      confidence: 8,
      value: 645.375,
    },
    z: {
      confidence: 4,
      value: 105.25,
    },
  },
  {
    frameRange: [745, 748],
    x: {
      confidence: 3,
      value: -108.99999999999999,
    },
    y: {
      confidence: 6,
      value: 649.6666666666666,
    },
    z: {
      confidence: 3,
      value: 111,
    },
  },
  {
    frameRange: [748, 752],
    x: {
      confidence: 4,
      value: -99.25,
    },
    y: {
      confidence: 8,
      value: 654.25,
    },
    z: {
      confidence: 4,
      value: 114.25,
    },
  },
  {
    frameRange: [752, 756],
    x: {
      confidence: 4,
      value: -86.5,
    },
    y: {
      confidence: 9,
      value: 662.4444444444443,
    },
    z: {
      confidence: 5,
      value: 126.4,
    },
  },
  {
    frameRange: [756, 759],
    x: {
      confidence: 3,
      value: -54.99999999999999,
    },
    y: {
      confidence: 9,
      value: 675.8888888888888,
    },
    z: {
      confidence: 6,
      value: 139.33333333333331,
    },
  },
  {
    frameRange: [759, 763],
    x: {
      confidence: 4,
      value: -34.5,
    },
    y: {
      confidence: 12,
      value: 683.3333333333333,
    },
    z: {
      confidence: 8,
      value: 142,
    },
  },
  {
    frameRange: [763, 767],
    x: {
      confidence: 4,
      value: -10.75,
    },
    y: {
      confidence: 9,
      value: 699.1111111111111,
    },
    z: {
      confidence: 5,
      value: 146,
    },
  },
  {
    frameRange: [767, 771],
    x: {
      confidence: 4,
      value: 3.5,
    },
    y: {
      confidence: 8,
      value: 712.125,
    },
    z: {
      confidence: 4,
      value: 148,
    },
  },
  {
    frameRange: [771, 774],
    x: {
      confidence: 3,
      value: 26,
    },
    y: {
      confidence: 6,
      value: 722.3333333333333,
    },
    z: {
      confidence: 3,
      value: 144,
    },
  },
  {
    frameRange: [774, 778],
    x: {
      confidence: 4,
      value: 58,
    },
    y: {
      confidence: 8,
      value: 734,
    },
    z: {
      confidence: 4,
      value: 137,
    },
  },
  {
    frameRange: [778, 782],
    x: {
      confidence: 4,
      value: 74.25,
    },
    y: {
      confidence: 8,
      value: 743.25,
    },
    z: {
      confidence: 4,
      value: 128.5,
    },
  },
  {
    frameRange: [782, 785],
    x: {
      confidence: 3,
      value: 100.66666666666666,
    },
    y: {
      confidence: 6,
      value: 752.5,
    },
    z: {
      confidence: 3,
      value: 124,
    },
  },
  {
    frameRange: [785, 789],
    x: {
      confidence: 4,
      value: 122.75,
    },
    y: {
      confidence: 8,
      value: 760.625,
    },
    z: {
      confidence: 4,
      value: 119.25,
    },
  },
  {
    frameRange: [789, 793],
    x: {
      confidence: 5,
      value: 134.60000000000002,
    },
    y: {
      confidence: 9,
      value: 766.2222222222222,
    },
    z: {
      confidence: 4,
      value: 110.75,
    },
  },
  {
    frameRange: [793, 796],
    x: {
      confidence: 4.222222222222222,
      value: 148.3796992481203,
    },
    y: {
      confidence: 7.222222222222222,
      value: 770.0703296703296,
    },
    z: {
      confidence: 3,
      value: 93,
    },
  },
  {
    frameRange: [796, 800],
    x: {
      confidence: 5.444444444444445,
      value: 168.75510204081633,
    },
    y: {
      confidence: 9.444444444444445,
      value: 769.8,
    },
    z: {
      confidence: 4,
      value: 75,
    },
  },
  {
    frameRange: [800, 804],
    x: {
      confidence: 8,
      value: 175.625,
    },
    y: {
      confidence: 12,
      value: 753.9999999999999,
    },
    z: {
      confidence: 4,
      value: 59.5,
    },
  },
  {
    frameRange: [804, 807],
    x: {
      confidence: 6,
      value: 179.33333333333331,
    },
    y: {
      confidence: 9,
      value: 739.9999999999999,
    },
    z: {
      confidence: 3,
      value: 38,
    },
  },
  {
    frameRange: [807, 811],
    x: {
      confidence: 8,
      value: 179,
    },
    y: {
      confidence: 12,
      value: 727.1666666666665,
    },
    z: {
      confidence: 4,
      value: 13.5,
    },
  },
  {
    frameRange: [811, 815],
    x: {
      confidence: 8,
      value: 166.875,
    },
    y: {
      confidence: 12,
      value: 712.9999999999999,
    },
    z: {
      confidence: 4,
      value: -10.75,
    },
  },
  {
    frameRange: [815, 818],
    x: {
      confidence: 6,
      value: 162.83333333333331,
    },
    y: {
      confidence: 9,
      value: 704.8888888888888,
    },
    z: {
      confidence: 3,
      value: -43,
    },
  },
  {
    frameRange: [818, 822],
    x: {
      confidence: 8,
      value: 146.125,
    },
    y: {
      confidence: 12,
      value: 703.5833333333333,
    },
    z: {
      confidence: 4,
      value: -54.25,
    },
  },
  {
    frameRange: [822, 826],
    x: {
      confidence: 8,
      value: 126,
    },
    y: {
      confidence: 12,
      value: 706.7499999999999,
    },
    z: {
      confidence: 4,
      value: -64.25,
    },
  },
  {
    frameRange: [826, 830],
    x: {
      confidence: 4,
      value: 110.5,
    },
    y: {
      confidence: 8,
      value: 718.125,
    },
    z: {
      confidence: 4,
      value: -79.75,
    },
  },
  {
    frameRange: [830, 833],
    x: {
      confidence: 3,
      value: 90,
    },
    y: {
      confidence: 6,
      value: 725,
    },
    z: {
      confidence: 3,
      value: -84.33333333333333,
    },
  },
  {
    frameRange: [833, 837],
    x: {
      confidence: 4,
      value: 69,
    },
    y: {
      confidence: 8,
      value: 731.375,
    },
    z: {
      confidence: 4,
      value: -94.25,
    },
  },
  {
    frameRange: [837, 841],
    x: {
      confidence: 4,
      value: 53,
    },
    y: {
      confidence: 10,
      value: 730.6999999999999,
    },
    z: {
      confidence: 6,
      value: -107.16666666666666,
    },
  },
  {
    frameRange: [841, 844],
    x: {
      confidence: 3,
      value: 35.666666666666664,
    },
    y: {
      confidence: 9,
      value: 731.6666666666666,
    },
    z: {
      confidence: 6,
      value: -116.33333333333331,
    },
  },
  {
    frameRange: [844, 848],
    x: {
      confidence: 4,
      value: 12,
    },
    y: {
      confidence: 8,
      value: 749.625,
    },
    z: {
      confidence: 4,
      value: -127.5,
    },
  },
  {
    frameRange: [848, 852],
    x: {
      confidence: 4,
      value: -18.75,
    },
    y: {
      confidence: 8,
      value: 758.75,
    },
    z: {
      confidence: 4,
      value: -126.75,
    },
  },
  {
    frameRange: [852, 855],
    x: {
      confidence: 3,
      value: -43.33333333333333,
    },
    y: {
      confidence: 8,
      value: 756.125,
    },
    z: {
      confidence: 5,
      value: -127.2,
    },
  },
  {
    frameRange: [855, 859],
    x: {
      confidence: 4,
      value: -55.5,
    },
    y: {
      confidence: 11,
      value: 753.2727272727273,
    },
    z: {
      confidence: 7,
      value: -124.14285714285712,
    },
  },
  {
    frameRange: [859, 863],
    x: {
      confidence: 4,
      value: -80,
    },
    y: {
      confidence: 8,
      value: 745.625,
    },
    z: {
      confidence: 4,
      value: -114.75,
    },
  },
  {
    frameRange: [863, 866],
    x: {
      confidence: 3,
      value: -105.33333333333333,
    },
    y: {
      confidence: 6,
      value: 748.5,
    },
    z: {
      confidence: 3,
      value: -112.66666666666666,
    },
  },
  {
    frameRange: [866, 870],
    x: {
      confidence: 4,
      value: -129.5,
    },
    y: {
      confidence: 8,
      value: 750,
    },
    z: {
      confidence: 4,
      value: -98.5,
    },
  },
  {
    frameRange: [870, 874],
    x: {
      confidence: 4,
      value: -145,
    },
    y: {
      confidence: 8,
      value: 750.875,
    },
    z: {
      confidence: 4,
      value: -89.5,
    },
  },
  {
    frameRange: [874, 877],
    x: {
      confidence: 3,
      value: -163.33333333333331,
    },
    y: {
      confidence: 6,
      value: 750.5,
    },
    z: {
      confidence: 3,
      value: -77,
    },
  },
  {
    frameRange: [877, 881],
    x: {
      confidence: 4,
      value: -177.75,
    },
    y: {
      confidence: 8,
      value: 750.375,
    },
    z: {
      confidence: 4,
      value: -57.75,
    },
  },
  {
    frameRange: [881, 885],
    x: {
      confidence: 4,
      value: -195,
    },
    y: {
      confidence: 8,
      value: 751.25,
    },
    z: {
      confidence: 4,
      value: -36.75,
    },
  },
  {
    frameRange: [885, 888],
    x: {
      confidence: 1.4444444444444446,
      value: -212.59615384615384,
    },
    y: {
      confidence: 4.444444444444445,
      value: 750.4749999999999,
    },
    z: {
      confidence: 3,
      value: -7.333333333333333,
    },
  },
  {
    frameRange: [888, 892],
    x: {
      confidence: 4.333333333333333,
      value: -220.0769230769231,
    },
    y: {
      confidence: 8.333333333333334,
      value: 753.9000000000001,
    },
    z: {
      confidence: 4,
      value: 7.75,
    },
  },
  {
    frameRange: [892, 896],
    x: {
      confidence: 2.888888888888889,
      value: -213.3269230769231,
    },
    y: {
      confidence: 6.888888888888889,
      value: 747.6693548387095,
    },
    z: {
      confidence: 4,
      value: 36.25,
    },
  },
  {
    frameRange: [896, 900],
    x: {
      confidence: 4,
      value: -207,
    },
    y: {
      confidence: 8,
      value: 747.375,
    },
    z: {
      confidence: 4,
      value: 58.5,
    },
  },
  {
    frameRange: [900, 903],
    x: {
      confidence: 2.5555555555555554,
      value: -192.47826086956525,
    },
    y: {
      confidence: 5.555555555555555,
      value: 745.52,
    },
    z: {
      confidence: 3,
      value: 88,
    },
  },
  {
    frameRange: [903, 907],
    x: {
      confidence: 3.5555555555555554,
      value: -165.375,
    },
    y: {
      confidence: 7.555555555555555,
      value: 745.9779411764706,
    },
    z: {
      confidence: 4,
      value: 92,
    },
  },
  {
    frameRange: [907, 911],
    x: {
      confidence: 4,
      value: -155,
    },
    y: {
      confidence: 8,
      value: 745.125,
    },
    z: {
      confidence: 4,
      value: 114,
    },
  },
  {
    frameRange: [911, 914],
    x: {
      confidence: 3,
      value: -143,
    },
    y: {
      confidence: 6,
      value: 744.6666666666666,
    },
    z: {
      confidence: 3,
      value: 126.66666666666666,
    },
  },
  {
    frameRange: [914, 918],
    x: {
      confidence: 4,
      value: -129.75,
    },
    y: {
      confidence: 8,
      value: 743.75,
    },
    z: {
      confidence: 4,
      value: 145.25,
    },
  },
  {
    frameRange: [918, 922],
    x: {
      confidence: 4,
      value: -111.75,
    },
    y: {
      confidence: 8,
      value: 742.125,
    },
    z: {
      confidence: 4,
      value: 164,
    },
  },
  {
    frameRange: [922, 925],
    x: {
      confidence: 3,
      value: -92.66666666666666,
    },
    y: {
      confidence: 6,
      value: 742.1666666666666,
    },
    z: {
      confidence: 3,
      value: 173.33333333333331,
    },
  },
  {
    frameRange: [925, 929],
    x: {
      confidence: 4,
      value: -77.25,
    },
    y: {
      confidence: 11,
      value: 752.1818181818181,
    },
    z: {
      confidence: 7,
      value: 199.57142857142856,
    },
  },
  {
    frameRange: [929, 933],
    x: {
      confidence: 4,
      value: -57.5,
    },
    y: {
      confidence: 11,
      value: 759.7272727272726,
    },
    z: {
      confidence: 7,
      value: 206.28571428571428,
    },
  },
  {
    frameRange: [933, 936],
    x: {
      confidence: 3,
      value: -32,
    },
    y: {
      confidence: 6,
      value: 777.3333333333333,
    },
    z: {
      confidence: 3,
      value: 211.33333333333331,
    },
  },
  {
    frameRange: [936, 940],
    x: {
      confidence: 4,
      value: -6,
    },
    y: {
      confidence: 8,
      value: 789.75,
    },
    z: {
      confidence: 4,
      value: 203.25,
    },
  },
  {
    frameRange: [940, 944],
    x: {
      confidence: 4,
      value: 25.25,
    },
    y: {
      confidence: 10.333333333333334,
      value: 795.8645161290322,
    },
    z: {
      confidence: 6.333333333333334,
      value: 183.86315789473682,
    },
  },
  {
    frameRange: [944, 947],
    x: {
      confidence: 3,
      value: 48.66666666666666,
    },
    y: {
      confidence: 7.444444444444445,
      value: 803.4865671641792,
    },
    z: {
      confidence: 4.444444444444445,
      value: 174.16999999999996,
    },
  },
  {
    frameRange: [947, 951],
    x: {
      confidence: 4,
      value: 64.75,
    },
    y: {
      confidence: 8,
      value: 817.125,
    },
    z: {
      confidence: 4,
      value: 174,
    },
  },
  {
    frameRange: [951, 955],
    x: {
      confidence: 4,
      value: 82,
    },
    y: {
      confidence: 8,
      value: 821.875,
    },
    z: {
      confidence: 4,
      value: 158,
    },
  },
  {
    frameRange: [955, 959],
    x: {
      confidence: 4,
      value: 105.25,
    },
    y: {
      confidence: 8,
      value: 829.75,
    },
    z: {
      confidence: 4,
      value: 141,
    },
  },
  {
    frameRange: [959, 962],
    x: {
      confidence: 3,
      value: 116.33333333333333,
    },
    y: {
      confidence: 6,
      value: 831.1666666666666,
    },
    z: {
      confidence: 3,
      value: 134,
    },
  },
  {
    frameRange: [962, 966],
    x: {
      confidence: 4,
      value: 131.25,
    },
    y: {
      confidence: 8,
      value: 837.5,
    },
    z: {
      confidence: 4,
      value: 115.5,
    },
  },
  {
    frameRange: [966, 970],
    x: {
      confidence: 4,
      value: 155.5,
    },
    y: {
      confidence: 8,
      value: 844,
    },
    z: {
      confidence: 4,
      value: 95.5,
    },
  },
  {
    frameRange: [970, 973],
    x: {
      confidence: 3,
      value: 163,
    },
    y: {
      confidence: 6,
      value: 847.9999999999999,
    },
    z: {
      confidence: 3,
      value: 83,
    },
  },
  {
    frameRange: [973, 977],
    x: {
      confidence: 4,
      value: 171.5,
    },
    y: {
      confidence: 8,
      value: 850.25,
    },
    z: {
      confidence: 4,
      value: 61,
    },
  },
  {
    frameRange: [977, 981],
    x: {
      confidence: 8,
      value: 181.375,
    },
    y: {
      confidence: 12,
      value: 847.5833333333333,
    },
    z: {
      confidence: 4,
      value: 28.25,
    },
  },
  {
    frameRange: [981, 984],
    x: {
      confidence: 6,
      value: 179.16666666666666,
    },
    y: {
      confidence: 9,
      value: 852.6666666666665,
    },
    z: {
      confidence: 3,
      value: 0,
    },
  },
  {
    frameRange: [984, 988],
    x: {
      confidence: 4,
      value: 182.75,
    },
    y: {
      confidence: 8,
      value: 865.375,
    },
    z: {
      confidence: 4,
      value: -18.5,
    },
  },
  {
    frameRange: [988, 992],
    x: {
      confidence: 4,
      value: 176.5,
    },
    y: {
      confidence: 8,
      value: 871.125,
    },
    z: {
      confidence: 4,
      value: -40,
    },
  },
  {
    frameRange: [992, 995],
    x: {
      confidence: 3,
      value: 158.33333333333331,
    },
    y: {
      confidence: 6,
      value: 885.5,
    },
    z: {
      confidence: 3,
      value: -71.66666666666666,
    },
  },
  {
    frameRange: [995, 999],
    x: {
      confidence: 4,
      value: 154.25,
    },
    y: {
      confidence: 8,
      value: 893.75,
    },
    z: {
      confidence: 4,
      value: -106,
    },
  },
  {
    frameRange: [999, 1003],
    x: {
      confidence: 4,
      value: 138,
    },
    y: {
      confidence: 8,
      value: 903.25,
    },
    z: {
      confidence: 4,
      value: -121.5,
    },
  },
  {
    frameRange: [1003, 1006],
    x: {
      confidence: 3,
      value: 124,
    },
    y: {
      confidence: 6,
      value: 910.5,
    },
    z: {
      confidence: 3,
      value: -135.33333333333331,
    },
  },
  {
    frameRange: [1006, 1010],
    x: {
      confidence: 4,
      value: 108.75,
    },
    y: {
      confidence: 8,
      value: 916.625,
    },
    z: {
      confidence: 4,
      value: -142.5,
    },
  },
  {
    frameRange: [1010, 1014],
    x: {
      confidence: 4,
      value: 82.25,
    },
    y: {
      confidence: 8,
      value: 924.75,
    },
    z: {
      confidence: 4,
      value: -153.25,
    },
  },
  {
    frameRange: [1014, 1018],
    x: {
      confidence: 4,
      value: 56.25,
    },
    y: {
      confidence: 8,
      value: 930.75,
    },
    z: {
      confidence: 4,
      value: -155.5,
    },
  },
  {
    frameRange: [1018, 1021],
    x: {
      confidence: 3,
      value: 41.666666666666664,
    },
    y: {
      confidence: 6,
      value: 934.1666666666666,
    },
    z: {
      confidence: 3,
      value: -155,
    },
  },
  {
    frameRange: [1021, 1025],
    x: {
      confidence: 4,
      value: 21.25,
    },
    y: {
      confidence: 6.111111111111111,
      value: 930.1363636363637,
    },
    z: {
      confidence: 2.111111111111111,
      value: -146.23684210526315,
    },
  },
  {
    frameRange: [1025, 1029],
    x: {
      confidence: 4,
      value: -12.75,
    },
    y: {
      confidence: 9.444444444444445,
      value: 912.2058823529412,
    },
    z: {
      confidence: 5.444444444444445,
      value: -140.96938775510202,
    },
  },
  {
    frameRange: [1029, 1032],
    x: {
      confidence: 3,
      value: -34,
    },
    y: {
      confidence: 9,
      value: 923.2222222222221,
    },
    z: {
      confidence: 6,
      value: -140.33333333333331,
    },
  },
  {
    frameRange: [1032, 1036],
    x: {
      confidence: 4,
      value: -56,
    },
    y: {
      confidence: 11.11111111111111,
      value: 925.535,
    },
    z: {
      confidence: 7.111111111111111,
      value: -134.421875,
    },
  },
  {
    frameRange: [1036, 1040],
    x: {
      confidence: 4,
      value: -82.5,
    },
    y: {
      confidence: 9,
      value: 924.5555555555554,
    },
    z: {
      confidence: 5,
      value: -131,
    },
  },
  {
    frameRange: [1040, 1043],
    x: {
      confidence: 3,
      value: -105,
    },
    y: {
      confidence: 6,
      value: 927.5,
    },
    z: {
      confidence: 3,
      value: -121.66666666666666,
    },
  },
  {
    frameRange: [1043, 1047],
    x: {
      confidence: 4,
      value: -118.5,
    },
    y: {
      confidence: 8,
      value: 934.75,
    },
    z: {
      confidence: 4,
      value: -112.25,
    },
  },
  {
    frameRange: [1047, 1051],
    x: {
      confidence: 4,
      value: -135,
    },
    y: {
      confidence: 8,
      value: 939.25,
    },
    z: {
      confidence: 4,
      value: -100,
    },
  },
  {
    frameRange: [1051, 1054],
    x: {
      confidence: 3,
      value: -151.66666666666666,
    },
    y: {
      confidence: 8,
      value: 948.375,
    },
    z: {
      confidence: 5,
      value: -93.80000000000001,
    },
  },
  {
    frameRange: [1054, 1058],
    x: {
      confidence: 4,
      value: -169,
    },
    y: {
      confidence: 10,
      value: 950.6,
    },
    z: {
      confidence: 6,
      value: -78.16666666666666,
    },
  },
  {
    frameRange: [1058, 1062],
    x: {
      confidence: 4,
      value: -187,
    },
    y: {
      confidence: 8,
      value: 948.625,
    },
    z: {
      confidence: 4,
      value: -53.25,
    },
  },
  {
    frameRange: [1062, 1065],
    x: {
      confidence: 3,
      value: -199,
    },
    y: {
      confidence: 6,
      value: 945.4999999999999,
    },
    z: {
      confidence: 3,
      value: -28,
    },
  },
  {
    frameRange: [1065, 1069],
    x: {
      confidence: 4,
      value: -191,
    },
    y: {
      confidence: 8,
      value: 936.5,
    },
    z: {
      confidence: 4,
      value: -10,
    },
  },
  {
    frameRange: [1069, 1073],
    x: null,
    y: {
      confidence: 4,
      value: 938,
    },
    z: {
      confidence: 4,
      value: 16.75,
    },
  },
  {
    frameRange: [1073, 1077],
    x: {
      confidence: 4,
      value: -194,
    },
    y: {
      confidence: 8,
      value: 936.75,
    },
    z: {
      confidence: 4,
      value: 47.25,
    },
  },
  {
    frameRange: [1077, 1080],
    x: {
      confidence: 3,
      value: -180,
    },
    y: {
      confidence: 6,
      value: 935.4999999999999,
    },
    z: {
      confidence: 3,
      value: 71.33333333333333,
    },
  },
  {
    frameRange: [1080, 1084],
    x: {
      confidence: 4,
      value: -163.75,
    },
    y: {
      confidence: 8,
      value: 935.125,
    },
    z: {
      confidence: 4,
      value: 84.25,
    },
  },
  {
    frameRange: [1084, 1088],
    x: {
      confidence: 4,
      value: -142.5,
    },
    y: {
      confidence: 8,
      value: 935,
    },
    z: {
      confidence: 4,
      value: 102,
    },
  },
  {
    frameRange: [1088, 1091],
    x: {
      confidence: 3,
      value: -119,
    },
    y: {
      confidence: 6,
      value: 936.1666666666666,
    },
    z: {
      confidence: 3,
      value: 120.33333333333333,
    },
  },
  {
    frameRange: [1091, 1095],
    x: {
      confidence: 4,
      value: -106,
    },
    y: {
      confidence: 8,
      value: 937.125,
    },
    z: {
      confidence: 4,
      value: 133.5,
    },
  },
  {
    frameRange: [1095, 1099],
    x: {
      confidence: 4,
      value: -91,
    },
    y: {
      confidence: 8,
      value: 937.5,
    },
    z: {
      confidence: 4,
      value: 149,
    },
  },
  {
    frameRange: [1099, 1102],
    x: {
      confidence: 3,
      value: -63.33333333333333,
    },
    y: {
      confidence: 5,
      value: 938.6,
    },
    z: {
      confidence: 2,
      value: 174,
    },
  },
  {
    frameRange: [1102, 1106],
    x: {
      confidence: 4,
      value: -42.25,
    },
    y: {
      confidence: 4,
      value: 949.25,
    },
    z: null,
  },
];

export default rawLedPositions;
