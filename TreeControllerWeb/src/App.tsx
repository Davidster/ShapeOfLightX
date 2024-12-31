import { useCallback, useState } from "react";
import Tree from "/tree.svg";
import "./App.css";
import { gzipSync } from "fflate";

import rawLedPositions, { LedCoord } from "./rawLedPositions";

type FixedLedPosition = {
  x: LedCoord;
  y: LedCoord;
  z: LedCoord;
};

const LED_COUNT = 300;
const SERVER_PORT = 8000;
const DEFAULT_BRIGHTNESS = 125;
const RPI_IP = "192.168.2.98";

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
].map((index) => index / LED_COUNT); // map values from 0 -> 1

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
    throw new Error("h must be between 0 and 1 inclusively");
  }
  const fixedBinSize = 1 / fixedHslBins.length;
  const binIndex = Math.floor(h / fixedBinSize);
  const bin = fixedHslBins[binIndex];
  if (!bin) {
    throw new Error("wtf m8");
  }
  // const finalH =
  //   bin[0] + ((bin[1] - bin[0]) / fixedBinSize) * (h - fixedBinSize * binIndex);
  const finalH = bin[0] + (bin[1] - bin[0]) * (h / fixedBinSize - binIndex);
  return hslToRgb(finalH, s, l);
};

