/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nUtil.inherits(Asteroid, MovingObject);\n\nfunction Asteroid(pos, game) {\n  MovingObject.call(this, { pos: pos, vel: Util.randomVector(5),\n    radius: Asteroid.getRadius(), color: Asteroid.COLOR, game: game })\n}\n\nAsteroid.prototype.collideWith = function(otherObject) {\n  if (otherObject instanceof Bullet) {\n    this.game.remove(this);\n  }\n}\n\nAsteroid.getRadius = function() {\n  const radii = [];\n\n  for (let n = 5; n <= 35; n++) {\n    radii.push(n);\n  }\n\n  const index = Math.floor(Math.random() * radii.length);\n  return radii[index];\n}\n\nAsteroid.COLOR = '#800000';\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nUtil.inherits(Bullet, MovingObject);\n\nfunction Bullet(ship, game) {\n  this.ship = ship;\n  this.pos = Bullet.calcPos(ship);\n  this.vel = Bullet.calcVel(ship);\n\n  MovingObject.call(this, { pos: this.pos, vel: this.vel, radius: Bullet.RADIUS,\n    color: Bullet.COLOR, game: game })\n}\n\nBullet.prototype.offscreen = function () {\n  const [x, y] = this.pos;\n  const rad = this.radius;\n  const offscreenX = x < -rad || x > 1200 + rad;\n  const offscreenY = y < -rad || y > 700 + rad;\n  return offscreenX || offscreenY;\n}\n\nBullet.prototype.move = function() {\n  if (this.offscreen()) {\n    this.game.remove(this);\n  } else {\n    let [posX, posY] = this.pos;\n    let [velX, velY] = this.vel;\n    let [vX, vY] = [(velX * this.game.delta / 20), (velY * this.game.delta) / 20];\n\n    this.pos = [posX + vX, posY + vY];\n  }\n}\n\nBullet.RADIUS = 4;\nBullet.COLOR = 'black';\nBullet.VELOCITY = 20;\n\nBullet.calcPos = function(ship) {\n  const rad = 3 * ship.radius;\n  const x = ship.pos[0] + rad * Math.cos(ship.angle);\n  const y = ship.pos[1] + rad * Math.sin(ship.angle);\n  return [x, y];\n}\n\nBullet.calcVel = function(ship) {\n  const x = Bullet.VELOCITY * Math.cos(ship.angle);\n  const y = Bullet.VELOCITY * Math.sin(ship.angle);\n  return [x, y];\n}\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game() {\n  this.asteroids = [];\n  this.bullets = [];\n  this.addAsteroids();\n  this.ship = new Ship(this.randomPosition(), this);\n  this.delta;\n}\n\nGame.DIM_X = 1200;\nGame.DIM_Y = 700;\nGame.NUM_ASTEROIDS = 50;\n\nGame.prototype.addAsteroids = function() {\n  for (let n = 0; n < Game.NUM_ASTEROIDS; n++) {\n    const pos = this.randomPosition();\n    const radius = Asteroid.getRadius();\n    const asteroid = new Asteroid(pos, this);\n    asteroid.draw(ctx);\n    this.asteroids.push(asteroid);\n  }\n}\n\nGame.prototype.randomPosition = function() {\n  const x = Math.floor(Math.random() * Game.DIM_X);\n  const y = Math.floor(Math.random() * Game.DIM_Y);\n  return [x, y];\n}\n\nGame.prototype.moveObjects = function() {\n  const objects = this.allObjects();\n  objects.forEach(object => object.move());\n}\n\nGame.prototype.draw = function(ctx) {\n  const objects = this.allObjects();\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  objects.forEach(object => object.draw(ctx));\n}\n\nGame.prototype.wrap = function(pos, vel, rad) {\n  let [x,y] = pos;\n  let offscreenX;\n  let offscreenY;\n  let oppX;\n  let oppY;\n\n  if (x > 1200 + rad || x < -rad) offscreenX = x;\n  if (y > 700 + rad || y < -rad) offscreenY = y;\n  if (!offscreenX && !offscreenY) return;\n\n  if (offscreenX) {\n    oppX = x < -rad ? 1200 + rad : -rad;\n  }\n\n  if (offscreenY) {\n    oppY = y < -rad ? 700 + rad : -rad;\n  }\n\n  let [velX, velY] = vel;\n  let yDiff = ((1200 + rad) / Math.abs(velX)) * velY;\n  let xDiff = ((700 + rad) / Math.abs(velY)) * velX;\n  let adjX = this.preventDrift(x, xDiff, rad)\n  let adjY = this.preventDrift(y, yDiff, rad)\n\n  if (offscreenX && offscreenY) return [oppX, oppY];\n  if (isNaN(x) || isNaN(y)) return [0,0];\n  \n  return offscreenX ? [oppX, adjY] : [adjX, oppY];\n}\n\nGame.prototype.preventDrift = function(pos, diff, rad) {\n  if (pos - diff < -rad) {\n    adjusted = -rad;\n  } else if (pos - diff > 1200 + rad) {\n    adjusted = 1200 + rad;\n  } else {\n    adjusted = pos - diff;\n  }\n  return adjusted;\n}\n\nGame.prototype.checkCollisions = function() {\n  const objects = this.allObjects();\n\n  for (let i = 0; i < objects.length; i++) {\n    for (let j = 0; j < objects.length; j++) {\n      if (objects[i] === objects[j]) continue;\n      if (objects[i].hasCollidedWith(objects[j])) {\n        // alert('collision!');\n        objects[i].collideWith(objects[j]);\n      }\n    }\n  }\n}\n\nGame.prototype.remove = function(entity) {\n  if (entity instanceof Asteroid) {\n    const index = this.asteroids.indexOf(entity);\n    this.asteroids.splice(index, 1);\n  }\n\n  if (entity instanceof Bullet) {\n    const index = this.bullets.indexOf(entity);\n    this.bullets.splice(index, 1);\n  }\n}\n\nGame.prototype.allObjects = function() {\n  let objects = this.asteroids.concat([this.ship])\n  objects = objects.concat(this.bullets);\n  return objects;\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\nfunction GameView(ctx) {\n  this.game = new Game;\n  this.ctx = ctx;\n  this.timeMarker = 0;\n}\n\nGameView.prototype.start = function() {\n  const frame = timestamp => {\n    this.game.delta = timestamp - this.timeMarker || 1;\n    this.game.moveObjects();\n    this.game.draw(this.ctx);\n    this.game.checkCollisions();\n    this.timeMarker = timestamp;\n    requestAnimationFrame(frame);\n  }\n\n  requestAnimationFrame(frame);\n\n  this.bindKeys();\n}\n\nGameView.prototype.bindKeys = function() {\n  const ship = this.game.ship;\n  document.addEventListener('keydown', ship.shipAction.bind(ship));\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\")\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Util = Util;\nwindow.Game = Game;\nwindow.GameView = GameView;\nwindow.Ship = Ship;\nwindow.Bullet = Bullet;\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  const canvas = document.getElementById('game-canvas');\n  ctx = canvas.getContext('2d');\n  const gameView = new GameView(ctx);\n  gameView.start();\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  let [x, y] = this.pos\n  ctx.arc(x, y, this.radius, 0, 2 * Math.PI);\n  ctx.lineWidth = 5;\n  ctx.strokeStyle = 'black';\n  ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n  const wrapped = this.game.wrap(this.pos, this.vel, this.radius);\n  let [posX, posY] = this.pos;\n  let [velX, velY] = this.vel;\n  let [vX, vY] = [(velX * this.game.delta / 20), (velY * this.game.delta) / 20];\n  \n  this.pos = wrapped ? wrapped : [posX + vX, posY + vY];\n}\n\nMovingObject.prototype.hasCollidedWith = function(OtherObject) {\n  const [x1, y1] = this.pos;\n  const [x2, y2] = OtherObject.pos;\n  const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);\n\n  return distance < this.radius + OtherObject.radius ? true : false;\n}\n\nMovingObject.prototype.collideWith = function(otherObject) {}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nUtil.inherits(Ship, MovingObject);\nlet deceleration;\nlet rotation;\n\nfunction Ship(pos, game) {\n  this.velocity = 0;\n  this.direction = [0, 0];\n  this.angle = 1.5 * Math.PI;\n  this.vel = [0, 0] \n\n  MovingObject.call(this, {pos: pos, vel: this.vel, radius: Ship.RADIUS, \n    color: Ship.COLOR, game: game})\n}\n\nShip.prototype.draw = function(ctx) {\n  const xRad = Ship.XRADIUS\n  const yRad = Ship.YRADIUS;\n  rotation = this.angle;\n  let [x, y] = this.pos;\n  \n  ctx.beginPath();\n  ctx.ellipse(x, y, xRad, yRad, rotation, 0, 2 * Math.PI);\n  ctx.strokeStyle = 'black';\n  ctx.lineWidth = 5;\n  ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n  this.drawFins(ctx);\n  this.drawWindow(-20, ctx);\n  this.drawWindow(5, ctx);\n  this.drawWindow(30, ctx);\n}\n\nShip.prototype.drawFins = function(ctx) {\n  const xRad = Ship.XRADIUS;\n  const yRad = Ship.YRADIUS;\n  let [x, y] = this.pos;\n\n  let leftStartX = x + yRad * Math.sin(this.angle);\n  let leftStartY = y - yRad * Math.cos(this.angle);\n  let leftConX = leftStartX + 40 * Math.cos(this.angle + 0.75 * Math.PI);\n  let leftConY = leftStartY - 40 * Math.sin(this.angle + 0.75 * Math.PI);\n  let leftEndX = x + 90 * Math.cos(this.angle - 0.97 * Math.PI);\n  let leftEndY = y + 90 * Math.sin(this.angle - 0.97 * Math.PI);\n\n  let rightStartX = x - yRad * Math.sin(this.angle);\n  let rightStartY = y + yRad * Math.cos(this.angle);\n  let rightConX = rightStartX + 40 * Math.cos(this.angle + 0.75 * Math.PI);\n  let rightConY = rightStartY + 40 * Math.sin(this.angle + 0.75 * Math.PI);\n  let rightEndX = x + 90 * Math.cos(this.angle + 0.97 * Math.PI);\n  let rightEndY = y + 90 * Math.sin(this.angle + 0.97 * Math.PI);\n\n  ctx.beginPath();\n  ctx.moveTo(leftStartX, leftStartY);\n  ctx.quadraticCurveTo(leftConX, leftConY, leftEndX, leftEndY);\n  ctx.moveTo(rightStartX, rightStartY);\n  ctx.quadraticCurveTo(rightConX, rightConY, rightEndX, rightEndY);\n  ctx.lineWidth = 5;\n  ctx.fillStyle = '#100000';\n  ctx.stroke();\n  ctx.fill();\n}\n\nShip.prototype.drawWindow = function(dist, ctx) {\n  let [x, y] = this.pos;\n  let startX = x + dist * Math.cos(this.angle);\n  let startY = y + dist * Math.sin(this.angle);\n  ctx.beginPath();\n  ctx.fillStyle = 'black';\n  ctx.lineWidth = 2;\n  ctx.arc(startX, startY, 8, 0, 2 * Math.PI);\n  ctx.stroke();\n  ctx.fill();\n}\n\nShip.prototype.relocate = function() {\n  this.pos = this.game.randomPosition();\n  this.stop();\n}\n\nShip.prototype.calcVel = function() {\n  this.vel = this.direction.map(pos => pos * this.velocity);\n  this.vel.forEach((pos, i) => {\n    if (pos === -0) this.vel[i] = 0;\n  })\n}\n\nShip.prototype.stop = function() {\n  this.vel = [0, 0];\n  this.direction = [0, 0]\n  this.velocity = 0\n}\n\nShip.prototype.slow = function() {\n  if (this.velocity === 0) return;\n  this.velocity -= 1;\n  this.calcVel()\n}\n\nShip.prototype.calcDirection = function() {\n  this.direction = [Math.cos(this.angle), Math.sin(this.angle)];\n}\n\nShip.prototype.power = function() {\n  if (this.velocity > 15) return;\n  this.velocity += 1\n  this.calcVel();\n}\n\nShip.prototype.left = function() {\n  const smallAngle = Math.abs(Math.PI - this.angle) < 0.1;\n\n  if (smallAngle) {\n    this.angle = Math.PI;\n  } else if (this.angle < Math.PI && this.angle > 0) {\n    this.angle += 0.1;\n  } else if (this.angle > Math.PI) {\n    this.angle -= 0.1;\n  } else if (this.angle === 0) {\n    this.stop();\n    this.angle = Math.PI;\n  } else {\n    this.angle = Math.PI;\n  }\n  \n  this.power();\n  this.calcDirection();\n}\n\nShip.prototype.right = function() {\n  const circle = 2 * Math.PI;\n  const sharpNegativeAngle = Math.abs(circle - this.angle) < 0.1;\n  const sharpAngle = Math.abs(this.angle) < 0.1; \n  const smallAngle = sharpAngle || sharpNegativeAngle;\n\n  if (smallAngle) {\n    this.angle = 0;\n  } else if (this.angle < Math.PI) {\n    this.angle -= 0.1;\n  } else if (this.angle > Math.PI) {\n    this.angle += 0.1;\n  } else if (this.angle === Math.PI) {\n    this.stop();\n    this.angle = 0;\n  } else {\n    this.angle = 0;\n  }\n\n  this.calcDirection();\n  this.power();\n}\n\nShip.prototype.up = function() {\n  const upward = 1.5 * Math.PI;\n  const positive = this.angle > 0;\n  const smallAngle = Math.abs(upward - this.angle < 0.1);\n\n  if (smallAngle) {\n    this.angle = upward;\n  } else if (this.angle > upward && this.angle < 2 * Math.PI) {\n    this.angle -= 0.1;\n  } else if (this.angle < upward && this.angle > 0.5 * Math.PI) {\n    this.angle += 0.1;\n  } else if (this.angle < 0.5 * Math.PI) {\n    this.angle -= 0.1;\n  } else if (this.angle === 0.5 * Math.PI) {\n    this.stop()\n    this.angle = upward;\n  } else {\n    this.angle = upward;\n  }\n\n  this.calcDirection();\n  this.power();\n}\n\nShip.prototype.down = function() {\n  const downward = 0.5 * Math.PI;\n  const nonNegative = this.angle >= 0;\n  const smallAngle = Math.abs(downward - this.angle) < 1;\n\n  if (smallAngle) {\n    this.angle = downward;\n  } else if (this.angle > downward && this.angle < 1.5 * Math.PI) {\n    this.angle -= 0.1;\n  } else if (this.angle < downward && nonNegative) {\n    this.angle += 0.1;\n  } else if (this.angle > 1.5 * Math.PI) {\n    this.angle += 0.1;\n  } else if (this.angle === 1.5 * Math.PI) {\n    this.stop()\n    this.angle = downward;\n  } else {\n    this.angle = downward;\n  }\n\n  this.calcDirection();\n  this.power();\n}\n\nShip.prototype.moveShip = function (ev) {\n  if (this.velocity === 0) {\n    this.direction = [0, 0];\n  }\n\n  switch (ev.code) {\n    case 'ArrowLeft':\n      movement = setInterval(this.left.bind(this), 20);\n      break;\n    case 'ArrowRight':\n      movement = setInterval(this.right.bind(this), 20);\n      break;\n    case 'ArrowUp':\n      movement = setInterval(this.up.bind(this), 20);\n      break;\n    case 'ArrowDown':\n      movement = setInterval(this.down.bind(this), 20);\n      break;\n    default:\n      return;\n  }\n  return movement;\n}\n\n\nShip.prototype.decelerate = function () {\n  if (deceleration) clearInterval(deceleration);\n\n  deceleration = setInterval(this.slow.bind(this), 300);\n}\n\nShip.prototype.shipAction = function (ev) {\n  let accel;\n\n  switch (ev.code) {\n    case 'ShiftRight':\n      this.stop();\n      break;\n    case 'Space':\n      this.shoot();\n      break;\n    default:\n      accel = this.moveShip(ev);\n      break;\n  }\n  document.addEventListener('keyup', (ev) => {\n    clearInterval(accel);\n    this.decelerate.call(this);\n  })\n}\n\nShip.prototype.shoot = function() {\n  const bullet = new Bullet(this, this.game)\n  this.game.bullets.push(bullet);\n}\n\nShip.RADIUS = 20;\nShip.YRADIUS = Ship.RADIUS;\nShip.XRADIUS = 3 * Ship.RADIUS;\nShip.COLOR = '#C0C0C0'\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    childClass.prototype = Object.create(parentClass.prototype);\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVector(distance) {\n    const radians = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(radians), Math.cos(radians)], distance);\n  },\n\n  scale(vector, distance) {\n    const [x,y] = vector;\n    return [x * distance, y * distance];\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });