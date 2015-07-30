//ruby -run -e httpd . -p 5000
//cd ~/desktop/github/play_remix
var fftPad;

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
//amplitude = new p5.Amplitude();
fftPad = new p5.FFT();
fftPad.setInput(pad);
}

function mousePressed(){
	bass.play();
	breaks.play();
	pad.play();
}

function draw() {
	var drawPad = fftPad.analyze();

	BeginShape();
  	for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
  	}
	endShape();

}

//ellipse(mouseX, mouseY, 10, 40);
//var level = pad.sound.amplitude.getLevel();
//var size = map(level, 0, 1, 0, 200);
//ellipse(mouseX, mouseY, size, size);