const reconcileDim = (
  left: LedCoord | null,
  right: LedCoord | null,
): LedCoord => {
  if (!left && !right) {
    throw new Error("wtf m8");
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
  ({ x, y, z }, i): FixedLedPosition => ({
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
    .map(({ x }) => x?.value)
    .filter((val): val is number => !!val);
  const yPositions = positions
    .map(({ y }) => y?.value)
    .filter((val): val is number => !!val);
  const zPositions = positions
    .map(({ z }) => z?.value)
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

function App() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [brightness, setBrightness] = useState(DEFAULT_BRIGHTNESS);
  const [speed, setSpeed] = useState(0.1);

  const sendFrames = useCallback(
    async (frames: number[][][], loop: boolean = true): Promise<void> => {
      setErrorMessage(undefined);

      const rawFrameData = new Uint8Array([
        loop ? 1 : 0,
        ...frames.flatMap((frame) =>
          frame.flatMap((color) =>
            color.length === 3
              ? [color[0], color[1], color[2], brightness]
              : [color[0], color[1], color[2], color[3]],
          ),
        ),
      ]);

      const rawFrameDataCompressed = gzipSync(rawFrameData);

      console.log("Sending frames", frames);
      console.log(
        `Frame data size: ${(rawFrameData.length / 1000).toFixed(2)}kb`,
      );
      console.log(
        `Compressed frame data size: ${(rawFrameDataCompressed.length / 1000).toFixed(2)}kb`,
      );

      try {
        await fetch(
          `http://${RPI_IP}:${SERVER_PORT}/treecontroller-api/animation`,
          {
            method: "POST",
            body: rawFrameDataCompressed,
            headers: {
              "Content-Type": "application/octet-stream",
              "Content-Encoding": "gzip",
            },
          },
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setErrorMessage(
          err && typeof err.message === "string"
            ? err.message
            : "Unknown error",
        );
      }
    },
    [brightness],
  );

  const sendAnimation = useCallback(
    async (
      getFrame: (pctComplete: number) => number[][],
      lengthMillis: number,
      loop: boolean = true,
      appendReverse: boolean = false,
    ): Promise<void> => {
      const frameTime = 1000 / 60;
      const frame_count = Math.round(lengthMillis / (frameTime * speed * 10.0));

      // console.log({ frameTime, frames, lengthMillis });

      const frames = Array(frame_count)
        .fill(undefined)
        .map((_, frameIndex) => getFrame(frameIndex / frame_count));

      // const animation: Animation = {
      //   frames: colors,
      //   should_loop: true,
      // };

      if (appendReverse) {
        const reversed_frames = [...frames];
        reversed_frames.reverse();
        for (const color of reversed_frames) {
          frames.push(color);
        }
      }

      sendFrames(frames, loop);
    },
    [sendFrames, speed],
  );

  const sendRandomColors = async () => {
    await sendFrames(
      [
        Array(LED_COUNT)
          .fill(null)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((_) => [...hslToRgbFixed(Math.random())]),
      ],
      // .map((_, i) =>
      //   i % 50 === 0
      //     ? [...hslToRgbFixed(Math.random()), 100]
      //     : [0, 0, 0, 0],
      // ),
      false,
    );
  };

  const sendRandomLinearBlend = async () => {
    const random_colors = Array(LED_COUNT + 1)
      .fill(null)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_) => [
        ...hslToRgbFixed(Math.random()),
        // 100 + Math.random() * 150
      ]);
    const minUsedColors = 3;
    const maxUsedColors = 25;
    const usedColors =
      minUsedColors + Math.random() * maxUsedColors - minUsedColors;
    const stretchFactor = usedColors / 255;
    const colors = Array(LED_COUNT)
      .fill(null)
      .map((_, ledIndex) => {
        const subIndex = ledIndex * stretchFactor;
        const lerpFactor = subIndex - Math.floor(subIndex);
        const leftColor = random_colors[Math.floor(subIndex)];
        const rightColor = random_colors[Math.ceil(subIndex)];
        const averageColor = Array(leftColor.length)
          .fill(null)
          .map(
            (__, channel) =>
              leftColor[channel] * (1 - lerpFactor) +
              rightColor[channel] * lerpFactor,
          );
        return averageColor;
      });
    await sendFrames([colors], false);
  };

  const animateRandomLinearBlend = () => {
    const randomHsvs = Array(LED_COUNT + 1)
      .fill(null)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_) => [
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

    sendAnimation(
      (pctCompleted) => {
        return Array(LED_COUNT)
          .fill(null)
          .map((_, ledIndex) => {
            const stretchFactor =
              (startUsedColors +
                pctCompleted * (endUsedColors - startUsedColors)) /
              255;
            const subIndex = ledIndex * stretchFactor;
            const lerpFactor = subIndex - Math.floor(subIndex);
            const leftHsv = randomHsvs[Math.floor(subIndex)];
            const rightHsv = randomHsvs[Math.ceil(subIndex)];
            const averageHsv = Array(leftHsv.length)
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
      },
      5000,
      true,
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
    const crossSectionCount = 6;
    const timePerCrossSection = 6000;

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

    let prevPctComplete = -1;
    await sendAnimation(
      (_pctComplete) => {
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            const pctComplete = (_pctComplete * crossSectionCount) % 1;

            if (pctComplete < prevPctComplete) {
              animationConfig = makeAnimationConfig();
            }

            prevPctComplete = pctComplete;

            const { positions, rangeStart, rangeSize } = animationConfig;

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
      timePerCrossSection * crossSectionCount,
      true,
    );
  };

  const explodeFromMiddle = async () => {
    let explosionColor = [0, 255, 0];
    let ambientColor = [0, 0, 255];
    const lerpStrength1 = 0.5;
    const lerpStrength2 = 3;
    let lerpStrength = lerpStrength1;
    const ledsBoundingBox = getLedsBoundingBox(ledPositions);
    const maxRadius = ledsBoundingBox.height;
    let prevPctComplete = -1;
    await sendAnimation(
      (_pctComplete) => {
        // setErrorMessage(`${rollPct}`);
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            const pctComplete = (_pctComplete * 2) % 1;

            if (pctComplete < prevPctComplete) {
              const explColor = explosionColor;
              explosionColor = ambientColor;
              ambientColor = explColor;
              if (lerpStrength === lerpStrength1) {
                lerpStrength = lerpStrength2;
              } else {
                lerpStrength = lerpStrength1;
              }
            }

            prevPctComplete = pctComplete;

            const currentRadius = pctComplete * maxRadius;
            const ledPos = ledPositions[i];
            const center = {
              x: ledsBoundingBox.min.x + ledsBoundingBox.width / 2,
              y: ledsBoundingBox.min.y + ledsBoundingBox.height * 0.5,
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
      true,
      true,
    );
  };

  const candyCane = async (addBlueStripe: boolean) => {
    const ledsBoundingBox = getLedsBoundingBox(ledPositions);

    await sendAnimation((pctComplete) => {
      const bins = 2;
      return Array(LED_COUNT)
        .fill(null)
        .map((_, i) => {
          const white = [255, 255, 255];
          const red = [0, 0, 255];
          const blue = [255, 0, 0];

          const ledPos = ledPositions[i];

          const center = {
            x: ledsBoundingBox.min.x + ledsBoundingBox.width / 2,
            y: ledsBoundingBox.min.y + ledsBoundingBox.height * 0.5,
            z: ledsBoundingBox.min.z + ledsBoundingBox.depth / 2,
          };
          const dx = ledPos.x.value - center.x;
          const dz = ledPos.z.value - center.z;

          const angle =
            Math.atan2(dx, dz) -
            (pctComplete * Math.PI * 16.0) / bins +
            ledPos.y.value * 0.004;

          const lerpFactor = Math.sin(angle * bins) * 0.5 + 0.5;

          const secondColor =
            addBlueStripe && Math.abs(angle) % (Math.PI * 2.0) > Math.PI
              ? blue
              : red;

          return Array(3)
            .fill(null)
            .map(
              (__, channel) =>
                lerpFactor * white[channel] +
                (1 - lerpFactor) * secondColor[channel],
            );
        });
    }, 5000);
  };

  const sparkles = async () => {
    type Sparkle = {
      t: number;
      decay: number;
      position: {
        x: number;
        y: number;
        z: number;
      };
    };

    let nextSpawnDelay = 25;
    const maxSparkleRadius = 20;

    const dim_white = [0, 0, 0];
    const yellow = [0, 80, 245];

    let sparkles: Sparkle[] = [];

    const spawnSparkle = () => {
      const randomLedIndex = Math.floor(Math.random() * LED_COUNT);
      // spawn the sparkles right on the LEDs
      const randomLedPosition = ledPositions[randomLedIndex];

      sparkles.push({
        t: 0,
        decay: 1 + Math.random() * 2,
        position: {
          x: randomLedPosition.x.value,
          y: randomLedPosition.y.value,
          z: randomLedPosition.z.value,
        },
      });
    };

    // spawnSparkle();

    let lastFrameTime = 0;
    let lastSpawnTime = -1;
    await sendAnimation((pctComplete) => {
      const now = pctComplete * 10000;
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      if (now - lastSpawnTime > nextSpawnDelay && pctComplete < 0.95) {
        spawnSparkle();
        lastSpawnTime = now;
        nextSpawnDelay = Math.floor(Math.random() * 30);
      }

      const frame = Array(LED_COUNT)
        .fill(null)
        .map((_, i) => {
          let sparkleBrightness = 0;

          const ledPos = ledPositions[i];

          sparkles.forEach((sparkle) => {
            const dY = ledPos.y.value - sparkle.position.y;
            const dX = ledPos.x.value - sparkle.position.x;
            const dZ = ledPos.z.value - sparkle.position.z;
            const distanceFromSparkle = Math.sqrt(dX * dX + dZ * dZ + dY * dY);

            sparkleBrightness +=
              (1 - Math.min(distanceFromSparkle / maxSparkleRadius, 1)) *
              Math.sin(sparkle.t * Math.PI);
          });

          const lerpFactor = Math.min(sparkleBrightness, 1);

          return Array(3)
            .fill(null)
            .map(
              (__, channel) =>
                lerpFactor * yellow[channel] +
                (1 - lerpFactor) * dim_white[channel],
            );
        });

      sparkles.forEach((sparkle) => {
        sparkle.t += dt * 0.001 * sparkle.decay;
      });

      sparkles = sparkles.filter((sparkle) => sparkle.t <= 1.0);

      return frame;
    }, 20000);
  };

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

    spawnRainDrop();

    const spawnRate = 500;
    const trailStrength = 0.75;
    const trailLength = ledsBoundingBox.height * 1.5;
    const rainDropRadius = 60;
    // let rainColor = [255, 255, 255];
    // let ambientColor = [50, 50, 50];
    const rainColor = [0, 255, 0];
    const ambientColor = [0, 0, 255];

    let lastFrameTime = 0;
    let lastSpawnTime = -1;
    await sendAnimation(
      (pctComplete) => {
        const now = pctComplete * 10000;
        const dt = now - lastFrameTime;
        lastFrameTime = now;

        if (now - lastSpawnTime > spawnRate) {
          spawnRainDrop();
          lastSpawnTime = now;
        }

        const out = Array(LED_COUNT)
          .fill(null)
          .map((_, i) => {
            let rainBrightness = 0;
            const ledPos = ledPositions[i];

            rainDrops.forEach((rainDrop) => {
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

        rainDrops.forEach((rainDrop) => {
          rainDrop.currentPosition.y += rainDrop.speed * dt * 0.05;
          // console.log('====================');
          // console.log('====================');
          // console.log('====================');
          // console.log('====================');
          // console.log(rainDrop.currentPosition.y);
        });

        rainDrops = rainDrops.filter(
          (rainDrop) =>
            rainDrop.currentPosition.y < ledsBoundingBox.height * 10,
        );

        // setErrorMessage(`${rollPct}`);
        return out;
      },
      10000,
      true,
    );
  };

  const animateAllColors = async () => {
    setErrorMessage(undefined);
    // const SPEED = 100 + Math.random() * 1000;
    const SPEED = 1.0;
    const PERIOD = 150;
    sendAnimation(
      (pctComplete) => {
        return Array(LED_COUNT)
          .fill(null)
          .map((_, i) => [
            ...hslToRgbFixed(
              ((i + pctComplete * PERIOD) % PERIOD) / PERIOD,
              1.0,
              0.5,
            ),
            // 255,
          ]);
      },
      3000 / SPEED,
      true,
      false,
    );
  };

  const showAllColors = useCallback(async () => {
    const white_pixel = -1;
    await sendFrames(
      [
        Array(LED_COUNT)
          .fill(null)
          .map((_, i) =>
            i === white_pixel
              ? [255, 255, 255]
              : [...hslToRgb(i / LED_COUNT, 1.0, 0.5)],
          ),
      ],
      false,
    );
  }, [sendFrames]);

  const showAllColorsFixed = useCallback(async () => {
    const white_pixel = -1;
    await sendFrames(
      [
        Array(LED_COUNT)
          .fill(null)
          .map((_, i) =>
            i === white_pixel
              ? [255, 255, 255]
              : [...hslToRgbFixed(i / LED_COUNT)],
          ),
      ],
      false,
    );
  }, [sendFrames]);

  const clear = async () => {
    await sendFrames(
      [
        Array(LED_COUNT)
          .fill(null)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((_) => [0, 0, 0, 0]),
      ],
      false,
    );
  };

  return (
    <>
      <div>
        <img src={Tree} className="logo" alt="Vite logo" />
        {errorMessage ? (
          <div style={{ color: "red" }}>{errorMessage}</div>
        ) : undefined}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "0 16",
          }}
        >
          <div>Brightness: {brightness}</div>
          <input
            style={{
              width: "80%",
            }}
            type="range"
            min={0}
            max={255}
            value={brightness}
            onChange={(event) => {
              setBrightness(parseInt(event.target.value));
            }}
          />
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "0 16",
          }}
        >
          <div>Speed: {speed.toFixed(2)}</div>
          <input
            style={{
              width: "80%",
            }}
            type="range"
            min={1}
            max={500}
            value={speed * 500}
            onChange={(event) => {
              setSpeed(parseInt(event.target.value) / 500);
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingTop: 24,
        }}
      >
        <Button
          label="Each LED Random Color"
          onClick={sendRandomColors}
          disabled={false}
        />
        <Button
          label="Random Linear Blend"
          onClick={sendRandomLinearBlend}
          disabled={false}
        />
        <Button
          label="Random Linear Blend Animated"
          onClick={animateRandomLinearBlend}
          disabled={false}
        />
        <Button
          label="Animate Cross Section"
          onClick={animateRandomCrossSections}
          disabled={false}
        />
        <Button
          label="Explode From Middle"
          onClick={explodeFromMiddle}
          disabled={false}
        />
        <Button label="Rain" onClick={rain} disabled={false} />
        <Button
          label="Candy Cane"
          onClick={() => candyCane(false)}
          disabled={false}
        />
        <Button
          label="Barber Shop"
          onClick={() => candyCane(true)}
          disabled={false}
        />
        <Button label="Sparkles" onClick={sparkles} disabled={false} />
        <Button
          label="Animate All Colors"
          onClick={animateAllColors}
          disabled={false}
        />
        <Button
          label="Fixed HSL"
          onClick={showAllColorsFixed}
          disabled={false}
        />
        <Button label="Default HSL" onClick={showAllColors} disabled={false} />
        <Button label="Clear" onClick={clear} disabled={false} />
      </div>
    </>
  );
}

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? "#999999" : "#9E8FCB",
      color: "white",
      fontWeight: "normal",
      width: "80%",
      alignSelf: "center",
    }}
  >
    {label}
  </button>
);

export default App;
