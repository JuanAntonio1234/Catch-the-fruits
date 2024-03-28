function Game(player) {
    this.score = 0;
    this.combo = 0;
    this.superBalls = 0;
    this.comboForSuperBall = 10 // Modificar esto para que necesites menos combo por bola grande.
    this.dragonBallsCollected = 0;
    this.dragonBallsMissed = 0;
    this.goldenApplesEaten = 0;
    this.goldenApplesMissed = 0;
    this.iceCreams = 0;
    this.iceCreamsDodged = 0;
    this.bombsDodged = 0;
    this.bombsEaten = 0;


    this.addScore = function (type) {

        if (type === "apple") {
            let scoreToAdd = 100 + this.combo * 20;
            this.score += scoreToAdd
        }
        else if (type === "bomb") {
            this.score -= 4000;
            if (this.score < 0) {
                this.score = 0;
            }
        }
        else if (type === "golden_apple") {
            this.score += 2000 + this.combo * 15;
        }
    }

    this.addSuperBall = function (fruit) {

        let combo_html = document.getElementById("Combo")
        combo_html.innerText = "Combo: 0"
        game.combo = 0;
        game.superBalls += 1
        fruit.showBalls()

        if (this.superBalls == 7) {
            fruit.showBalls()
            setTimeout(function () {
                alert("You WON !!!\n Press Ok to play again.")
                setTimeout(function () {
                    fruit.restartGame()
                }, 20)
            }, 50)
        }

    }


    this.showLifes = function(){
        let lifes = document.getElementById("life")

        if(player.health === 3){
            lifes.style.backgroundImage = "url('./images/life1.png')"
        }
        else if(player.health === 2){
            lifes.style.backgroundImage = "url('./images/life2.png')"
        }
        else if(player.health === 1){
            lifes.style.backgroundImage = "url('./images/life3.png')"
        }
        else if(player.health === 3){
            lifes.style.backgroundImage = "url('./images/life4.png')"
        }
    }

    this.showStats = function(){
        let dragonBalls = document.getElementById("DragonBalls")
        let dragonBallsMissed = document.getElementById("DragonBallsMissed")
        let goldenApples = document.getElementById("goldenApples")
        let goldenApplesMissed = document.getElementById("goldenApplesMissed")
        let iceCreams = document.getElementById("iceCreams")
        let iceCreamsDodged = document.getElementById("iceCreamsDodged")
        let bombsDodged = document.getElementById("bombsDodged")
        let bombsEaten = document.getElementById("bombsEaten")

        dragonBalls.innerText = "Dragon Balls Collected: " + this.dragonBallsCollected
        dragonBallsMissed.innerText = "Dragon Balls Missed: " + this.dragonBallsMissed
        goldenApples.innerText = "Golden Apples Eaten: " + this.goldenApplesEaten;
        goldenApplesMissed.innerText = "Golden Apples Missed: " + this.goldenApplesMissed;
        iceCreams.innerText = "Ice Creams Eaten: " + this.iceCreams;
        iceCreamsDodged.innerText = "Ice Creams Dodged: " + this.iceCreamsDodged;
        bombsDodged.innerText = "Bombs Dodged: " + this.bombsDodged;
        bombsEaten.innerText = "Bombs Eaten: " + this.bombsEaten
    }

}
