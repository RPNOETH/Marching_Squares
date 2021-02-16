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
    const noiseMultiplier = 0.0075;

    for (let x = 0; x < 2; x++) {
      this.cornerValues[x] = [];
      for (let y = 0; y < 2; y++) {
        const cornerPos = createVector(x * this.size.x + this.position.x + this.offset.x, y * this.size.y + this.position.y + this.offset.y);

        this.cornerValues[x][y] = map(noise(cornerPos.x * noiseMultiplier, cornerPos.y * noiseMultiplier, this.offset.z), 0, 1, -1, 1);
      }
    }
  }

  // Converts the values of the corners to a single binary value
  // Starts at the top left corner adding 0 if less than 0.5 and 1 if more
  // Binary value is used to lookup the correct edge to construct
  convertToBinary(cutoff, hOffest) {
    let finalString = '';

    // Adds binary values starting top left and proceeding clockwise
    finalString += this.cornerValues[0][0] - hOffest > cutoff ? '1' : '0';
    finalString += this.cornerValues[1][0] - hOffest > cutoff ? '1' : '0';
    finalString += this.cornerValues[1][1] - hOffest > cutoff ? '1' : '0';
    finalString += this.cornerValues[0][1] - hOffest > cutoff ? '1' : '0';

    return parseInt(finalString, 2);
  }

  drawEdge(cutoff, hOffest) {
    const lookupIndex = this.convertToBinary(cutoff, hOffest);

    // Place holders for the halfway points between corners
    // a between top left and right
    // b between right top and bottom
    // c between bottm left and right
    // d between left top and bottom
    const a = createVector(this.size.x / 2, 0);
    const b = createVector(this.size.x, this.size.y / 2);
    const c = createVector(this.size.x / 2, this.size.y);
    const d = createVector(0, this.size.y / 2);

    // Each corner value
    const c0 = this.cornerValues[0][0] - hOffest;
    const c1 = this.cornerValues[1][0] - hOffest;
    const c2 = this.cornerValues[1][1] - hOffest;
    const c3 = this.cornerValues[0][1] - hOffest;

    // Converted A
    const aConverted = createVector((this.size.x * c0) / (c0 - c1), 0);

    // Converted B
    const bConverted = createVector(this.size.x, (this.size.y * c1) / (c1 - c2));

    // Converted C
    const cConverted = createVector(this.size.x * (1 - c2 / (c2 - c3)), this.size.y);

    // Converted D
    const dConverted = createVector(0, this.size.y * (1 - c3 / (c3 - c0)));

    push();
    translate(this.position.x, this.position.y);
    strokeWeight(1);
    lookupTable[lookupIndex](aConverted, bConverted, cConverted, dConverted);
    pop();
  }

  // Displays the corners of the square according to their values
  // This is only for debugging purposes
  display() {
    strokeWeight(3);

    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        const val = map(this.cornerValues[x][y], -1, 1, 0, 255);

        stroke(val);
        fill(val);

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
