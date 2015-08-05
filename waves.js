 function setWave(tiltingthing, rowNumber){

 	var yPosition
 
 	//to check if even row numbers or not
 	var even = true

 	if (rowNumber === 1) {
 		yPosition = windowHeight / 3
 		even = false
 	} else if (rowNumber === 2) {
 		yPosition = windowHeight / 2
 	} else if (rowNumber === 3) {
 		yPosition = (windowHeight / 3) * 2
 		even = false
 	}

  for (var i = 1; i < numGaps; i++) {
    var topX = i * (width / numGaps);
    var bottomX = i * (width / numGaps);

    // if showBass level is above .10
    if (tiltingthing > 0.10) {
    	if (even) {
				topX -= 50 * tiltingthing
				bottomX += 50 * tiltingthing
		 	} else {
		 		topX += 50 * tiltingthing
				bottomX -= 50 * tiltingthing
		 	}
    } else {
    	if (!even) {
	    	bottomX += 10
	    	topX -= 10
		 	} else {
		 		bottomX -= 10
	    	topX += 10
		 	}
    }

    var yCoord1 = yPosition - (offset);  
    var yCoord2 = yPosition + (offset);
    smooth();
    line(topX, yCoord1, bottomX, yCoord2);

  }
}