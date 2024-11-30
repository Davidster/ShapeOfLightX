/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Slider from '@react-native-community/slider';
import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';
import {
  accelerometer,
  orientation,
  setUpdateIntervalForType,
  SensorTypes,
  SensorData,
  OrientationData,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

setUpdateIntervalForType(SensorTypes.orientation, 50);

// @ts-ignore
import Tree from './tree.svg';
import rawLedPositions, {LedCoord} from './rawLedPositions';

type FixedLedPosition = {
  x: LedCoord;
  y: LedCoord;
  z: LedCoord;
};

const LED_COUNT = 300;
const COLOR_CHANNELS = 4;
const SOCKET_PORT = 34254;
const RPI_IP = '192.168.2.98';

const normVec = (vec: number[]) =>
  Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);

const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/*
      I worked out this list by displaying the full HSL range on my (300) LEDS and noted where the color boundaries were by LED index
      so this is a list of LED indices, from 0->299
      0->20 = blue
      20 -> 77 = light blue
      72 -> 98 = blue-green
      98 -> 122 = green
      122 -> 158 = yellow-green
      158 -> 177 = yellow
      177 -> 186 = yellow-orange
      186 -> 192 = light orange
      192 -> 198 = orange
      198 -> 202 = red
      202 -> 208 = pink
      208 -> 226 = light pink
      226 -> 252 = pink-purple
      252 -> 288 = purple
      288 -> 298 = indigo
    */
const hslToMyLEDStripColorBoundaries = [
  20, 77, 98, 122, 158, 177, 186, 192, 198, 202, 208, 226, 252, 288, 298,
].map(index => index / LED_COUNT); // map values from 0 -> 1

const fixedHslBins = [
  [0, hslToMyLEDStripColorBoundaries[0]],
  ...Array(hslToMyLEDStripColorBoundaries.length - 1)
    .fill(null)
    .map((_, i) => [
      hslToMyLEDStripColorBoundaries[i],
      hslToMyLEDStripColorBoundaries[i + 1],
    ]),
  [
    hslToMyLEDStripColorBoundaries[hslToMyLEDStripColorBoundaries.length - 1],
    1,
  ],
];

// use fixedHslBins to fit the hsl function to my LED strip so the colors are uniformly distributed in h
const hslToRgbFixed = (h: number, s: number = 1, l: number = 0.5) => {
  if (h < 0 || h > 1) {
    throw new Error('h must be between 0 and 1 inclusively');
  }
  const fixedBinSize = 1 / fixedHslBins.length;
  const binIndex = Math.floor(h / fixedBinSize);
  const bin = fixedHslBins[binIndex];
  if (!bin) {
    throw new Error('wtf m8');
  }
  // const finalH =
  //   bin[0] + ((bin[1] - bin[0]) / fixedBinSize) * (h - fixedBinSize * binIndex);
  const finalH = bin[0] + (bin[1] - bin[0]) * (h / fixedBinSize - binIndex);
  return hslToRgb(finalH, s, l);
};

const DEFAULT_BRIGHTNESS = 125;

const reconcileDim = (
  left: LedCoord | null,
  right: LedCoord | null,
): LedCoord => {
  if (!left && !right) {
    throw new Error('wtf m8');
  }
  const value = (() => {
    if (left && right) {
      return (left.value + right.value) / 2;
    }
    return left!.value || right!.value;
  })();
  return {
    value,
    confidence: -1,
  };
};

// apply some nasty fixes for the few broken ones
const ledPositions = rawLedPositions.map(
  ({x, y, z}, i): FixedLedPosition => ({
    y,
    x: x
      ? x
      : reconcileDim(
          rawLedPositions[i - 1] ? rawLedPositions[i - 1].x : null,
          rawLedPositions[i + 1] ? rawLedPositions[i + 1].x : null,
        ),
    z: z
      ? z
      : reconcileDim(
          rawLedPositions[i - 1] ? rawLedPositions[i - 1].z : null,
          rawLedPositions[i + 1] ? rawLedPositions[i + 1].z : null,
        ),
  }),
);

