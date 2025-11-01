// Define two circle configurations: [x position, y position, diameter]
let circles = [
  [200, 200, 200],  // First circle: position (200, 200), diameter 200
  [200, 500, 230],  // Second circle: position (200, 500), diameter 230
];

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fits the window size
  noLoop(); // Draw only once (no continuous looping)
}

function draw() {
  background(255); // Set background color to white
  drawCircle1(circles[0][0], circles[0][1], circles[0][2]); // Draw the first decorative circle
  drawCircle2(circles[1][0], circles[1][1], circles[1][2]); // Draw the second decorative circle
}

//---------------------------//
// Draw the first circular motif
// Parameters: x, y = center position; s = size (diameter)
//---------------------------//
function drawCircle1(x, y, s) {
  push();
  translate(x, y); // Move origin to the circle center
  noFill();
  strokeWeight(Math.round(s * 0.125)); // Set outline thickness relative to size
  stroke("#000000");
  circle(0, 0, s); // Draw black outer ring

  noStroke();
  fill("#e53019");
  circle(0, 0, Math.round(s * 0.125)); // Red inner circle at the center

  push();
  // Draw six symmetrical orange "petals" with blue dots around the center
  for (let i = 0; i < 6; i++) {
    rotate(PI / 3); // Rotate 60° for each petal
    fill("#f1801b");

    // Petal shape defined by smooth curve vertices
    beginShape();
    curveVertex(0, -0.05 * s);
    curveVertex(0, -0.05 * s);
    curveVertex(-0.001 * s, -0.08 * s);
    curveVertex(-0.025 * s, -0.135 * s);
    curveVertex(-0.045 * s, -0.245 * s);
    curveVertex(-0.055 * s, -0.32 * s);
    curveVertex(-0.035 * s, -0.39 * s);
    curveVertex(0.035 * s, -0.39 * s);
    curveVertex(0.055 * s, -0.32 * s);
    curveVertex(0.045 * s, -0.245 * s);
    curveVertex(0.025 * s, -0.135 * s);
    curveVertex(0.001 * s, -0.08 * s);
    endShape(CLOSE);

    // Blue circle accent near each petal
    fill("#517ae1");
    ellipse(-0.17 * s, -0.28 * s, s / 9.0, s / 9.0);
  }
  pop();
  pop();
}

//---------------------------//
// Draw the second circular motif
// Parameters: x, y = center position; s = size (diameter)
//---------------------------//
function drawCircle2(x, y, s) {
  push();
  translate(x, y); // Move origin to the circle center

  noStroke();
  fill("#000000");
  circle(0, 0, s); // Outer black circle base

  fill("#FFFFFF");
  circle(0, 0, (s * 2) / 3.0 + s / 15.0); // White ring border

  fill("#3280ee");
  circle(0, 0, (s * 2) / 3.0); // Blue inner circle

  // Draw 20 small orange circles evenly distributed around the outer ring
  push();
  for (let i = 0; i < 20; i++) {
    rotate(PI / 10); // Rotate 18° per step 
    fill("#ed9b2c");
    ellipse(0, -0.43 * s, s / 12.0, s / 12.0);
  }
  pop();

  // Orange-red mid circle
  fill("#e7691f");
  circle(0, 0, s / 2.0);

  //---------------------------
  // Add random small red dots to create a “flame” or “spark” texture
  //---------------------------
  let rndS1 = random(0.05, 0.1) * s; // First group: smaller random size
  fill("#e54b1c");
  circle(0.022 * s, -0.13 * s, rndS1);
  circle(0.148 * s, -0.096 * s, rndS1);
  circle(-0.135 * s, 0.004 * s, rndS1);
  circle(-0.074 * s, 0.005 * s, rndS1);
  circle(-0.057 * s, 0.083 * s, rndS1);
  circle(0.009 * s, 0.134 * s, rndS1);

  let rndS2 = random(0.1, 0.12) * s; // Second group: slightly larger
  fill("#e53019");
  circle(-0.096 * s, -0.087 * s, rndS2);
  circle(-0.009 * s, -0.048 * s, rndS2);
  circle(0.09 * s, -0.03 * s, rndS2);
  circle(0.013 * s, 0.05 * s, rndS2);
  circle(-0.134 * s, 0.104 * s, rndS2);
  circle(0.098 * s, 0.09 * s, rndS2);

  pop();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); 
}