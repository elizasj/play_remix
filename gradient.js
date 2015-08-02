function setGradient(x, y, w, h, c1, c2, axis, backgroundPad) {

  noFill();
 
  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
			var inter = map(i, y, y + h, 1, 0);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(y, i, x+w, i);
    }
  } 

}

//create two gradients
//each with one solid color & one trasparency
