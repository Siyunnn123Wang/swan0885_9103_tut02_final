let circles = [
  [200, 200, 200],  // First circle: position (200, 200), diameter 200
  [200, 500, 230],  // Second circle: position (200, 500), diameter 230
];

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fits the window size
  noLoop(); 
}

function draw() {
  background(255); // Set background color to white
  drawCircle1(circles[0][0], circles[0][1], circles[0][2]); 
  drawCircle2(circles[1][0], circles[1][1], circles[1][2]); 
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

    // Petal shape defined by curveVertices
    // reference:https://p5js.org/reference/p5/curveVertex/
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

  // Calculate white ring radius using ratio
  const whiteRingRatio = 2/3 + 1/15;  // Combine the ratios
  fill("#FFFFFF");
  circle(0, 0, s * whiteRingRatio); // White ring border

  // Define circle ratios
  const blueCircleRatio = 2/3;
  const orangeRingRadius = 0.43;  // Distance from center
  const smallCircleSize = 1/12;   // Size of small orange circles
  const midCircleRatio = 1/2;     // Middle orange-red circle
  
  fill("#3280ee");
  circle(0, 0, s * blueCircleRatio); // Blue inner circle

  // Draw 20 small orange circles evenly distributed around the outer ring
  push();
  const numCircles = 20;
  const angleStep = TWO_PI / numCircles;
  fill("#ed9b2c");
  
  for (let i = 0; i < numCircles; i++) {
    const theta = i * angleStep - PI/2;  // Start from top
    const x = cos(theta) * (s * orangeRingRadius);
    const y = sin(theta) * (s * orangeRingRadius);
    push();
    translate(x, y);
    ellipse(0, 0, s * smallCircleSize, s * smallCircleSize);
    pop();
  }
  pop();

  // Orange-red mid circle
  fill("#e7691f");
  circle(0, 0, s * midCircleRatio);

  //---------------------------
  // Add random small red dots to create a “flame” or “spark” texture
  //---------------------------
  // First group: smaller random sparks
  const numSparks1 = 6;
  const sparkSize1 = random(0.05, 0.1) * s;
  const baseRadius1 = s * 0.1;
  const radiusVariation1 = 0.05;
  
  fill("#e54b1c");
  // Generate first group parameters
  const angleStep1 = TWO_PI * 0.8 / (numSparks1 - 1);  // spread over 80% of circle
  const angles1 = Array(numSparks1).fill(0).map((_, i) => 
    -PI/2 + angleStep1 * i + random(-0.2, 0.2) * PI
  );
  const radii1 = Array(numSparks1).fill(0).map(() => 
    baseRadius1 + random(-radiusVariation1, radiusVariation1) * s
  );
  
  // Draw first group of sparks
  for (let i = 0; i < numSparks1; i++) {
    const x = cos(angles1[i]) * radii1[i];
    const y = sin(angles1[i]) * radii1[i];
    circle(x, y, sparkSize1);
  }

  // Second group: larger alternating sparks
  const sparkSize2 = random(0.1, 0.12) * s;
  fill("#e53019");
  const numSparks2 = 6;
  const rOuter = s * 0.13;  // outer radius
  const rInner = s * 0.08;  // inner radius
  
  // Generate second group parameters
  const angleStep2 = TWO_PI * 0.7 / (numSparks2 - 1);  // spread over 70% of circle
  
  // Draw second group of sparks
  for (let i = 0; i < numSparks2; i++) {
    const theta = -PI/2 + angleStep2 * i + random(-0.2, 0.2) * PI;
    const radius = i % 2 === 0 ? rOuter : rInner;  // alternate between outer and inner
    const x = cos(theta) * radius;
    const y = sin(theta) * radius;
    circle(x, y, sparkSize2);
  }

  pop();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); 
}