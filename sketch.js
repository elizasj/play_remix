//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix
var Y_AXIS = 2;
var X_AXIS = 1;
var c1, c2;
var c1_Alpha;
// The amplitude of each wave
var amplitude;
// The minimum length of each line 
var offset; 
// Number of gaps between lines
var numGaps;
 


function preload() {
  bass = {
    sound: loadSound('/audio/BASS.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    },
    pause: function() {
    	this.sound.pause();
    	this.playing = false
    },
    toggle: function() {
    	this.playing ? this.pause() : this.play()
    }
  };

  breaks = {
    sound: loadSound('/audio/BREAKS.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    },
    pause: function() {
  		this.sound.pause();   	
  		this.playing = false
    },
    toggle: function() {
    	this.playing ? this.pause() : this.play()
    }
  };

  pad = {
    sound: loadSound('/audio/PAD.ogg'),
    playing: false,
    play: function() {
      this.sound.play();
      this.playing = true;
    },
    pause: function() {
    	this.sound.pause();
    	this.playing = false
    },
    toggle: function () {
    	this.playing ? this.pause() : this.play()
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
  
  //gradient colors
  c1 = color(255, 246, 170);
  c2 = color(255, 112, 133);

//noStroke();
//c = color(0, 126, 255, 0);
//fill(c1);
}

function mousePressed(){
  bass.toggle();
  breaks.toggle();
  pad.toggle();
}

function draw() {
  var drawPad = fftPad.analyze();
  var backgroundPad = padAmplitude.getLevel();
  var showBreaks = breaks.sound.getLevel();
  var showBass = bass.sound.getLevel();

  //waves specs -- but how to set for JUST waves
	strokeWeight(2);
	numGaps = 6;
  amplitude = showBass*255
  offset = height / 40;
  t = 0+showBass;

  var gr1 = setGradient(0, 0, width, height, c2, c1, Y_AXIS, backgroundPad);
  var gr2 = setGradient(0, 0, width, height, c2, c1, Y_AXIS);

  //frameRate(300);
  stroke(255);

  setWave(showBass, 1);
  setWave(showBass, 2);
  setWave(showBass, 3);

  // H, S & B integer values
  //colorMode(HSB);
  //background(255, 105, backgroundPad*255);

  beginShape();
   	for (var i = 0; i < drawPad.height; i++) {
   		fill(255);
     	point(i, drawPad[i]/2);
   	}
 	endShape();

  if (showBreaks > 0.01) {
    system.addParticle();
  }

  system.run();

  //for (var i = 0; i >= showBreaks.length ; i++) {
  //frameRate(10);
  //stroke(255);
	//line(random(windowWidth/2, windowHeight/2), random(windowWidth, windowHeight), random(backgroundPad*255, 100), 75);
  //}
}

