// Size of the visual representation of the corners of the cubes
let dotSize = undefined;

// Contains each corner of the square
let dotArr = [];

// Determines the amount of blocks in the horizontal axis as well as the vertical axis
const totalBlocksWidth = 5;
const totalBlocksHeight = 5;

// Used for drawing the dots
let xSpacing;
let ySpacing;

function setup() {
  // Sets up the canvas to take only 1 third of the display screen
  const newWidth = windowWidth / 3;
  const newHeight = windowHeight / 2;
  createCanvas(newWidth, newHeight);

  // Determines neccesary spacing
  xSpacing = width / totalBlocksWidth;
  ySpacing = height / totalBlocksHeight;

  // Sets up and dynamic dot size to visualize cube corners
  const dotScaler = 100;
  dotSize = windowWidth > windowHeight ? windowWidth / dotScaler : windowHeight / dotScaler;

  // Cycles through the amount of corners on the grid, giving each a random noise smoothed value
  // This value represents wether the dot is considered active of not
  // The noise multiplier specifies how fast the noise moves
  const noiseMovementMultiplier = 1;
  for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
    let arrRow = [];

    for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
      const tempVal = noise(xPos * noiseMovementMultiplier, yPos * noiseMovementMultiplier);
      arrRow.push(tempVal >= 0.5 ? 1 : 0);
    }

    dotArr.push(arrRow);
  }

  // Cycles through each square and determines an lookup index
  // This is acomplished by creating a binary value from the corner values
  // This binary value is then converted into a decimal value which is compared
  // to the lookup table to determine the correct edges needed
  const lookUpArr = [];

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

  console.log(lookUpArr);
}

function draw() {
  background(100);
  strokeWeight(dotSize);

  // Displays each dot based on the value assigned to them
  // 0 is black
  // 1 is white
  for (let xPos = 0; xPos <= totalBlocksWidth; xPos++) {
    for (let yPos = 0; yPos <= totalBlocksHeight; yPos++) {
      stroke(dotArr[xPos][yPos] * 255);
      point(xSpacing * xPos, ySpacing * yPos);
    }
  }
}
