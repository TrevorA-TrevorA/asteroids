const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game) {
  MovingObject.call(this, { pos: pos, vel: Util.randomVector(5),
    radius: Asteroid.getRadius(), color: Asteroid.COLOR, game: game })
}

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Bullet) {
    this.game.remove(this);
  }
}

Asteroid.getRadius = function() {
  const radii = [];

  for (let n = 5; n <= 35; n++) {
    radii.push(n);
  }

  const index = Math.floor(Math.random() * radii.length);
  return radii[index];
}

Asteroid.COLOR = '#800000';

module.exports = Asteroid;