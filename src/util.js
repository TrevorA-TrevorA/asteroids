const Util = {
  inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  randomVector(distance) {
    const radians = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(radians), Math.cos(radians)], distance);
  },

  scale(vector, distance) {
    const [x,y] = vector;
    return [x * distance, y * distance];
  }
}

module.exports = Util;