const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const NUM_ASTEROIDS = 8;
const DIM_X = 800;
const DIM_Y = 600;

function Game() {
  this.asteroids = [];
  this.ship = new Ship({
    pos: [DIM_X / 2, DIM_Y / 2],
    game: this
  })
  this.addAsteroids();
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship);
}

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    let opts = {
      pos: this.randomPosition(),
      game: this
    };
    this.asteroids.push(new Asteroid(opts));
  }
  console.log(this.asteroids);
}
Game.prototype.placeShip = function() {
  this.ship.relocate(this.randomPosition());
  this.ship.vel = [0,0];
}

Game.prototype.randomPosition = function() {
  let x = Math.random() * DIM_X;
  let y = Math.random() * DIM_Y;

  return [x, y];
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, DIM_X, DIM_Y);
  this.allObjects().forEach(
    (object) => {
      object.draw(ctx);
    }
  );
}

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(
    (obj) => { obj.move() }
  );
}

Game.prototype.checkCollisions = function() {
  let objects = this.allObjects();
  for (var left = 0; left < objects.length; left++) {
    for (var right = left + 1; right < objects.length; right++) {
      if (objects[left].isCollideWith(objects[right])) {
        // alert("Collision.");
        objects[left].collideWith(objects[right]);
      }
    }
  }
}

Game.prototype.remove = function(asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.wrap = function(pos) {
  let x = (pos[0] + DIM_X) % DIM_X;
  let y = (pos[1] + DIM_Y) % DIM_Y;
  return [x, y];
}

module.exports = Game;
