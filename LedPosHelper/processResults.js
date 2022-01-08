const fs = require('fs')

const view1Frames = require('./view_1_frames.json')
const view2Frames = require('./view_2_frames.json')
const view3Frames = require('./view_3_frames.json')
const view4Frames = require('./view_4_frames.json')
const extraData = require('./extraData.json')

const viewDataArray = [
  [view1Frames, extraData.view_1], // 
  [view2Frames, extraData.view_2],
  [view3Frames, extraData.view_3],
  [view4Frames, extraData.view_4],
]

const pad = (num, size) => {
  num = num.toString()
  while (num.length < size) {
    num = "0" + num
  }
  return num
}

const tryToGetValue = (viewData, frameIndex, type) => {
  const [frames, extraData] = viewData
  const frameNumber = frameIndex + extraData.activeFrames[0]
  const dim =  type === 'horizontal' ? 0 : 1
  const convVal = (val) => {
    const ret = val - extraData.treeTip[dim]
    // console.log(ret)
    return ret
  }
  let exactValue = frames[frameStr(frameNumber)]
  if (exactValue) {
    return {
      confidence: 1,
      value: convVal(exactValue[dim])
    }
  }
  let leftVal = undefined
  let rightVal = undefined
  let searchRadius = 4
  let currentDistance = 1
  while ((!leftVal || !rightVal) && currentDistance <= searchRadius) {
    const _leftVal = frames[frameStr(frameNumber - currentDistance)]
    const _rightVal = frames[frameStr(frameNumber + currentDistance)]

    if (_leftVal) {
      leftVal = [_leftVal, currentDistance]
    }
    if (_rightVal) {
      rightVal = [_rightVal, currentDistance]
    }

    currentDistance++
  }
  if (leftVal && rightVal) {
    const totalDistance = leftVal[1] + rightVal[1]
    return {
      confidence: 1 - (totalDistance / ((searchRadius * 2) + 1)),
      value: convVal(
        ((1 - (leftVal[1] / totalDistance)) * leftVal[0][dim]) + 
        ((1 - (rightVal[1] / totalDistance)) * rightVal[0][dim])
      )
    }
  }
  return null
}

const combineByConfidence = (vals) => {
  if (vals.length === 0) {
    return null
  }
  const totalConfidence = vals.reduce((acc, { confidence }) => acc + confidence, 0)
  if (totalConfidence < 0.1) {
    console.log(vals)
  }
  const ret = {
    confidence: totalConfidence,
    value: vals.reduce((acc, { confidence, value }) => acc + (value * (confidence / totalConfidence)), 0),
  }
  return ret
}

const frameStr = (frameNumber) => `frame-${pad(frameNumber, 5)}.jpg`

const frameCount = extraData.view_2.activeFrames[1] - extraData.view_2.activeFrames[0]
const framePositions = Array(frameCount).fill(null).map((_, frameIndex) => {
  
  const posX = tryToGetValue(viewDataArray[0], frameIndex, 'horizontal')
  const negX = tryToGetValue(viewDataArray[2], frameIndex, 'horizontal')
  const negZ = tryToGetValue(viewDataArray[1], frameIndex, 'horizontal')
  const posZ = tryToGetValue(viewDataArray[3], frameIndex, 'horizontal')
  const posX2 = negX ? {
    confidence: negX.confidence,
    value: -negX.value
  } : null
  const posZ2 = negZ ? {
    confidence: negZ.confidence,
    value: -negZ.value
  } : null

  const xVals = [posX, posX2].filter((val) => val !== null)
  const zVals = [posZ, posZ2].filter((val) => val !== null)
  const yVals = viewDataArray.map((viewData) => tryToGetValue(viewData, frameIndex, 'vertical')).filter((val) => val !== null)

  return {
    x: combineByConfidence(xVals),
    y: combineByConfidence(yVals),
    z: combineByConfidence(zVals),
  }
})

const ledCount = 300
const framesPerLed = frameCount / ledCount
const ledPositions = Array(ledCount).fill(null).map((_, ledIndex) => {
  const rangeStart = Math.round(ledIndex * framesPerLed)
  const rangeEnd = Math.min(Math.round((ledIndex + 1) * framesPerLed), frameCount)
  const range = framePositions.slice(rangeStart, rangeEnd)
  return {
    frameRange: [rangeStart, rangeEnd],
    x: combineByConfidence(range.map(({ x }) => x).filter((val) => val !== null)),
    y: combineByConfidence(range.map(({ y }) => y).filter((val) => val !== null)),
    z: combineByConfidence(range.map(({ z }) => z).filter((val) => val !== null))
  }
})

// console.log(ledPositions)
// console.log(ledPositions
//   .map((pos, i) => ({ i, pos }))
//   .filter(({ pos }) => !pos.x || !pos.y || !pos.z)
// )

fs.writeFile('ledPositions.json', JSON.stringify(ledPositions, null, 2), (err) => {
  if (err) {
    console.error(err)
  }
})
