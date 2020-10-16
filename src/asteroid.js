const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Asteroid(pos, game) {
  MovingObject.call(this, { pos: pos, vel: Util.randomVector(5),
    radius: Asteroid.RADIUS, color: this.COLOR, game: game })
}

Asteroid.COLOR = '#800000';
Asteroid.RADIUS = 30;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;