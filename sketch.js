// Size of the visual representation of the corners of the cubes
let dotSize = undefined;

// Contains each corner of the square
let dotArr = [];

// Determines the amount of blocks in the horizontal axis as well as the vertical axis
const totalBlocksWidth = 50;
const totalBlocksHeight = 50;

// Used for drawing the blocks
let blocksWidth;
let blocksHeight;
let halfWidth;
let halfHeight;

// Used to make the noise move (Creates illusion of moving across a map)
let xOffset = 0;

function setup() {
  // Sets up the canvas to take only 1 third of the display screen
  const newWidth = windowWidth / 3;
  const newHeight = windowHeight / 2;
  createCanvas(newWidth, newHeight);

  // Determines neccesary spacing
  blocksWidth = width / totalBlocksWidth;
  blocksHeight = height / totalBlocksHeight;
  halfWidth = blocksWidth / 2;
  halfHeight = blocksHeight / 2;

  // Sets up and dynamic dot size to visualize cube corners
  const dotScaler = windowWidth / 4;
  dotSize = windowWidth > windowHeight ? windowWidth / dotScaler : windowHeight / dotScaler;

  noiseSeed(0);
}

function draw() {
  background(0);
  strokeWeight(dotSize);

  generateMarchingSquares();

  // Displays each dot based on the value assigned to them
  // 0 is black
  // 1 is white
  // for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
  //   for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
  //     stroke(dotArr[xPos][yPos] * 255);
  //     point(blocksWidth * xPos, blocksHeight * yPos);
  //   }
  // }

  //Draws sqaures
  for (let xPos = 1; xPos <= totalBlocksWidth; xPos++) {
    for (let yPos = 1; yPos <= totalBlocksHeight; yPos++) {
      push();
      translate(blocksWidth * xPos - halfWidth, blocksHeight * yPos - halfHeight);
      stroke(255, 255, 0);
      strokeWeight(1);

      drawEdge(xPos - 1, yPos - 1);

      pop();
    }
  }
}

function generateMarchingSquares() {
  // Cycles through the amount of corners on the grid, giving each a random noise smoothed value
  // This value represents wether the dot is considered active of not
  // The noise multiplier specifies how fast the noise moves
  dotArr = [];

  const noiseMovementMultiplier = 0.1;
  for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
    let arrRow = [];

    for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
      const tempVal = noise(xPos * noiseMovementMultiplier + xOffset, yPos * noiseMovementMultiplier);
      arrRow.push(tempVal);
    }

    dotArr.push(arrRow);
  }
}

function drawEdge(xPos, yPos) {
  // Cycles through each square and determines an lookup index
  // This is acomplished by creating a binary value from the corner values
  // This binary value is then converted into a decimal value which is compared
  // to the lookup table to determine the correct edges needed
  const topRight = dotArr[xPos + 1][yPos];
  const bottomRight = dotArr[xPos + 1][yPos + 1];
  const bottomLeft = dotArr[xPos][yPos + 1];
  const topLeft = dotArr[xPos][yPos];

  finalBinaryString = `${round(topLeft)}${round(topRight)}${round(bottomRight)}${round(bottomLeft)}`;
  const finalVal = parseInt(finalBinaryString, 2);

  lookUpTable[finalVal](topLeft, topRight, bottomRight, bottomLeft);
}

const division = 4;
const setColor = function () {
  fill(255, 255, 0);
  stroke(255, 255, 0);
};

