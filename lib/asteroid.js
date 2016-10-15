const Util = require('./utils.js');
const MovingObject = require('./moving_object.js')
const Ship = require('./ship.js');

function Asteroid(options) {
  options.radius = options.radius || 30;
  options.color = options.color || "#888888";
  options.vel = options.vel || Util.randomVec(3.5);
  MovingObject.call(this, options);

}
Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    this.game.placeShip(otherObject);
  }
  // let myVel = this.vel;
  // this.vel = otherObject.vel;
  // otherObject.vel = myVel;
  // otherObject.move();
  // this.move();
}

module.exports = Asteroid;
