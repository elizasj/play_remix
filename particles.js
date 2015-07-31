// A simple Particle class
window.Particle = function(position, acceleration) {
  this.acceleration = createVector(0, acceleration || 0.15);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration/10);
  this.position.add(this.velocity);
  this.lifespan -= 5;
};

// Method to display
Particle.prototype.display = function() {
  stroke(100, this.lifespan);
  strokeWeight(0);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 4, 4);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
   return true;
  } else {
   return false;
  }
};

window.ParticleSystem = function() {
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(acceleration) {
  var x = random(0, windowWidth)
  var y = random(0, windowHeight)
  var position = createVector(x, y)

  this.particles.push(new Particle(position, acceleration));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};