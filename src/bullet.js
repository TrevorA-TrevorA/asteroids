const Util = require('./util.js');
const MovingObject = require("./moving_object.js");
const Ship = require('./ship.js');

Util.inherits(Bullet, MovingObject);

function Bullet(ship, game) {
  this.ship = ship;
  this.pos = Bullet.calcPos(ship);
  this.vel = Bullet.calcVel(ship);

  MovingObject.call(this, { pos: this.pos, vel: this.vel, radius: Bullet.RADIUS,
    color: Bullet.COLOR, game: game })
}

Bullet.prototype.offscreen = function () {
  const [x, y] = this.pos;
  const rad = this.radius;
  const offscreenX = x < -rad || x > 1200 + rad;
  const offscreenY = y < -rad || y > 700 + rad;
  return offscreenX || offscreenY;
}

Bullet.prototype.move = function() {
  if (this.offscreen()) {
    this.game.remove(this);
  } else {
    let [posX, posY] = this.pos;
    let [velX, velY] = this.vel;

    this.pos = [posX + velX, posY + velY];
  }
}

Bullet.RADIUS = 4;
Bullet.COLOR = 'black';
Bullet.VELOCITY = 20;

Bullet.calcPos = function(ship) {
  const rad = 3 * ship.radius;
  const x = ship.pos[0] + rad * Math.cos(ship.angle);
  const y = ship.pos[1] + rad * Math.sin(ship.angle);
  return [x, y];
}

Bullet.calcVel = function(ship) {
  const x = Bullet.VELOCITY * Math.cos(ship.angle);
  const y = Bullet.VELOCITY * Math.sin(ship.angle);
  return [x, y];
}

module.exports = Bullet;