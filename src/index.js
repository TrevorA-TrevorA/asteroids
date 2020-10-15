const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Game = require('./game.js');

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Util = Util;
window.Game = Game;

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
})