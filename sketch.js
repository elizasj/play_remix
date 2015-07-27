function setup() {
createCanvas(windowWidth, windowHeight);
mySound.setVolume(0.1)
mySound.play();
}

function draw() {
  // draw stuff here
}

function preload() {
	mySound = loadSound('.../audio/PIANO.mid');
}

