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
}

function setup() {
createCanvas(windowWidth, windowHeight);
bass.sound.setVolume(0.1)
amplitude = new p5.Amplitude();
}

function mousePressed(){
	bass.play();
	breaks.play();

}

function draw() {
	//if (bass.playing == true) {
	//	ellipse(mouseX, mouseY, 80, 80);
	//};
	var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 200);
  ellipse(mouseX, mouseY, size, size);
}


//osc.freq(midiToFreq(note))