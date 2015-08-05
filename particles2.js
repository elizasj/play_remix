// Particles along the path
function ParticleLines(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.65;
  this.lifespan = 200.0;
}

ParticleLines.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--*3;
}

// Draw particle and connect it with a line
// Draw a line to another
ParticleLines.prototype.display = function(other) {
  smooth();
  stroke(42, 0, 144, this.lifespan);
  strokeWeight(1);
  fill(42, 0, 144, this.lifespan);

  smooth();
  ellipse(this.position.x,this.position.y, 3, 3);    
  // If we need to draw a line
  if (other) {
  	smooth();
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}