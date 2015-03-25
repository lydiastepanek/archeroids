(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
    this.ships = [];
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
  };

  var DIM_X = 500;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 5;
  asteroids = []

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(Asteroids.Util.randomPos(500),this);
    this.ships.push(ship);
    return ship
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
    return bullet
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = Asteroids.Util.randomPos(500);
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (el) {
      el.draw(ctx);
    })
  }

  Game.prototype.moveObjects = function (ctx) {
    this.allObjects().forEach(function (el) {
      el.move();
    })
  }

  Game.wrap = function (pos) {
    if (pos[0] < 0) {
      pos[0] = DIM_X;
    } else if (pos[0] > DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = DIM_Y;
    } else if (pos[1] > DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  }

  Game.prototype.checkCollisions = function(){
    // var objects = this.allObjects();
    // for(var i = 0; i<objects.length - 1; i++){
    //   for( var j = i + 1; j < objects.length; j++){
    //     if(objects[i].isCollidedWith(objects[j])){
    //       // objects[i].collideWith(objects[j])
    //       if (objects[j] instanceof Asteroids.Ship) {
    //         this.ships[0].relocate();
    //         //this.ships[0].power([1,1]);
    //       }
    //     };
    //   };
    // };
    var bullets = this.bullets
    var asteroids = this.asteroids
    for(var i = 0; i < bullets.length; i++){
      for( var j = 0; j < asteroids.length; j++){
        if(bullets[i].isCollidedWith(asteroids[j])){
          bullets[i].collideWith(asteroids[j])
        }
      }
    }
  }

  Game.prototype.step = function(ctx){
    this.moveObjects(ctx);
    this.checkCollisions();
  }

  Game.prototype.allObjects = function(){
    return this.asteroids.concat(this.bullets).concat(this.ships)
  }

  // Game.prototype.removeAsteroid = function(asteroid) {
  //   var ast_index = this.asteroids.indexOf(asteroid)
  //   this.asteroids.splice(ast_index,1)
  //   return this.asteroids
  // }
  //
  // Game.prototype.removeShip = function(ship) {
  //   var ship_index = this.ships.indexOf(ship)
  //   this.ships.splice(ship_index,1)
  //   return this.ships
  // }
  //
  // Game.prototype.removeBullet = function(bullet) {
  //   var bullet_index = this.bullets.indexOf(bullet)
  //   this.bullets.splice(bullet_index,1)
  //   return this.bullets
  // }

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var ast_index = this.asteroids.indexOf(obj)
      this.asteroids.splice(ast_index,1)
    } else if (obj instanceof Asteroids.Ship) {
      // var ship_index = this.ships.indexOf(obj)
      // this.ships.splice(ship_index,1)
    } else if (obj instanceof Asteroids.Bullet) {
      var bullet_index = this.bullets.indexOf(obj)
      this.bullets.splice(bullet_index,1)
    }
  }

})();