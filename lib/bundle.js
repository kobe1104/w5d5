/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Game = __webpack_require__(1);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  this.bindKeyHandlers();
	  window.setInterval(
	    () => {
	      this.game.step();
	      this.game.draw(this.ctx);
	    }, 20);
	}

	GameView.prototype.bindKeyHandlers = function() {
	  let ship = this.game.ship;
	  key('w', function() {ship.power([0, -1])});
	  key('s', function() {ship.power([0, 1])});
	  key('a', function() {ship.power([-1, 0])});
	  key('d', function() {ship.power([1, 0])});
	  key('h', function() {console.log(ship);});

	}



	document.addEventListener("DOMContentLoaded",
	  function(event) {
	    let canvas = document.getElementById("game-canvas");
	    let context = canvas.getContext("2d");
	    let gv = new GameView(context);
	    gv.start();
	  }
	)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Ship = __webpack_require__(5);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4)
	const Ship = __webpack_require__(5);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    var Surrogate = function() {};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  randomVec(length) {
	    let theta = Math.random() * 2 * Math.PI;
	    x = Math.cos(theta) * length;
	    y = Math.sin(theta) * length;
	    return [x,y];
	  }



	}

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4)
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


/***/ }
/******/ ]);