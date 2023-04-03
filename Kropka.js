function Kropka(x, y, posx, posy) {
  if(posx === undefined) {
    this.pos = createVector(random(width), random(height));
  } else {
    this.pos = createVector(posx, posy);
  }
  this.vel = createVector();
  this.acc = createVector();
  this.target = createVector(x, y);
  this.maxspeed = 5;
}

Kropka.prototype.render = function() {
  stroke(255);
  strokeWeight(10);
  point(this.pos.x, this.pos.y);
}

Kropka.prototype.update = function() {
  this.acc = p5.Vector.add(this.seek());
  this.vel.add(this.acc)
  this.pos.add(this.vel);

  this.render();
}

Kropka.prototype.seek = function() {
  var desired = p5.Vector.sub(this.target, this.pos);
  desired.mult(0.05);
  desired.limit(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.vel);
  return steer;
}

Kropka.prototype.spawn = function(x, y) {
  return new Kropka(x, y, this.pos.x, this.pos.y);
}
