function Game(player) {
  this.score = 0;
  this.combo = 0;
  this.superBalls = 0;
  this.isRunning = true
  this.comboForSuperBall = 15; // Modificar esto para que necesites menos combo por bola grande.
  this.dragonBallsCollected = 0;
  this.dragonBallsMissed = 0;
  this.OnigirisEaten = 0;
  this.OnigirisMissed = 0;
  this.iceCreams = 0;
  this.iceCreamsDodged = 0;
  this.bombsDodged = 0;
  this.bombsEaten = 0;

  this.addScore = function (type) {
    if (type === "apple") {
      let scoreToAdd = this.combo * 80;
      this.score += scoreToAdd;
    } else if (type === "bomb") {
      this.score -= 18000;
      if (this.score < 0) {
        this.score = 0;
      }
    } else if (type === "Onigiri") {
      this.score += 2000
    }
  };

  this.addSuperBall = function (fruit) {
    let combo_html = document.getElementById("Combo");
    combo_html.innerText = "Combo: 0";
    game.combo = 0;
    game.superBalls += 1;
    fruit.showBalls();

    if (this.superBalls == 7) {
      fruit.showBalls();
      this.finishGame("win");
    }
  };

  this.showLifes = function () {
    let lifes = document.getElementById("life");

    if (player.health === 3) {
      lifes.style.backgroundImage = "url('./images/life1.png')";
    } else if (player.health === 2) {
      lifes.style.backgroundImage = "url('./images/life2.png')";
    } else if (player.health === 1) {
      lifes.style.backgroundImage = "url('./images/life3.png')";
    } else if (player.health === 0) {
      lifes.style.backgroundImage = "url('./images/life4.png')";
    }
  };

  this.showStats = function () {
    let dragonBalls = document.getElementById("DragonBalls");
    let dragonBallsMissed = document.getElementById("DragonBallsMissed");
    let OnigirisEaten = document.getElementById("Onigiris");
    let OnigirisMissed = document.getElementById("OnigirisMissed");
    let iceCreams = document.getElementById("iceCreams");
    let iceCreamsDodged = document.getElementById("iceCreamsDodged");
    let bombsDodged = document.getElementById("bombsDodged");
    let bombsEaten = document.getElementById("bombsEaten");

    dragonBalls.innerText =
      "Dragon Balls Collected: " + this.dragonBallsCollected;
    dragonBallsMissed.innerText =
      "Dragon Balls Missed: " + this.dragonBallsMissed;
      OnigirisEaten.innerText = "Onigiris Eaten: " + this.OnigirisEaten;
      OnigirisMissed.innerText =
      "Onigiris Missed: " + this.OnigirisMissed;
    iceCreams.innerText = "Ice Creams Eaten: " + this.iceCreams;
    iceCreamsDodged.innerText = "Ice Creams Dodged: " + this.iceCreamsDodged;
    bombsDodged.innerText = "Bombs Dodged: " + this.bombsDodged;
    bombsEaten.innerText = "Bombs Eaten: " + this.bombsEaten;
  };



  this.finishGame = function(result){
    this.isRunning = false;
    fruitSpawnInterval = 9999999999

    let button = document.getElementById("restartGame")
    let board = document.getElementById("board");
    board.style.display = "none"

    let htmlImageDiv = document.getElementById("endGameImage")

    if(result === "win"){
      htmlImageDiv.style.backgroundImage = 'url("./images/win.png")'
    }
    else{
      htmlImageDiv.style.backgroundImage = 'url("./images/lose.png")'
    }

    button.innerText = "Play again."
    htmlImageDiv.style.display = "block"

  }
}
