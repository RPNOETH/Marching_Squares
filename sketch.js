// Size of the visual representation of the corners of the cubes
let dotSize = undefined;

// Contains each corner of the square
let dotArr = [];

// Determines the amount of dots in the horizontal axis as well as the vertical axis
const totalDotsWidth = 10;
const totalDotsHeight = 10;

function setup() {
  // Sets up the canvas to take only 1 third of the display screen
  const newWidth = windowWidth / 3;
  const newHeight = windowHeight / 2;
  createCanvas(newWidth, newHeight);

  // Sets up and dynamic dot size to visualize cube corners
  const dotScaler = 200;
  dotSize = windowWidth > windowHeight ? windowWidth / dotScaler : windowHeight / dotScaler;

  // Cycles through the amount of corners on the grid, giving each a random noise smoothed value
  // This value represents wether the dot is considered active of not
  // The noise multiplier specifies how fast the noise moves
  const noiseMovementMultiplier = 0.1;
  for (let xPos = 0; xPos <= totalDotsWidth; xPos++) {
    let arrRow = [];

    for (let yPos = 0; yPos <= totalDotsHeight; yPos++) {
      const tempVal = noise(xPos * noiseMovementMultiplier, yPos * noiseMovementMultiplier);
      arrRow.push(tempVal >= 0.5 ? 255 : 0);
    }

    dotArr.push(arrRow);
  }
}

function draw() {
  background(100);
  strokeWeight(dotSize);

  // Displays each dot based on the value assigned to them
  // 0 is black
  // 1 is white
  const xSpacing = width / totalDotsWidth;
  const ySpacing = height / totalDotsHeight;
  for (let xPos = 0; xPos <= totalDotsWidth; xPos++) {
    for (let yPos = 0; yPos <= totalDotsHeight; yPos++) {
      stroke(dotArr[xPos][yPos]);
      point(xSpacing * xPos, ySpacing * yPos);
    }
  }
}
