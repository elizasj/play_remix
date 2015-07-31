var Y_AXIS = 2;
var X_AXIS = 1;
var c1, c2;
var x = windowWidth
var y = windowHeight


function preload(){

}

function setup() {
  cnv = createCanvas(windowWidth,windowHeight);
  c1 = color(255, 246, 170);
  c2 = color(255, 112, 133);
}

function draw() {
	setGradient(0, 0, width, height, c2, c1, Y_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 1, 0);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
