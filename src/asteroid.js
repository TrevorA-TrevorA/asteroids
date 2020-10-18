const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Asteroid(pos, game) {
  MovingObject.call(this, { pos: pos, vel: Util.randomVector(5),
    radius: Asteroid.getRadius(), color: this.COLOR, game: game })
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

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;