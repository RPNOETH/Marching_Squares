class Square {
  // Create the object based on the position of the square
  // As well as the values of the corner positions
  constructor(position, size, offset) {
    this.cornerValues = [];
    this.position = position;
    this.size = size;
    this.offset = offset;
  }

  // determines the values of the corners based on the position of the square
  createCornerValues() {
    this.cornerValues = [];

    // How fast you cycle over the noise
    const noiseMultiplier = 0.01;

    for (let x = 0; x < 2; x++) {
      this.cornerValues[x] = [];
      for (let y = 0; y < 2; y++) {
        const cornerPos = createVector(x * this.size.x + this.position.x, y * this.size.y + this.position.y);

        this.cornerValues[x][y] = noise(
          (cornerPos.x + this.offset.x) * noiseMultiplier,
          (cornerPos.y + this.offset.y) * noiseMultiplier,
          this.offset.z * noiseMultiplier
        );
      }
    }
  }

  // Converts the values of the corners to a single binary value
  // Starts at the top left corner adding 0 if less than 0.5 and 1 if more
  // Binary value is used to lookup the correct edge to construct
  convertToBinary() {
    let finalString = '';

    // Adds binary values starting top left and proceeding clockwise
    finalString += this.cornerValues[0][0] > 0.5 ? '1' : '0';
    finalString += this.cornerValues[1][0] > 0.5 ? '1' : '0';
    finalString += this.cornerValues[1][1] > 0.5 ? '1' : '0';
    finalString += this.cornerValues[0][1] > 0.5 ? '1' : '0';

    return parseInt(finalString, 2);
  }

  drawEdge() {
    const lookupIndex = this.convertToBinary();

    // Place holders for the halfway points between corners
    // a between top left and right
    // b between right top and bottom
    // c between bottm left and right
    // d between left top and bottom
    const a = createVector(this.size.x / 2, 0);
    const b = createVector(this.size.x, this.size.y / 2);
    const c = createVector(this.size.x / 2, this.size.y);
    const d = createVector(0, this.size.y / 2);

    push();
    translate(this.position.x, this.position.y);
    strokeWeight(1);
    stroke(255);
    lookupTable[lookupIndex](a, b, c, d);
    pop();
  }

  // Displays the corners of the square according to their values
  // This is only for debugging purposes
  display() {
    strokeWeight(3);

    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        const val = this.cornerValues[x][y];

        stroke(val * 255);
        fill(val * 255);

        push();
        translate(this.position.x, this.position.y);
        point(x * this.size.x, y * this.size.y);
        pop();
      }
    }
  }
}

// Shorthand function for drawing a line between 2 vector points
function vectorLine(pointA, pointB) {
  line(pointA.x, pointA.y, pointB.x, pointB.y);
}

// Lookup table for drawing the neccesary edges
const lookupTable = {
  0: function () {},
  1: function (a, b, c, d) {
    vectorLine(d, c);
  },
  2: function (a, b, c, d) {
    vectorLine(c, b);
  },
  3: function (a, b, c, d) {
    vectorLine(d, b);
  },
  4: function (a, b, c, d) {
    vectorLine(a, b);
  },
  5: function (a, b, c, d) {
    vectorLine(a, d);
    vectorLine(b, c);
  },
  6: function (a, b, c, d) {
    vectorLine(a, c);
  },
  7: function (a, b, c, d) {
    vectorLine(d, a);
  },
  8: function (a, b, c, d) {
    vectorLine(d, a);
  },
  9: function (a, b, c, d) {
    vectorLine(a, c);
  },
  10: function (a, b, c, d) {
    vectorLine(a, b);
    vectorLine(c, d);
  },
  11: function (a, b, c, d) {
    vectorLine(a, b);
  },
  12: function (a, b, c, d) {
    vectorLine(d, b);
  },
  13: function (a, b, c, d) {
    vectorLine(b, c);
  },
  14: function (a, b, c, d) {
    vectorLine(d, c);
  },
  15: function (a, b, c, d) {},
};
