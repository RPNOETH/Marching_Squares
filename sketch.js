// Stores an array of sqaures classes
const squareArr = [];

// Sets the resolution for the squares
const res = 20;

function setup() {
  createCanvas(windowWidth / 3, windowHeight / 2);

  noiseSeed(0);

  const boxWidth = width / res;
  const boxHeight = height / res;

  for (let x = 0; x < res; x++) {
    for (let y = 0; y < res; y++) {
      const pos = createVector(x * boxWidth, y * boxHeight);

      const newSquare = new Square(pos, createVector(boxWidth, boxHeight));

      squareArr.push(newSquare);
    }
  }
}

function draw() {
  background(0);

  squareArr.forEach((s) => {
    s.display();
    s.drawEdge();
  });

  noLoop();
}