const getLedsBoundingBox = (positions: FixedLedPosition[]) => {
  const max = (list: number[]) =>
    list.reduce((acc, val) => (val > acc ? val : acc), list[0]);
  const min = (list: number[]) =>
    list.reduce((acc, val) => (val < acc ? val : acc), list[0]);
  const xPositions = positions
    .map(({x}) => x?.value)
    .filter((val): val is number => !!val);
  const yPositions = positions
    .map(({y}) => y?.value)
    .filter((val): val is number => !!val);
  const zPositions = positions
    .map(({z}) => z?.value)
    .filter((val): val is number => !!val);
  const minX = min(xPositions);
  const minY = min(yPositions);
  const minZ = min(zPositions);
  const maxX = max(xPositions);
  const maxY = max(yPositions);
  const maxZ = max(zPositions);
  return {
    min: {
      x: minX,
      y: minY,
      z: minZ,
    },
    max: {
      x: maxX,
      y: maxY,
      z: maxZ,
    },
    width: maxX - minX,
    height: maxY - minY,
    depth: maxZ - minZ,
  };
};

const getPlaneHeight = (
  planeOrientation: OrientationData,
  ledX: number,
  ledZ: number,
) => {
  // ax + by + cz + d = 0
  const a = Math.sin(-planeOrientation.pitch);
  const b = Math.cos(-planeOrientation.pitch);
  // const c = Math.cos(planeOrientation.roll - Math.PI / 2);
  const c = Math.sin(-planeOrientation.roll);
  // const a = 0;
  // const b = 1;
  // const c = 0;
  // const d = -(b * 500 * pctComplete * 2);
  const d = -(b * 600);
  return (-d - a * ledX - c * ledZ) / b;
};
const getPlaneHeight2 = (
  normal: [number, number, number],
  planeY0: number,
  ledX: number,
  ledZ: number,
) => {
  const [a, b, c] = normal;
  const d = -(b * planeY0);
  return (-d - a * ledX - c * ledZ) / b;
};

const rotatePointAroundTreeCenter = (
  pitch: number,
  roll: number,
  yaw: number,
  x: number,
  y: number,
  z: number,
) => {
  const ledsBoundingBox = getLedsBoundingBox(ledPositions);
  const cosa = Math.cos(yaw);
  const sina = Math.sin(yaw);

  const cosb = Math.cos(pitch);
  const sinb = Math.sin(pitch);

  const cosc = Math.cos(roll);
  const sinc = Math.sin(roll);

  const Axx = cosa * cosb;
  const Axy = cosa * sinb * sinc - sina * cosc;
  const Axz = cosa * sinb * cosc + sina * sinc;

  const Ayx = sina * cosb;
  const Ayy = sina * sinb * sinc + cosa * cosc;
  const Ayz = sina * sinb * cosc - cosa * sinc;

  const Azx = -sinb;
  const Azy = cosb * sinc;
  const Azz = cosb * cosc;

  const _y = y - ledsBoundingBox.height / 2;

  const finalX = Axx * x + Axy * _y + Axz * z;
  const finalY = Ayx * x + Ayy * _y + Ayz * z;
  const finalZ = Azx * x + Azy * _y + Azz * z;

  return {
    x: finalX,
    y: finalY + ledsBoundingBox.height / 2,
    z: finalZ,
  };
};

