const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');
const Ship = require('./ship.js');

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Util = Util;
window.Game = Game;
window.GameView = GameView;
window.Ship = Ship;

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start();
})