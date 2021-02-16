// Stores an array of sqaures classes
let squareArr = [];

// Sets the resolution for the squares
const res = 20;

// Offset for the noise function
let xOffset = 1;

function setup() {
  createCanvas(windowWidth, windowHeight / 2);
  frameRate(20);

  createAllSqaures();
}

function draw() {
  background(0);

  // createNewCol();
  createAllSqaures();

  squareArr.forEach((arr) => {
    arr.forEach((s) => {
      if (s) {
        // s.display();

        for (let i = 0.9; i > -1; i -= 0.4) {
          stroke(255 * map(i, -1, 1, 0, 1));
          s.drawEdge(0, i);
        }
      }
    });
  });

  console.log(frameRate());
  xOffset += 0.01;
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

      const newSquare = new Square(pos, createVector(boxWidth, boxHeight), createVector(0, 0, xOffset));
      newSquare.createCornerValues();

      squareArr[x][y] = newSquare;
    }
  }
}