const rotateTreeRandomly = () => {
  const pitch = Math.random() * Math.PI * 2;
  const yaw = Math.random() * Math.PI * 2;
  const roll = Math.random() * Math.PI * 2;
  return ledPositions.map((pos): FixedLedPosition => {
    const rotated = rotatePointAroundTreeCenter(
      pitch,
      yaw,
      roll,
      pos.x.value,
      pos.y.value,
      pos.z.value,
    );
    return {
      x: {
        ...pos.x,
        value: rotated.x,
      },
      y: {
        ...pos.y,
        value: rotated.y,
      },
      z: {
        ...pos.z,
        value: rotated.z,
      },
    };
  });
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [errorMessage, setErrorMessage] = useState<string>();
  const [socket, setSocket] = useState<UdpSocket>();
  const [animating, setAnimating] = useState(false);
  const latestColorsRef = useRef<number[][]>();
  const latestBrightnessRef = useRef<number>();
  const animationCancelledRef = useRef(false);

  useEffect(() => {
    try {
      const _socket = dgram.createSocket({
        type: 'udp4',
        debug: true,
      });
      _socket.bind(0);
      _socket.once('listening', () => {
        setSocket(_socket);
      });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }, []);

  const sendColors = useCallback(
    (
      _colors: number[][],
      forceBrightnessUpdate: boolean = false,
    ): Promise<void> => {
      if (!socket) {
        return Promise.resolve();
      }
      const fallbackBrightness =
        latestBrightnessRef.current === undefined
          ? DEFAULT_BRIGHTNESS
          : Math.round((latestBrightnessRef.current / 100) * 255);
      const colors = _colors.map(color =>
        color.length === 3 || forceBrightnessUpdate
          ? [...color.slice(0, 3), fallbackBrightness]
          : color,
      );
      return new Promise((resolve, reject) => {
        try {
          socket.send(
            new Uint8Array(colors.flat()),
            undefined,
            undefined,
            SOCKET_PORT,
            RPI_IP,
            err => {
              if (err) {
                reject(err);
              } else {
                latestColorsRef.current = _colors;
                resolve();
              }
            },
          );
        } catch (err: any) {
          reject(err);
        }
      });
    },
    [socket],
  );

  const runAnimation = useCallback(
    async (
      getFrame: (pctComplete: number, loopIndex: number) => number[][],
      getIsCancelled: () => boolean,
      lengthMillis: number,
      fps: number = 60,
      loop: boolean = false,
    ): Promise<void> => {
      let frameNumber = 0;
      let frameTime = 1000 / fps;
      let frames = lengthMillis / frameTime;
      let loopIndex = 0;
      setAnimating(true);
      let lastStartTimestamp = Date.now();
      const getNextFrameWaitTime = () => {
        let now = Date.now();
        const iterationLengthMillis = Date.now() - lastStartTimestamp;
        lastStartTimestamp = now;
        return frameTime - iterationLengthMillis;
      };
      return new Promise((resolve, reject) => {
        const animate = async () => {
          frameNumber++;
          try {
            await sendColors(getFrame(frameNumber / frames, loopIndex));
          } catch (err: any) {
            reject(err);
            return;
          }
          if (getIsCancelled() || frameNumber >= frames) {
            if (loop && !getIsCancelled()) {
              frameNumber = 0;
              loopIndex++;
            } else {
              resolve();
              return;
            }
          }
          const waitTime = getNextFrameWaitTime();
          if (waitTime <= 0) {
            animate();
          } else {
            setTimeout(animate, waitTime);
          }
        };
        animate();
      });
    },
    [sendColors],
  );

  const runAnimationWithHandlers = useCallback(
    async (
      getFrame: (pctComplete: number, loopIndex: number) => number[][],
      lengthMillis: number,
      fps?: number,
      loop: boolean = false,
    ) => {
      setAnimating(true);
      try {
        await runAnimation(
          getFrame,
          () => animationCancelledRef.current,
          lengthMillis,
          fps,
          loop,
        );
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setAnimating(false);
        animationCancelledRef.current = false;
      }
    },
    [runAnimation],
  );

  const cancelAnimation = () => {
    animationCancelledRef.current = true;
  };

  const sendRandomColors = async () => {
    try {
      setErrorMessage(undefined);
      await sendColors(
        Array(LED_COUNT)
          .fill(null)
          .map(_ => [...hslToRgbFixed(Math.random())]),
        // .map((_, i) =>
        //   i % 50 === 0
        //     ? [...hslToRgbFixed(Math.random()), 100]
        //     : [0, 0, 0, 0],
        // ),
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const sendRandomLinearBlend = async () => {
    try {
      setErrorMessage(undefined);
      let random_colors = Array(LED_COUNT + 1)
        .fill(null)
        .map(_ => [
          ...hslToRgbFixed(Math.random()),
          // 100 + Math.random() * 150
        ]);
      const minUsedColors = 3;
      const maxUsedColors = 25;
      const usedColors =
        minUsedColors + Math.random() * maxUsedColors - minUsedColors;
      const stretchFactor = usedColors / 255;
      let colors = Array(LED_COUNT)
        .fill(null)
        .map((_, ledIndex) => {
          let subIndex = ledIndex * stretchFactor;
          let lerpFactor = subIndex - Math.floor(subIndex);
          let leftColor = random_colors[Math.floor(subIndex)];
          let rightColor = random_colors[Math.ceil(subIndex)];
          let averageColor = Array(leftColor.length)
            .fill(null)
            .map(
              (__, channel) =>
                leftColor[channel] * (1 - lerpFactor) +
                rightColor[channel] * lerpFactor,
            );
          return averageColor;
        });
      await sendColors(colors);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const animateRandomLinearBlend = () => {
    let randomHsvs = Array(LED_COUNT + 1)
      .fill(null)
      .map(_ => [
        Math.random(),
        //  100 + Math.random() * 150
      ]);
    const minUsedColors = 3;
    const maxUsedColors = 25;
    const startUsedColors =
      minUsedColors + Math.random() * maxUsedColors - minUsedColors;
    const endUsedColors = Math.min(
      startUsedColors +
        5 +
        Math.random() * (maxUsedColors - startUsedColors - 5),
      25,
    );

    setErrorMessage(undefined);

    runAnimationWithHandlers(pctCompleted => {
      return Array(LED_COUNT)
        .fill(null)
        .map((_, ledIndex) => {
          let stretchFactor =
            (startUsedColors +
              pctCompleted * (endUsedColors - startUsedColors)) /
            255;
          let subIndex = ledIndex * stretchFactor;
          let lerpFactor = subIndex - Math.floor(subIndex);
          let leftHsv = randomHsvs[Math.floor(subIndex)];
          let rightHsv = randomHsvs[Math.ceil(subIndex)];
          let averageHsv = Array(leftHsv.length)
            .fill(null)
            .map(
              (__, channel) =>
                leftHsv[channel] * (1 - lerpFactor) +
                rightHsv[channel] * lerpFactor,
            );
          return [
            ...hslToRgbFixed(averageHsv[0]),
            // averageHsv[1]
          ];
        });
    }, 5000);
  };

  const animateCrossSection = async () => {
    const ledsBoundingBox = getLedsBoundingBox(ledPositions);
    let crossSectionSize = ledsBoundingBox.depth / 10;
    let rangeStart = ledsBoundingBox.min.x - crossSectionSize;
    let rangeEnd = ledsBoundingBox.max.x + crossSectionSize;
    let rangeSize = rangeEnd - rangeStart;
    runAnimationWithHandlers(
      pctCompleted => {
        return Array(LED_COUNT)
          .fill(null)
          .map((_, ledIndex) => {
            const ledPos = ledPositions[ledIndex];
            return Math.abs(
              rangeStart + pctCompleted * rangeSize - ledPos.x.value,
            ) < crossSectionSize
              ? [0, 255, 0]
              : [0, 0, 255];
          });
      },
      2500,
      undefined,
      true,
    );
  };

  const animateRandomCrossSections = async () => {
    // const crossColor = [0, 0, 255];
    // const ambientColor = [0, 255, 0];
    // const lerpStrength = 3; // 1 to 5
    const crossColor = [0, 255, 0];
    const ambientColor = [0, 0, 255];
    const lerpStrength = 1.5; // 1 to 5
    const crossSectionSize = 80;

    type AnimationConfig = {
      positions: FixedLedPosition[];
      rangeStart: number;
      rangeEnd: number;
      rangeSize: number;
    };

    const makeAnimationConfig = (): AnimationConfig => {
      const positions = rotateTreeRandomly();
      const boundingBox = getLedsBoundingBox(positions);
      const rangeStart = boundingBox.min.y - crossSectionSize * 3;
      const rangeEnd =
        boundingBox.min.y + boundingBox.height + crossSectionSize * 3;
      const rangeSize = rangeEnd - rangeStart;
      return {
        positions,
        rangeStart,
        rangeEnd,
        rangeSize,
      };
    };

    let animationConfig = makeAnimationConfig();

    let currentLoopIndex = 0;
    await runAnimationWithHandlers(
      (pctComplete, loopIndex) => {
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            if (loopIndex !== currentLoopIndex) {
              animationConfig = makeAnimationConfig();
              currentLoopIndex = loopIndex;
            }

            const {positions, rangeStart, rangeSize} = animationConfig;

            const ledPos = positions[i];

            const planePosY = rangeStart + pctComplete * rangeSize;
            const distanceFromPlane = ledPos.y.value - planePosY;

            const lerpFactor = Math.pow(
              Math.min(Math.abs(distanceFromPlane / crossSectionSize), 1),
              lerpStrength,
            );
            return Array(3)
              .fill(null)
              .map(
                (__, channel) =>
                  lerpFactor * ambientColor[channel] +
                  (1 - lerpFactor) * crossColor[channel],
              );
          });
      },
      6000,
      undefined,
      true,
    );
  };

  const explodeFromMiddle = async () => {
    let explosionColor = [0, 255, 0];
    let ambientColor = [0, 0, 255];
    let lerpStrength1 = 0.5;
    let lerpStrength2 = 3;
    let lerpStrength = lerpStrength1;
    const ledsBoundingBox = getLedsBoundingBox(ledPositions);
    const maxRadius = ledsBoundingBox.height;
    let currentLoopIndex = 0;
    await runAnimationWithHandlers(
      (pctComplete, loopIndex) => {
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            if (loopIndex !== currentLoopIndex) {
              currentLoopIndex = loopIndex;
              let explColor = explosionColor;
              explosionColor = ambientColor;
              ambientColor = explColor;
              if (lerpStrength === lerpStrength1) {
                lerpStrength = lerpStrength2;
              } else {
                lerpStrength = lerpStrength1;
              }
            }
            const currentRadius = pctComplete * maxRadius;
            const ledPos = ledPositions[i];
            const center = {
              x: ledsBoundingBox.min.x + ledsBoundingBox.width / 2,
              y: ledsBoundingBox.min.y + ledsBoundingBox.height * 0.65,
              z: ledsBoundingBox.min.z + ledsBoundingBox.depth / 2,
            };
            const dx = ledPos.x.value - center.x;
            const dy = ledPos.y.value - center.y;
            const dz = ledPos.z.value - center.z;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy + dz * dz);

            const lerpFactor = Math.pow(
              Math.min(distanceFromCenter / currentRadius, 1),
              5,
            );
            return Array(3)
              .fill(null)
              .map(
                (__, channel) =>
                  lerpFactor * ambientColor[channel] +
                  (1 - lerpFactor) * explosionColor[channel],
              );
          });
      },
      6000,
      undefined,
      true,
    );
  };

  // TODO: make the rain drops fall in the direction of the tree cone instead of straight downwards
  const rain = async () => {
    type RainDrop = {
      speed: number;
      currentPosition: {
        x: number;
        y: number;
        z: number;
      };
    };

    const ledsBoundingBox = getLedsBoundingBox(ledPositions);

    const rainDropColors = [
      [0, 255, 0],
      [0, 0, 255],
    ];
    let rainDrops: RainDrop[] = [];

    const spawnRainDrop = () => {
      const maxRadius =
        Math.min(ledsBoundingBox.depth, ledsBoundingBox.width) * 0.6;
      const radius = Math.random() * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = ledsBoundingBox.min.y;
      // 15 -> 30
      const speed = 8 + Math.random() * 10 * (1 - radius / maxRadius);
      rainDrops.push({
        currentPosition: {
          x,
          y,
          z,
        },
        speed,
      });
    };

    const intervals = [];

    intervals.push(
      setInterval(() => {
        rainDrops = rainDrops.filter(
          rainDrop => rainDrop.currentPosition.y < ledsBoundingBox.height * 10,
        );
        // console.log(`Rain drop count: ${rainDrops.length}`);
      }, 200),
    );

    intervals.push(
      setInterval(() => {
        spawnRainDrop();
      }, 500),
    );

    spawnRainDrop();

    const trailStrength = 0.75;
    const trailLength = ledsBoundingBox.height * 1.5;
    const rainDropRadius = 60;
    // let rainColor = [255, 255, 255];
    // let ambientColor = [50, 50, 50];
    let rainColor = [0, 255, 0];
    let ambientColor = [0, 0, 255];

    let lastFrameTime = Date.now();
    await runAnimationWithHandlers(
      (pctComplete, loopIndex) => {
        const now = Date.now();
        const dt = now - lastFrameTime;
        lastFrameTime = now;

        const out = Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            let rainBrightness = 0;
            const ledPos = ledPositions[i];

            rainDrops.forEach(rainDrop => {
              const dY = ledPos.y.value - rainDrop.currentPosition.y;
              const dX = ledPos.x.value - rainDrop.currentPosition.x;
              const dZ = ledPos.z.value - rainDrop.currentPosition.z;
              const distanceFromRainDrop = Math.sqrt(
                dX * dX + dZ * dZ + dY * dY,
              );
              const dropBrightness =
                1 - Math.min(distanceFromRainDrop / rainDropRadius, 1);
              const horizontalDistance = Math.sqrt(dX * dX + dZ * dZ);
              const isInTrail = dY - rainDropRadius / 2 < 0;
              const trailBrightness = isInTrail
                ? trailStrength *
                  (1 - Math.min(horizontalDistance / rainDropRadius, 1)) *
                  (1 - Math.min(Math.abs(dY) / trailLength, 1))
                : 0;
              // console.log({
              //   rainDropY: rainDrop.currentPosition.y,
              //   ledPosY: ledPos.y.value,
              //   distanceFromRainDropY: Math.abs(dY),
              //   brightness,
              // });
              // if (dY < 0 && Math.abs(dY) > rainDropRadius) {
              //   return;
              // }

              // const horizontalDistance = Math.sqrt(dX * dX + dZ * dZ);
              // const brightness =
              //   (1 - Math.min(horizontalDistance / rainDropRadius, 1)) *
              //   (1 - Math.min(dY / 100, 1));
              rainBrightness += dropBrightness + trailBrightness;
              // rainBrightness += dropBrightness;
              // console.log({
              //   rainDrop,
              //   horizontalDistance,
              //   brightness,
              // });
            });

            const lerpFactor = Math.min(rainBrightness, 1);
            return Array(3)
              .fill(null)
              .map(
                (__, channel) =>
                  lerpFactor * rainColor[channel] +
                  (1 - lerpFactor) * ambientColor[channel],
              );
          });

        rainDrops.forEach(rainDrop => {
          rainDrop.currentPosition.y += rainDrop.speed * dt * 0.05;
          // console.log('====================');
          // console.log('====================');
          // console.log('====================');
          // console.log('====================');
          // console.log(rainDrop.currentPosition.y);
        });

        // setErrorMessage(`${rollPct}`);
        return out;
      },
      6000,
      undefined,
      true,
    );

    intervals.forEach(intervalId => clearInterval(intervalId));
  };

  const animateAllColors = async () => {
    setErrorMessage(undefined);
    const SPEED = 100 + Math.random() * 1000;
    runAnimationWithHandlers(
      pctComplete => {
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => [
            ...hslToRgbFixed(
              ((i + pctComplete * SPEED) % LED_COUNT) / LED_COUNT,
              1.0,
              0.5,
            ),
            // 255,
          ]);
      },
      2000,
      undefined,
      true,
    );
  };

  const showAllColors = useCallback(async () => {
    setErrorMessage(undefined);
    let white_pixel = -1;
    try {
      await sendColors(
        Array(LED_COUNT)
          .fill(null)
          .map((_, i) =>
            i === white_pixel
              ? [255, 255, 255]
              : [...hslToRgb(i / LED_COUNT, 1.0, 0.5)],
          ),
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }, [sendColors]);

  const showAllColorsFixed = useCallback(async () => {
    setErrorMessage(undefined);
    let white_pixel = -1;
    try {
      await sendColors(
        Array(LED_COUNT)
          .fill(null)
          .map((_, i) =>
            i === white_pixel
              ? [255, 255, 255]
              : [...hslToRgbFixed(i / LED_COUNT)],
          ),
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }, [sendColors]);

  const intersectingPlane = useCallback(async () => {
    let _currentPos: OrientationData | undefined;
    let _subscription: Subscription | undefined;
    await new Promise<void>((resolve, reject) => {
      _subscription = orientation.subscribe({
        next: pos => {
          _currentPos = pos;
          resolve();
        },
        error: error => {
          reject(error);
        },
      });
    });

    if (!_subscription || !_currentPos) {
      throw new Error('wtf m8');
    }
    const subscription = _subscription;

    await runAnimationWithHandlers(
      () => {
        const currentPos = _currentPos!;
        const flipped = false;
        setErrorMessage(currentPos.roll.toString());
        // const flipped = currentPos.pitch * currentPos.roll > 0;
        const pitchPct = ((currentPos.pitch + Math.PI / 2) % Math.PI) / Math.PI;
        const rollPct = ((currentPos.roll + Math.PI / 2) % Math.PI) / Math.PI;
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            const ledPos = ledPositions[i];
            const ledHeightPct = ledPos.y.value / 1000;

            const ledX = ledPos.x.value;
            const ledY = ledPos.y.value;
            const ledZ = ledPos.z.value;
            const planeHeight = getPlaneHeight(currentPos!, ledX, ledZ);

            let topColor = flipped ? [0, 255, 0] : [0, 0, 255];
            let bottomColor = flipped ? [0, 0, 255] : [0, 255, 0];

            const leeway = 80;

            const lerpFactor = (() => {
              const diff = ledY - planeHeight;
              if (Math.abs(diff) >= leeway / 2) {
                return ledY > planeHeight ? 1 : 0;
              }
              return (ledY - planeHeight - leeway / 2) / leeway;
            })();

            // return Array(3)
            //   .fill(null)
            //   .map(
            //     (__, channel) =>
            //       lerpFactor * topColor[channel] +
            //       (1 - lerpFactor) * bottomColor[channel],
            //   );

            return ledY > planeHeight ? topColor : bottomColor;
          });
      },
      5000,
      undefined,
      true,
    );

    console.log('Cancelled');

    subscription.unsubscribe();
  }, [runAnimationWithHandlers]);

  const orientationRainbow = useCallback(async () => {
    let _currentPos: OrientationData | undefined;
    let _subscription: Subscription | undefined;
    await new Promise<void>((resolve, reject) => {
      _subscription = orientation.subscribe({
        next: pos => {
          _currentPos = pos;
          resolve();
        },
        error: error => {
          reject(error);
        },
      });
    });

    if (!_subscription || !_currentPos) {
      throw new Error('wtf m8');
    }
    const subscription = _subscription;

    await runAnimationWithHandlers(
      () => {
        const currentPos = _currentPos!;
        const pitchPct = ((currentPos.pitch + Math.PI / 2) % Math.PI) / Math.PI;
        // const rollPct = ((currentPos.roll + Math.PI / 2) % Math.PI) / Math.PI;
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            const ledHeightPct = ledPositions[i].y.value / 1000;
            // console.log(ledHeightPct);
            return [
              // Math.min((currentPos.pitch * 255) % 255, 255),
              // Math.min((currentPos.yaw * 255) % 255, 255),
              // Math.min((currentPos.roll * 255) % 255, 255),
              ...hslToRgbFixed((pitchPct + ledHeightPct) % 1, 0.8),
              // 255,
            ];
          });
      },
      2000,
      undefined,
      true,
    );

    subscription.unsubscribe();
  }, [runAnimationWithHandlers]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     runAnimationWithHandlers(pctComplete => {
  //       // console.log({pctComplete});
  //       return Array(LED_COUNT)
  //         .fill(null)
  //         .map((_, i) => [255, 255, 255, pctComplete * 255]);
  //     }, 8000);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [runAnimationWithHandlers]);

  const [text, setText] = useState('100000');

  const oneByOne = async () => {
    setErrorMessage(undefined);
    runAnimationWithHandlers(pctComplete => {
      return Array(LED_COUNT)
        .fill(null)
        .map((_, i) => {
          return Math.floor(pctComplete * LED_COUNT) === i
            ? [255, 255, 255, 255]
            : [0, 0, 0, 0];
        });
    }, Number(text));
  };

  const clear = async () => {
    setErrorMessage(undefined);
    try {
      await sendColors(
        Array(LED_COUNT)
          .fill(null)
          .map(_ => [0, 0, 0, 0]),
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const disableButtons = !socket;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={[
          styles.view,
          {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          },
        ]}>
        <Tree height={250} />
        {errorMessage ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{color: 'red'}}>{errorMessage}</Text>
        ) : undefined}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingVertical: 0,
            paddingHorizontal: 16,
          }}>
          <Text>Brightness</Text>
          <Slider
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '100%', height: 40}}
            value={100 * (DEFAULT_BRIGHTNESS / 255)}
            minimumValue={0}
            maximumValue={100}
            onValueChange={value => {
              latestBrightnessRef.current = value;
              if (!animating && latestColorsRef.current) {
                sendColors(latestColorsRef.current, true);
              }
            }}
          />
        </View>
        {animating ? (
          <Button
            label="Cancel animation"
            onPress={cancelAnimation}
            disabled={disableButtons}
            isDarkMode={isDarkMode}
          />
        ) : (
          <>
            <Button
              label="Each LED random color"
              onPress={sendRandomColors}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Random linear blend"
              onPress={sendRandomLinearBlend}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Random linear blend animated"
              onPress={animateRandomLinearBlend}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Animate Cross Section"
              onPress={animateRandomCrossSections}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Explode From Middle"
              onPress={explodeFromMiddle}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Tilt Intersecting Plane"
              onPress={intersectingPlane}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Tilt Rainbow"
              onPress={orientationRainbow}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Rain"
              onPress={rain}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Animate all colors"
              onPress={animateAllColors}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Show all colors with fixed HSL"
              onPress={showAllColorsFixed}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            <Button
              label="Show all colors with default HSL"
              onPress={showAllColors}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
            {/* <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <TextInput
                onChangeText={setText}
                value={text}
              />
            </View>
            <Button
              label="One by one"
              onPress={oneByOne}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            /> */}
            <Button
              label="Clear"
              onPress={clear}
              disabled={disableButtons}
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

interface ButtonProps {
  onPress: () => void;
  label: string;
  disabled: boolean;
  isDarkMode: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  disabled,
  isDarkMode,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        backgroundColor: disabled
          ? '#999999'
          : isDarkMode
          ? '#9E8FCB'
          : '#CBC3E3',
      },
    ]}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  view: {
    height: '100%',
    marginBottom: 32,
  },
  button: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 32,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});

export default App;
