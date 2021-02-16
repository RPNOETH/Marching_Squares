// Stores an array of sqaures classes
let squareArr = [];

// Sets the resolution for the squares
const res = 50;

// Offset for the noise function
let xOffset = 0;

function setup() {
  createCanvas(windowWidth / 3, windowHeight / 2);
  frameRate(5);

  noiseSeed(0);

  createAllSqaures();
}

function draw() {
  background(0);

  createNewCol();

  squareArr.forEach((arr) => {
    arr.forEach((s) => {
      if (s) {
        // s.display();
        s.drawEdge();
      }
    });
  });
}

function createNewCol() {
  for (let x = 0; x < res - 1; x++) {
    for (let y = 0; y < res; y++) {
      const oldSqaure = squareArr[x][y];

      const newSqaure = new Square(oldSqaure.position, oldSqaure.size, oldSqaure.offset);
      newSqaure.cornerValues = squareArr[x + 1][y].cornerValues;

      squareArr[x][y] = newSqaure;
    }
  }

  const boxWidth = width / res;
  const boxHeight = height / res;

  for (let y = 0; y < res; y++) {
    const pos = createVector((res - 1) * boxWidth, y * boxHeight);

    squareArr[res - 1][y] = new Square(pos, createVector(boxWidth, boxHeight), createVector(xOffset * boxWidth, 0, 0));
    squareArr[res - 1][y].createCornerValues();
  }

  xOffset += 1;
}

function createAllSqaures() {
  squareArr = [];

  const boxWidth = width / res;
  const boxHeight = height / res;

  for (let x = 0; x < res; x++) {
    squareArr[x] = [];
    for (let y = 0; y < res; y++) {
      const pos = createVector(x * boxWidth, y * boxHeight);

      const newSquare = new Square(pos, createVector(boxWidth, boxHeight), createVector(xOffset, 0, 0));
      newSquare.createCornerValues();

      squareArr[x][y] = newSquare;
    }
  }
}
