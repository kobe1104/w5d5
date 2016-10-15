const Util = require('./utils.js');
const MovingObject = require('./moving_object.js')
function Ship(options) {
  options.radius = options.radius || 15;
  options.color = options.color || "#FF0000";
  options.vel = [0, 0];
  MovingObject.call(this, options);

}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function(pos) {
  this.pos = pos;
}

Ship.prototype.power = function(impulse) {
  let vel_x = impulse[0] + this.vel[0];
  let vel_y = impulse[1] + this.vel[1];
  this.vel = [vel_x, vel_y];
}

module.exports = Ship;
