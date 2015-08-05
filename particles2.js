// Particles along the path
function ParticleLines(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

ParticleLines.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
ParticleLines.prototype.display = function(other) {
  stroke(230, 4, 10, this.lifespan);
  strokeWeight(1);
  fill(255, this.lifespan);

  ellipse(this.position.x,this.position.y, 5, 5);    
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}