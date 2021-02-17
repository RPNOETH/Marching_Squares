// Stores an array of sqaures classes
let squareArr = [];

// Sets the resolution for the squares
const res = 25;

// Offset for moving the sqaure map
let xOffset = 0;

// Used to generate the next set of squares
let nextCol = 0;

// Size of the squares calculated
let boxWidth;
let boxHeight;

const simplex = new SimplexNoise();

function setup() {
  createCanvas(windowWidth / 1.2, windowHeight / 1.2);
  frameRate(30);

  boxHeight = height / res;
  boxWidth = width / res;

  createAllSqaures();
}

function draw() {
  background(0);
  resetMatrix();

  translate(xOffset, 0, 0);
  squareArr.forEach((arr) => {
    arr.forEach((s) => {
      if (s) {
        s.drawEdge();
      }
    });
  });

  console.log(frameRate());
  xOffset -= 3;

  if (abs(squareArr[0][0].position.x - abs(xOffset)) > boxWidth) {
    shiftSquaresLeft();
  }
}

// Creates all of the initial sqaures
function createAllSqaures() {
  squareArr = [];

  for (let x = 0; x <= res; x++) {
    createSquareCol(x);
  }
}

function shiftSquaresLeft() {
  for (let x = 0; x < res; x++) {
    for (let y = 0; y < res; y++) {
      const targetSqaure = squareArr[x + 1][y];

      const newSquare = new Square(targetSqaure.position, targetSqaure.size, targetSqaure.offset);
      newSquare.cornerValues = targetSqaure.cornerValues;
      newSquare.edge = targetSqaure.edge;

      squareArr[x][y] = newSquare;
    }
  }

  createSquareCol(res);
}

function createSquareCol(col) {
  squareArr[col] = [];

  for (let y = 0; y < res; y++) {
    const pos = createVector(nextCol * boxWidth, y * boxHeight);

    const newSquare = new Square(pos, createVector(boxWidth, boxHeight), createVector(0, 0, 0));
    newSquare.createCornerValues(simplex);
    newSquare.determineEdge(0, 0);

    newSquare.determineEdge(0, 0.4);
    newSquare.determineEdge(0, -0.4);

    squareArr[col][y] = newSquare;
  }

  nextCol += 1;
}
