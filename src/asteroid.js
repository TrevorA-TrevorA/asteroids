const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Asteroid(pos) {
  this.COLOR = '#800000';
  this.RADIUS = 30;

  MovingObject.call(this, { pos: pos, vel: Util.randomVector(200),
    radius: this.RADIUS, color: this.COLOR })
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;