const Util = require('./util.js');

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  let [x, y] = this.pos
  ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
}

MovingObject.prototype.move = function() {
  const wrapped = this.game.wrap(this.pos, this.vel, this.radius);
  let [posX, posY] = this.pos;
  let [velX, velY] = this.vel;
  let [vX, vY] = [(velX * this.game.delta / 20), (velY * this.game.delta) / 20];
  
  this.pos = wrapped ? wrapped : [posX + vX, posY + vY];
}

MovingObject.prototype.hasCollidedWith = function(OtherObject) {
  const [x1, y1] = this.pos;
  const [x2, y2] = OtherObject.pos;
  const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  return distance < this.radius + OtherObject.radius ? true : false;
}

MovingObject.prototype.collideWith = function(otherObject) {}

module.exports = MovingObject;