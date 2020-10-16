const Asteroid = require('./asteroid.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 1200;
Game.DIM_Y = 700;
Game.NUM_ASTEROIDS = 30;

Game.prototype.addAsteroids = function() {
  for (let n = 0; n < Game.NUM_ASTEROIDS; n++) {
    const pos = this.randomPosition();
    const asteroid = new Asteroid(pos, this);
    asteroid.draw(ctx);
    this.asteroids.push(asteroid);
  }
}

Game.prototype.randomPosition = function() {
  const x = Math.floor(Math.random() * Game.DIM_X);
  const y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
}

Game.prototype.moveAsteroids = function() {
  this.asteroids.forEach(asteroid => asteroid.move());
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(asteroid => asteroid.draw(ctx));
}

Game.prototype.wrap = function(pos, vel, rad) {
  let [x,y] = pos;
  let offscreenX;
  let offscreenY;
  let oppX;
  let oppY;

  if (x > 1200 + rad || x < -rad) offscreenX = x;
  if (y > 700 + rad || y < -rad) offscreenY = y;
  if (!offscreenX && !offscreenY) return;

  if (offscreenX) {
    oppX = x < -rad ? 1200 + rad : -rad;
  }

  if (offscreenY) {
    oppY = y < -rad ? 700 + rad : -rad;
  }

  let [velX, velY] = vel;
  let yDiff = (1230 / Math.abs(velX)) * velY
  let xDiff = (700 / Math.abs(velY)) * velX;

  if (offscreenX && offscreenY) return [oppX, oppY];

  return offscreenX ? [oppX, y - yDiff] : [x - xDiff, oppY];
}

module.exports = Game;