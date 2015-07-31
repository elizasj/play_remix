//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix
var midiFileParser = require('midi-file-parser');

function preload() {
	bass = {
		sound: loadSound('/audio/BASS.mid'),
		playing: false,
		play: function() {
			this.sound.play();
			this.playing = true;
		}

	};
	
	breaks = {
		sound: loadSound('/audio/BREAKS.mid'),
		playing: false,
		play: function() {
			this.sound.play();
			this.playing = true;
		}
	};

	pad = {
		sound: loadSound('/audio/PAD.mid'),
		playing: false,
		play: function() {
			this.sound.play();
			this.playing = true;
		}
	};
}

function setup() {
createCanvas(windowWidth, windowHeight);
fftPad = new p5.FFT();
fftPad.setInput(pad);
var padFreq = midiToFreq(pad.sound);
}

function mousePressed(){
	//bass.play();
	//breaks.play();
	padFreq.play();
}

function draw() {
	beginShape();
  	for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
  	}
	endShape();

}

//ellipse(mouseX, mouseY, 10, 40);
//var level = pad.sound.amplitude.getLevel();
//var size = map(level, 0, 1, 0, 200);
//ellipse(mouseX, mouseY, size, size);



