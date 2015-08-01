//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix
var Y_AXIS = 2;
var X_AXIS = 1;
var c1, c2;
var c1_Alpha;

function preload() {
  bass = {
    sound: loadSound('/audio/BASS.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    }

  };

  breaks = {
    sound: loadSound('/audio/BREAKS.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    }
  };

  pad = {
    sound: loadSound('/audio/PAD.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    }
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  padPlay = new p5.AudioIn();
  fftPad = new p5.FFT();
  fftPad.setInput(pad.sound);

  padAmplitude = new p5.Amplitude();
  padAmplitude.setInput(pad.sound)
  system = new ParticleSystem();

  cnv = createCanvas(windowWidth,windowHeight);
  
  c1 = color(255, 246, 170);
  c2 = color(255, 112, 133);

//noStroke();
//c = color(0, 126, 255, 0);
//fill(c1);

}

function mousePressed(){
  bass.play();
  breaks.play();
  pad.play();
}

function draw() {
  var drawPad = fftPad.analyze();
  var backgroundPad = padAmplitude.getLevel();
  var showBreaks = breaks.sound.getLevel();

  var gr1 = setGradient(0, 0, width, height, c2, c1, Y_AXIS);

  var gr2 =setGradient(0, 0, width, height, c2, c1, Y_AXIS);

  // H, S & B integer values
  //colorMode(HSB);
  //background(255, 105, backgroundPad*255);

  beginShape();
  	for (var i = 0; i < drawPad.length; i++) {
    	point(i, drawPad[i]);
  	}
 	endShape();

  if (showBreaks > 0.01) {
    system.addParticle();
  }

  system.run();
}

