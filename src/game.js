const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js')

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
}

Game.DIM_X = 1200;
Game.DIM_Y = 700;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (let n = 0; n < Game.NUM_ASTEROIDS; n++) {
    const pos = this.randomPosition();
    const radius = Asteroid.getRadius();
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

Game.prototype.moveObjects = function() {
  const objects = this.allObjects();
  objects.forEach(object => object.move());
}

Game.prototype.draw = function(ctx) {
  const objects = this.allObjects();
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  objects.forEach(object => object.draw(ctx));
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
  let yDiff = ((1200 + rad) / Math.abs(velX)) * velY;
  let xDiff = ((700 + rad) / Math.abs(velY)) * velX;
  let adjX = this.preventDrift(x, xDiff, rad)
  let adjY = this.preventDrift(y, yDiff, rad)

  if (offscreenX && offscreenY) return [oppX, oppY];
  
  return offscreenX ? [oppX, adjY] : [adjX, oppY];
}

Game.prototype.preventDrift = function(pos, diff, rad) {
  if (pos - diff < -rad) {
    adjusted = -rad;
  } else if (pos - diff > 1200 + rad) {
    adjusted = 1200 + rad;
  } else {
    adjusted = pos - diff;
  }
  return adjusted;
}

Game.prototype.checkCollisions = function() {
  const objects = this.allObjects();

  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (objects[i] === objects[j]) continue;
      if (objects[i].hasCollidedWith(objects[j])) {
        // alert('collision!');
        objects[i].collideWith(objects[j]);
      }
    }
  }
}

Game.prototype.remove = function(asteroidIndex) {
  this.asteroids.splice(asteroidIndex, 1);
}

Game.prototype.allObjects = function() {
  const objects = this.asteroids.concat([this.ship])
  return objects;
}

module.exports = Game;