const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Util = Util;

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
})