// Size of the visual representation of the corners of the cubes
let dotSize = undefined;

// Contains each corner of the square
let dotArr = [];

// Contains the lookup index of each square
let loopUpArr = [];

// Determines the amount of blocks in the horizontal axis as well as the vertical axis
const totalBlocksWidth = 50;
const totalBlocksHeight = 50;

// Used for drawing the blocks
let blocksWidth;
let blocksHeight;
let halfWidth;
let halfHeight;

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
  const dotScaler = windowWidth;
  dotSize = windowWidth > windowHeight ? windowWidth / dotScaler : windowHeight / dotScaler;

  noiseSeed(0);
}

function draw() {
  background(100);
  strokeWeight(dotSize);

  generateMarchingSquares();

  // Displays each dot based on the value assigned to them
  // 0 is black
  // 1 is white
  for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
    for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
      dotArr[xPos][yPos] ? stroke(0) : stroke(255);
      point(blocksWidth * xPos, blocksHeight * yPos);
    }
  }

  //Draws sqaures
  for (let xPos = 1; xPos <= totalBlocksWidth; xPos++) {
    for (let yPos = 1; yPos <= totalBlocksHeight; yPos++) {
      push();
      translate(blocksWidth * xPos - halfWidth, blocksHeight * yPos - halfHeight);
      stroke(255, 255, 0);
      strokeWeight(1);
      lookUpTable[lookUpArr[xPos - 1][yPos - 1]]();
      pop();
    }
  }

  xOffset += 0.05;
}

function generateMarchingSquares() {
  // Cycles through the amount of corners on the grid, giving each a random noise smoothed value
  // This value represents wether the dot is considered active of not
  // The noise multiplier specifies how fast the noise moves
  dotArr = [];

  const noiseMovementMultiplier = 0.05;
  for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
    let arrRow = [];

    for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
      const tempVal = noise(xPos * noiseMovementMultiplier + xOffset, yPos * noiseMovementMultiplier);
      arrRow.push(tempVal >= 0.5 ? 1 : 0);
    }

    dotArr.push(arrRow);
  }

  // Cycles through each square and determines an lookup index
  // This is acomplished by creating a binary value from the corner values
  // This binary value is then converted into a decimal value which is compared
  // to the lookup table to determine the correct edges needed
  lookUpArr = [];

  for (let xPos = 0; xPos < totalBlocksWidth; xPos++) {
    let arrRow = [];
    for (let yPos = 0; yPos < totalBlocksHeight; yPos++) {
      const topRight = dotArr[xPos + 1][yPos];
      const bottomRight = dotArr[xPos + 1][yPos + 1];
      const bottomLeft = dotArr[xPos][yPos + 1];
      const topLeft = dotArr[xPos][yPos];

      finalBinaryString = `${topLeft}${topRight}${bottomRight}${bottomLeft}`;
      arrRow.push(parseInt(finalBinaryString, 2));
    }

    lookUpArr.push(arrRow);
  }
}

// The lookup table determining which edges should be drawn
// TODO: Fix lookup table to fill values
lookUpTable = {
  0: function () {},
  1: function () {
    line(-halfWidth, 0, 0, halfHeight);
  },
  2: function () {
    line(0, halfHeight, halfWidth, 0);
  },
  3: function () {
    line(-halfWidth, 0, halfWidth, 0);
  },
  4: function () {
    line(0, -halfHeight, halfWidth, 0);
  },
  5: function () {
    line(0, -halfHeight, -halfWidth, 0);
    line(0, halfHeight, halfWidth, 0);
  },
  6: function () {
    line(0, halfHeight, 0, -halfHeight);
  },
  7: function () {
    line(-halfWidth, 0, 0, -halfHeight);
  },
  8: function () {
    line(-halfWidth, 0, 0, -halfHeight);
  },
  9: function () {
    line(0, halfHeight, 0, -halfHeight);
  },
  10: function () {
    line(-halfWidth, 0, 0, halfHeight);
    line(0, -halfHeight, halfWidth, 0);
  },
  11: function () {
    line(0, -halfHeight, halfWidth, 0);
  },
  12: function () {
    line(-halfWidth, 0, halfWidth, 0);
  },
  13: function () {
    line(0, halfHeight, halfWidth, 0);
  },
  14: function () {
    line(-halfWidth, 0, 0, halfHeight);
  },
  15: function () {},
};