// The lookup table determining which edges should be drawn
// TODO: Fix lookup table to fill values
lookUpTable = {
  0: function (topLeft, topRight, bottomRight, bottomLeft) {},
  1: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, bottomLeft - topLeft);
    const newXVal = lerp(blocksWidth / division, 0, bottomLeft - bottomRight);

    line(-halfWidth, newYVal, -newXVal, halfHeight);
  },
  2: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, bottomRight - topRight);
    const newXVal = lerp(blocksWidth / division, 0, bottomRight - bottomLeft);

    line(newXVal, halfHeight, halfWidth, newYVal);
  },
  3: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYValLeft = lerp(0, blocksHeight / division, bottomLeft - topLeft);
    const newYValRight = lerp(0, blocksHeight / division, bottomRight - topRight);

    line(-halfWidth, newYValLeft, halfWidth, newYValRight);
  },
  4: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, topRight - bottomRight);
    const newXVal = lerp(blocksWidth / division, 0, topRight - topLeft);

    line(newXVal, -halfHeight, halfWidth, -newYVal);
  },
  5: function (topLeft, topRight, bottomRight, bottomLeft) {
    let newYVal = lerp(0, blocksHeight / division, bottomLeft - topLeft);
    let newXVal = lerp(blocksWidth / division, 0, topRight - topLeft);

    line(newXVal, -halfHeight, -halfWidth, newYVal);

    newYVal = lerp(0, blocksHeight / division, topRight - bottomRight);
    newXVal = lerp(blocksWidth / division, 0, bottomLeft - bottomRight);

    line(-newXVal, halfHeight, halfWidth, -newYVal);
  },
  6: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newXValTop = lerp(blocksWidth / division, 0, topRight - topLeft);
    const newXValBottom = lerp(blocksWidth / division, 0, bottomRight - bottomLeft);

    line(newXValBottom, halfHeight, newXValTop, -halfHeight);
  },
  7: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, bottomLeft - topLeft);
    const newXVal = lerp(blocksWidth / division, 0, topRight - topLeft);

    line(-halfWidth, newYVal, newXVal, -halfHeight);
  },
  8: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, topLeft - bottomLeft);
    const newXVal = lerp(blocksWidth / division, 0, topLeft - topRight);

    line(-halfWidth, newYVal, -newXVal, -halfHeight);
  },
  9: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newXValTop = lerp(blocksWidth / division, 0, topLeft - topRight);
    const newXValBottom = lerp(blocksWidth / division, 0, bottomLeft - bottomRight);

    line(-newXValBottom, halfHeight, -newXValTop, -halfHeight);
  },
  //DO HERE
  10: function (topLeft, topRight, bottomRight, bottomLeft) {
    let newYVal = lerp(0, blocksHeight / division, topLeft - bottomLeft);
    let newXVal = lerp(blocksWidth / division, 0, bottomRight - bottomLeft);

    line(-halfWidth, -newYVal, newXVal, halfHeight);

    newYVal = lerp(0, blocksHeight / division, bottomRight - topRight);
    newXVal = lerp(blocksWidth / division, 0, topLeft - topRight);

    line(-newXVal, -halfHeight, halfWidth, newYVal);
  },
  11: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, bottomRight - topRight);
    const newXVal = lerp(blocksWidth / division, 0, topLeft - topRight);

    line(-newXVal, -halfHeight, halfWidth, newYVal);
  },
  12: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYValLeft = lerp(0, blocksHeight / division, topLeft - bottomLeft);
    const newYValRight = lerp(0, blocksHeight / division, topRight - bottomRight);

    line(-halfWidth, -newYValLeft, halfWidth, -newYValRight);
  },
  13: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, topRight - bottomRight);
    const newXVal = lerp(blocksWidth / division, 0, bottomLeft - bottomRight);

    line(-newXVal, halfHeight, halfWidth, -newYVal);
  },
  14: function (topLeft, topRight, bottomRight, bottomLeft) {
    const newYVal = lerp(0, blocksHeight / division, topLeft - bottomLeft);
    const newXVal = lerp(blocksWidth / division, 0, bottomRight - bottomLeft);

    line(-halfWidth, -newYVal, newXVal, halfHeight);
  },
  15: function (topLeft, topRight, bottomRight, bottomLeft) {
    setColor();

    beginShape();
    vertex(-halfWidth, -halfHeight);
    vertex(halfWidth, -halfHeight);
    vertex(halfWidth, halfHeight);
    vertex(-halfWidth, halfHeight);
    endShape(closed);
  },
};
