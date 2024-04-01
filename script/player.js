function Player(x, y, health, board) {
  this.self = this;
  this.x = x;
  this.y = y;
  this.health = health;
  this.speed = 5;
  this.direction = 0;
  this.width = 100;
  this.height = 100;

  this.sprite = document.createElement("div");
  this.velocityY = 0;

  this.insertPlayer = function () {
    this.sprite.setAttribute("id", "player");
    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
    board.appendChild(this.sprite);
  };

  this.move = function () {
    let moveInX = this.x + this.speed * this.direction;
    // Verificar límites horizontales como antes
    if (moveInX >= 0 && moveInX <= 420) {
      this.x = moveInX;
      this.sprite.style.left = this.x + "px";
    }

    this.sprite.style.top = this.y + "px";
  };

  this.relocatePlayer = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite.style.left = x + "px";
    this.sprite.style.top = y + "px";
  };

  this.transformar = function (game) {
    if (game.score >= 0 && game.score < 2000) {
      this.sprite.style.backgroundImage = "url('./images/goku1.png')";
    } else if (game.score >= 2000 && game.score < 6000) {
      this.sprite.style.backgroundImage = "url('./images/goku2.png')";
    } else if (game.score >= 6000 && game.score < 18000) {
      this.sprite.style.backgroundImage = "url('./images/goku3.png')";
    } else if (game.score >= 18000 && game.score < 33000) {
      this.sprite.style.backgroundImage = "url('./images/goku4.png')";
    } else if (game.score >= 33000 && game.score < 50000) {
      this.sprite.style.backgroundImage = "url('./images/goku5.png')";
    } else if (game.score >= 50000 && game.score < 75000) {
      this.sprite.style.backgroundImage = "url('./images/goku6.png')";
    } else {
      this.sprite.style.backgroundImage = "url('./images/goku7.png')";
    }
  };
}
