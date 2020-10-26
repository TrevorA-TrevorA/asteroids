const Util = require('./util.js')
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

Util.inherits(Ship, MovingObject);
let deceleration;
let rotation;

function Ship(pos, game) {
  this.velocity = 0;
  this.direction = [0, 0];
  this.angle = 1.5 * Math.PI;
  this.vel = [0, 0] 

  MovingObject.call(this, {pos: pos, vel: this.vel, radius: Ship.RADIUS, 
    color: Ship.COLOR, game: game})
}

Ship.prototype.draw = function(ctx) {
  const xRad = Ship.XRADIUS
  const yRad = Ship.YRADIUS;
  rotation = this.angle;
  let [x, y] = this.pos;
  
  ctx.beginPath();
  ctx.ellipse(x, y, xRad, yRad, rotation, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
  this.drawFins(ctx);
  this.drawWindow(-20, ctx);
  this.drawWindow(5, ctx);
  this.drawWindow(30, ctx);
}

Ship.prototype.drawFins = function(ctx) {
  const xRad = Ship.XRADIUS;
  const yRad = Ship.YRADIUS;
  let [x, y] = this.pos;

  let leftStartX = x + yRad * Math.sin(this.angle);
  let leftStartY = y - yRad * Math.cos(this.angle);
  let leftConX = leftStartX + 40 * Math.cos(this.angle + 0.75 * Math.PI);
  let leftConY = leftStartY - 40 * Math.sin(this.angle + 0.75 * Math.PI);
  let leftEndX = x + 90 * Math.cos(this.angle - 0.97 * Math.PI);
  let leftEndY = y + 90 * Math.sin(this.angle - 0.97 * Math.PI);

  let rightStartX = x - yRad * Math.sin(this.angle);
  let rightStartY = y + yRad * Math.cos(this.angle);
  let rightConX = rightStartX + 40 * Math.cos(this.angle + 0.75 * Math.PI);
  let rightConY = rightStartY + 40 * Math.sin(this.angle + 0.75 * Math.PI);
  let rightEndX = x + 90 * Math.cos(this.angle + 0.97 * Math.PI);
  let rightEndY = y + 90 * Math.sin(this.angle + 0.97 * Math.PI);

  ctx.beginPath();
  ctx.moveTo(leftStartX, leftStartY);
  ctx.quadraticCurveTo(leftConX, leftConY, leftEndX, leftEndY);
  ctx.moveTo(rightStartX, rightStartY);
  ctx.quadraticCurveTo(rightConX, rightConY, rightEndX, rightEndY);
  ctx.lineWidth = 5;
  ctx.fillStyle = '#100000';
  ctx.stroke();
  ctx.fill();
}

Ship.prototype.drawWindow = function(dist, ctx) {
  let [x, y] = this.pos;
  let startX = x + dist * Math.cos(this.angle);
  let startY = y + dist * Math.sin(this.angle);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.lineWidth = 2;
  ctx.arc(startX, startY, 8, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.stop();
}

Ship.prototype.calcVel = function() {
  this.vel = this.direction.map(pos => pos * this.velocity);
  this.vel.forEach((pos, i) => {
    if (pos === -0) this.vel[i] = 0;
  })
}

Ship.prototype.stop = function() {
  this.vel = [0, 0];
  this.direction = [0, 0]
  this.velocity = 0
}

Ship.prototype.slow = function() {
  if (this.velocity === 0) return;
  this.velocity -= 1;
  this.calcVel()
}

Ship.prototype.calcDirection = function() {
  this.direction = [Math.cos(this.angle), Math.sin(this.angle)];
}

Ship.prototype.power = function() {
  if (this.velocity > 15) return;
  this.velocity += 1
  this.calcVel();
}

Ship.prototype.left = function() {
  const smallAngle = Math.abs(Math.PI - this.angle) < 0.1;

  if (smallAngle) {
    this.angle = Math.PI;
  } else if (this.angle < Math.PI && this.angle > 0) {
    this.angle += 0.1;
  } else if (this.angle > Math.PI) {
    this.angle -= 0.1;
  } else if (this.angle === 0) {
    this.stop();
    this.angle = Math.PI;
  } else {
    this.angle = Math.PI;
  }
  
  this.power();
  this.calcDirection();
}

Ship.prototype.right = function() {
  const circle = 2 * Math.PI;
  const sharpNegativeAngle = Math.abs(circle - this.angle) < 0.1;
  const sharpAngle = Math.abs(this.angle) < 0.1; 
  const smallAngle = sharpAngle || sharpNegativeAngle;

  if (smallAngle) {
    this.angle = 0;
  } else if (this.angle < Math.PI) {
    this.angle -= 0.1;
  } else if (this.angle > Math.PI) {
    this.angle += 0.1;
  } else if (this.angle === Math.PI) {
    this.stop();
    this.angle = 0;
  } else {
    this.angle = 0;
  }

  this.calcDirection();
  this.power();
}

Ship.prototype.up = function() {
  const upward = 1.5 * Math.PI;
  const positive = this.angle > 0;
  const smallAngle = Math.abs(upward - this.angle < 0.1);

  if (smallAngle) {
    this.angle = upward;
  } else if (this.angle > upward && this.angle < 2 * Math.PI) {
    this.angle -= 0.1;
  } else if (this.angle < upward && this.angle > 0.5 * Math.PI) {
    this.angle += 0.1;
  } else if (this.angle < 0.5 * Math.PI) {
    this.angle -= 0.1;
  } else if (this.angle === 0.5 * Math.PI) {
    this.stop()
    this.angle = upward;
  } else {
    this.angle = upward;
  }

  this.calcDirection();
  this.power();
}

Ship.prototype.down = function() {
  const downward = 0.5 * Math.PI;
  const nonNegative = this.angle >= 0;
  const smallAngle = Math.abs(downward - this.angle) < 1;

  if (smallAngle) {
    this.angle = downward;
  } else if (this.angle > downward && this.angle < 1.5 * Math.PI) {
    this.angle -= 0.1;
  } else if (this.angle < downward && nonNegative) {
    this.angle += 0.1;
  } else if (this.angle > 1.5 * Math.PI) {
    this.angle += 0.1;
  } else if (this.angle === 1.5 * Math.PI) {
    this.stop()
    this.angle = downward;
  } else {
    this.angle = downward;
  }

  this.calcDirection();
  this.power();
}

Ship.prototype.moveShip = function (ev) {
  if (this.velocity === 0) {
    this.direction = [0, 0];
  }

  switch (ev.code) {
    case 'ArrowLeft':
      movement = setInterval(this.left.bind(this), 20);
      break;
    case 'ArrowRight':
      movement = setInterval(this.right.bind(this), 20);
      break;
    case 'ArrowUp':
      movement = setInterval(this.up.bind(this), 20);
      break;
    case 'ArrowDown':
      movement = setInterval(this.down.bind(this), 20);
      break;
    default:
      return;
  }
  return movement;
}


Ship.prototype.decelerate = function () {
  if (deceleration) clearInterval(deceleration);

  deceleration = setInterval(this.slow.bind(this), 300);
}

Ship.prototype.shipAction = function (ev) {
  let accel;

  switch (ev.code) {
    case 'ShiftRight':
      this.stop();
      break;
    case 'Space':
      this.shoot();
      break;
    default:
      accel = this.moveShip(ev);
      break;
  }
  document.addEventListener('keyup', (ev) => {
    clearInterval(accel);
    this.decelerate.call(this);
  })
}

Ship.prototype.shoot = function() {
  const bullet = new Bullet(this, this.game)
  this.game.bullets.push(bullet);
}

Ship.RADIUS = 20;
Ship.YRADIUS = Ship.RADIUS;
Ship.XRADIUS = 3 * Ship.RADIUS;
Ship.COLOR = '#C0C0C0'

module.exports = Ship;