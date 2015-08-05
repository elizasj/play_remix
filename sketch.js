//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix
var Y_AXIS = 2;
var X_AXIS = 1;
var c1, c2;

// lines
// The amplitude of each wave
var amplitude;
// The minimum length of each line 
var offset; 
// Number of gaps between lines
var numGaps;

//particles2
// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;


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

  fx = {
    sound: loadSound('/audio/FX.ogg'),
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

  // fxAmplitude = new p5.Amplitude();
  // fxAmplitude.setInput(fx.sound)

  //particles2
  current = createVector(0,0);
  previous = createVector(0,0);
}

function mousePressed(){
  // play music
  bass.toggle();
  breaks.toggle();
  pad.toggle();
  fx.toggle();
}

// // Stop
// function mouseReleased() {
 
// }

function draw() {
  var drawPad = fftPad.analyze();
  var backgroundPad = padAmplitude.getLevel();
  var showBreaks = breaks.sound.getLevel();
  var showBass = bass.sound.getLevel();
  var showFX = breaks.sound.getLevel();


  if (showBreaks > 0.01) {
    system.addParticle();
  }

  //waves specs -- but how to set for JUST waves
	strokeWeight(2);
	numGaps = 6;
  amplitude = showBass*255
  offset = height / 40;
  t = 0+showBass;

  var gr1 = setGradient(0, 0, width, height, c2, c1, Y_AXIS);
  var gr2 = setGradient(0, 0, width, height, c2, c1, Y_AXIS);

  stroke(255);

  setWave(showBass, 1);
  setWave(showBass, 2);
  setWave(showBass, 3);

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

  //draw particles
  // start it up
  console.log(showFX)
  if (showFX > 0.00008) {
  next = 0;
  painting = true;
  previous.x = showFX;
  previous.y = showFX;
  paths.push(new Path());
  }

  // //stop
  // if (fx == false) {
  // painting = false;
  // }

  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position      
    current.x = random(0, windowWidth);
    current.y = random(0, windowHeight);

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);
    
    // Schedule next circle
    next = millis() + 10;

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  //particles2
  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

