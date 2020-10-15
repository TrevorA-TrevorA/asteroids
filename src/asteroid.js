const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Asteroid(pos) {
  MovingObject.call(this, { pos: pos, vel: Util.randomVector(200),
    radius: Asteroid.RADIUS, color: this.COLOR })
}

Asteroid.COLOR = '#800000';
Asteroid.RADIUS = 30;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;