function Game() {
    this.score = 0;
    this.combo = 0;
    this.superBalls = 0;
    this.comboForSuperBall = 20


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


    /*     this.restartGame = function () {
            //Reiniciamos todo lo relacionado con el HTML
            let score_html = document.getElementById("Score")
            let combo_html = document.getElementById("Combo")
            score_html.innerText = "Score: 0"
            combo_html.innerText = "Combo: 0"
            let superBola1 = document.getElementById("superBola1")
            let superBola2 = document.getElementById("superBola2")
            let superBola3 = document.getElementById("superBola3")
            let superBola4 = document.getElementById("superBola4")
            let superBola5 = document.getElementById("superBola5")
            let superBola6 = document.getElementById("superBola6")
            let superBola7 = document.getElementById("superBola7")
    
            superBola1.style.display = "none"
            superBola2.style.display = "none"
            superBola3.style.display = "none"
            superBola4.style.display = "none"
            superBola5.style.display = "none"
            superBola6.style.display = "none"
            superBola7.style.display = "none"
    
            //Reiniciamos los atributos de game.
            this.combo = 0;4
            this.score = 0;
            this.superBalls = 0;
    
            //recolocamos al jugador en su sitio y lo curamos.
            player.health = 100
            player.direction = 0;
            player.relocatePlayer(225, 700)
    
            //Limpiamos el tablero y vaciamos el array de frutas
            let frutasHTML = document.getElementsByClassName("ball");
            let frutasArray = Array.from(frutasHTML);
            frutasArray.forEach(function (element) {
                if (element.parentNode.contains(element)) { // Verificar si el elemento es hijo de su nodo padre
                    element.parentNode.removeChild(element);
                }
            });
    
            fruits.forEach(function(fruta){
                //GRACIAS ALMA POR DECIRME QUE ERA EL TIMER ID
                clearInterval(fruta.timerId)
            })
            fruits = []
        } */
}

