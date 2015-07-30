//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix

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
	system = new ParticleSystem(createVector(width/2, 50));
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
	console.log(showBreaks)
	
	// H, S & B integer values
	colorMode(HSB);
	background(255, 105, backgroundPad*255);

	beginShape();
  	for (i = 0; i<drawPad.length; i++) {
    point(i, drawPad[i]);
  	}
	endShape();

	if (showBreaks > 0.26) {
			system.addParticle();
  		
	}
	system.run();
}




