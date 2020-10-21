const Game = require('./game.js')

function GameView(ctx) {
  this.game = new Game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
    this.game.checkCollisions();
  }, 20);

  this.bindKeys();
}

GameView.prototype.bindKeys = function() {
  const ship = this.game.ship;
  document.addEventListener('keydown', ship.stearShip.bind(ship));
}

module.exports = GameView;