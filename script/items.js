function Fruit(x, y, board, fruits, game, type, player) {
  let self = this;
  this.type = type;
  this.x = x;
  this.y = y;
  this.speed = 2.5;
  this.direction = 1;
  this.width = 50;
  this.height = 50;
  this.sprite = document.createElement("div");

  this.insertFruit = function () {
    if (this.type == "fruit") {
      this.sprite.setAttribute("class", "ball fruit");
    } else if (this.type == "bomb") {
      this.sprite.setAttribute("class", "ball bomb");
    } else if (this.type == "Onigiri") {
      this.sprite.setAttribute("class", "ball Onigiri");
    } else if (this.type == "iceCream") {
      this.sprite.setAttribute("class", "ball iceCream");
    }

    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
    board.appendChild(this.sprite);
  };

  this.move = function () {
    self.checkCollision();
    let moveInY = self.y + self.speed * self.direction;
    if (moveInY >= 0 && moveInY <= 750) {
      self.y = moveInY;
      self.sprite.style.top = self.y + "px";
    }
    if (moveInY >= 750 && game.isRunning) {
      switch (self.type) {
        case "fruit":
          game.dragonBallsMissed++;
          break;
        case "bomb":
          game.bombsDodged++;
          break;
        case "iceCream":
          game.iceCreamsDodged++;
          break;
        case "Onigiri":
          game.OnigirisMissed++;
          break;
      }
      self.removeFruit();
      game.showStats();
    }
  };

  this.removeFruit = function (idx) {
    if (this.y + 10 >= 750) {
      fruits.shift();
      if (this.type === "fruit") {
        let comboHtml = document.getElementById("Combo");
        comboHtml.innerText = "Combo: 0";
        game.combo = 0;
      }
    } else {
      fruits.splice(idx, 1);
    }

    clearInterval(this.timerId);
    board.removeChild(this.sprite);
  };

  this.checkCollision = function () {
    let score_html = document.getElementById("Score");
    let combo_html = document.getElementById("Combo");
    if (
      this.x < player.x + player.width &&
      this.y < player.y + player.height &&
      this.x + this.width > player.x &&
      this.y + this.height > player.y
    ) {
      if (this.type == "fruit" && game.isRunning) {
        game.combo += 1;
        game.addScore("apple");
        game.dragonBallsCollected++;
        score_html.innerText = "Score: " + game.score;

        combo_html.innerText = "Combo: " + game.combo;
        this.removeFruit(fruits.indexOf(this));
      } else if (this.type == "bomb" && game.isRunning) {
        game.bombsEaten++;
        player.health--;
        game.showLifes();
        if (game.superBalls > 0) {
          game.superBalls--;
          this.showBalls();
        }
        game.combo = 0;
        game.addScore("bomb");

        score_html.innerText = "Score: " + game.score;

        combo_html.innerText = "Combo: " + game.combo;
        this.removeFruit(fruits.indexOf(this));
        if (player.health <= 0) {
          this.showBalls();
          game.finishGame("lose");
        }
      } else if (this.type === "Onigiri" && game.isRunning) {
        game.OnigirisEaten++;
        game.addScore("Onigiri");
        if (player.health < 3) {
          player.health++;
          game.showLifes();
        }

        score_html.innerText = "Score: " + game.score;
        combo_html.innerText = "Combo: " + game.combo;
        this.removeFruit(fruits.indexOf(this));
      } else if (this.type === "iceCream" && game.isRunning) {
        game.iceCreams++;
        if (player.speed > 2) {
          player.speed -= 2;
          setTimeout(() => {
            player.speed += 2;
          }, 4000);
        }
        this.removeFruit(fruits.indexOf(this));
      }

      //Transformación goku
      player.transformar(game);

      //comprobación superBola
      if (game.combo === game.comboForSuperBall) {
        game.addSuperBall(fruits[0]);
      }

      game.showStats();
    }
  };

  this.restartGame = function () {
    let htmlImageDiv = document.getElementById("endGameImage")
    htmlImageDiv.style.display = "none"

    let board = document.getElementById("board");
    board.style.display = "block"

    fruitSpawnInterval = 400

    //Reiniciamos todo lo relacionado con el HTML
    let score_html = document.getElementById("Score");
    let combo_html = document.getElementById("Combo");
    score_html.innerText = "Score: 0";
    combo_html.innerText = "Combo: 0";
    let superBola1 = document.getElementById("superBola1");
    let superBola2 = document.getElementById("superBola2");
    let superBola3 = document.getElementById("superBola3");
    let superBola4 = document.getElementById("superBola4");
    let superBola5 = document.getElementById("superBola5");
    let superBola6 = document.getElementById("superBola6");
    let superBola7 = document.getElementById("superBola7");
    let life = document.getElementById("life");

    superBola1.style.display = "none";
    superBola2.style.display = "none";
    superBola3.style.display = "none";
    superBola4.style.display = "none";
    superBola5.style.display = "none";
    superBola6.style.display = "none";
    superBola7.style.display = "none";
    life.style.backgroundImage = "url('./images/life1.png')";

    //Reiniciamos los atributos de game.
    game.combo = 0;
    game.score = 0;
    game.superBalls = 0;
    game.dragonBallsCollected = 0;
    game.dragonBallsMissed = 0;
    game.OnigirisEaten = 0;
    game.OnigirisMissed = 0;
    game.iceCreams = 0;
    game.iceCreamsDodged = 0;
    game.bombsDodged = 0;
    game.bombsEaten = 0;

    game.showStats();

    //recolocamos al jugador en su sitio y lo curamos.
    player.sprite.style.backgroundImage = "url('./images/goku1.png')";
    player.health = 3;
    player.direction = 0;
    player.relocatePlayer(225, 700);

    //Limpiamos el tablero y vaciamos el array de frutas
    let frutasHTML = document.getElementsByClassName("ball");
    let frutasArray = Array.from(frutasHTML);
    frutasArray.forEach(function (element) {
      if (element.parentNode.contains(element)) {
        // Verificar si el elemento es hijo de su nodo padre
        element.parentNode.removeChild(element);
      }
    });

    fruits.forEach(function (fruta) {
      //GRACIAS ALMA POR DECIRME QUE ERA EL TIMER ID
      clearInterval(fruta.timerId);
    });
    fruits = [];
    game.isRunning = true;
  };

  this.showBalls = function () {
    let superBola1 = document.getElementById("superBola1");
    let superBola2 = document.getElementById("superBola2");
    let superBola3 = document.getElementById("superBola3");
    let superBola4 = document.getElementById("superBola4");
    let superBola5 = document.getElementById("superBola5");
    let superBola6 = document.getElementById("superBola6");
    let superBola7 = document.getElementById("superBola7");

    superBola1.style.display = "none";
    superBola2.style.display = "none";
    superBola3.style.display = "none";
    superBola4.style.display = "none";
    superBola5.style.display = "none";
    superBola6.style.display = "none";
    superBola7.style.display = "none";

    let superBalls = game.superBalls;

    for (let i = 1; i < superBalls + 1; i++) {
      let superBola = "superBola" + i;
      let bola = document.getElementById(superBola);
      bola.style.display = "block";
    }
  };

  this.timerId = setInterval(this.move, 5);
}
