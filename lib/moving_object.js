function MovingObject(options) {
  this.pos = options.pos || [0,0];
  this.vel = options.vel || [0,0];
  this.radius = options.radius || 5;
  this.color = options.color || "#FF0000";
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath()
  ctx.fillStyle = this.color;
  ctx.arc(...this.pos, this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos = this.game.wrap([this.pos[0] + this.vel[0],
              this.pos[1] + this.vel[1]]);
  return this.pos;
}

MovingObject.prototype.isCollideWith = function(otherObject) {
  let dx = this.pos[0] - otherObject.pos[0];
  let dy = this.pos[1] - otherObject.pos[1];
  let distance = Math.pow(dx * dx + dy * dy, .5);
  if (distance < this.radius + otherObject.radius) {
    return true;
  }
  return false;
}



module.exports = MovingObject;
