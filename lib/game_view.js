Game = require('./game.js');

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
