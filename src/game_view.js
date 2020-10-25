const Game = require('./game.js')

function GameView(ctx) {
  this.game = new Game;
  this.ctx = ctx;
  this.timeMarker = 0;
}

GameView.prototype.start = function() {
  const frame = timestamp => {
    this.game.delta = timestamp - this.timeMarker || 1;
    this.game.moveObjects();
    this.game.draw(this.ctx);
    this.game.checkCollisions();
    this.timeMarker = timestamp;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  this.bindKeys();
}

GameView.prototype.bindKeys = function() {
  const ship = this.game.ship;
  document.addEventListener('keydown', ship.shipAction.bind(ship));
}

module.exports = GameView;