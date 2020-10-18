const Game = require('./game.js')

function GameView(ctx) {
  this.game = new Game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.moveAsteroids();
    this.game.draw(this.ctx);
    this.game.checkCollisions();
  }, 20);
}

module.exports = GameView;