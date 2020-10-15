const Util = require('./util.js');

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  let [x, y] = this.pos
  ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#800000';
  ctx.fill();
}

MovingObject.prototype.move = function() {
  let [posX, posY] = this.pos;
  let [velX, velY] = this.vel;
  
  this.pos = [posX + velX, posY + velY];
}

module.exports = MovingObject;