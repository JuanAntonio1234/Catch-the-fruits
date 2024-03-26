function Fruit(x, y, board, fruits, game, type, player) {
    let self = this
    this.type = type
    this.x = x
    this.y = y
    this.speed = 2
    this.direction = 1
    this.width = 50
    this.height = 50
    this.sprite = document.createElement('div')

    this.insertFruit = function () {
        if (this.type == "fruit") {
            this.sprite.setAttribute('class', 'ball fruit')
        } else if (this.type == "bomb") {
            this.sprite.setAttribute('class', 'ball bomb')
        }
        else if (this.type == "goldenApple") {
            this.sprite.setAttribute("class", "ball goldenApple")
        }
        else if (this.type == "iceCream") {
            this.sprite.setAttribute("class", "ball iceCream")
        }

        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        board.appendChild(this.sprite)
    }

    this.move = function () {
        self.checkCollision()
        let moveInY = self.y + self.speed * self.direction
        if (moveInY >= 0 && moveInY <= 750) {
            self.y = moveInY
            self.sprite.style.top = self.y + 'px'
        }
        if (moveInY >= 750) {
            self.removeFruit()
        }
    }
    this.removeFruit = function (idx) {
        if (this.y + 10 >= 750) {
            fruits.shift()
            if (this.type === "fruit") {
                let comboHtml = document.getElementById("Combo")
                comboHtml.innerText = ("Combo: 0")
                game.combo = 0;
            }

        }
        else {
            fruits.splice(idx, 1)
        }

        clearInterval(this.timerId)
        board.removeChild(this.sprite)
    }

    this.checkCollision = function () {
        let score_html = document.getElementById("Score")
        let combo_html = document.getElementById("Combo")
        if (this.x < player.x + player.width &&
            this.y < player.y + player.height &&
            this.x + this.width > player.x &&
            this.y + this.height > player.y) {

            if (this.type == "fruit") {
                game.combo += 1
                game.addScore("apple")

                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.combo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type == "bomb") {
                player.health -= 60;
                if(player.health <= 0){
                    alert("You lost :(\nClick OK to play again.")
                    this.showBalls()
                    this.restartGame()
                }
                game.combo = 0
                game.addScore("bomb")

                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.combo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type === "goldenApple") {
                game.addScore("golden_apple")
                if (player.health < 100) {
                    player.health += 25
                }
                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.combo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type === "iceCream") {
                if (player.speed > 2) {
                    player.speed -= 2
                    setTimeout(() => {
                        player.speed += 2;
                    }, 4000);
                }
                this.removeFruit(fruits.indexOf(this))
            }

            //comprobación superBola
            
            if (game.combo === 1) {
                let combo_html = document.getElementById("Combo")
                combo_html.innerText = "Combo: 0"
                game.combo = 0;
                game.superBalls += 1
                this.showBalls()

                if (game.superBalls == 7) {
                    this.showBalls()
                    setTimeout(function(){
                        alert("You WON !!!\n Press Ok to play again.")
                        setTimeout(function(){
                            fruits[0].restartGame()
                        }, 10)
                    }, 20)
                    
                    

                }
            }
        }
    }

    this.timerId = setInterval(this.move, 5)


    this.restartGame = function () {
        //Ponemos en 0 el score y el combo del html.
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
        game.combo = 0;
        game.score = 0;
        game.superBalls = 0;

        //recolocamos al jugador en su sitio y lo curamos.
        player.health = 100
        player.direction = 0;
        player.relocatePlayer(225, 700)

        //Limpiamos el tablero y vaciamos el array de frutas
        let frutasHTML = document.getElementsByClassName("ball");
let frutasArray = Array.from(frutasHTML);

frutasArray.forEach(function(element) {
    if (element.parentNode.contains(element)) { // Verificar si el elemento es hijo de su nodo padre
        element.parentNode.removeChild(element);
    }
});

        fruits = []
    }



    this.deleteAllFruits = function (fruits) {
        fruits = [];
    }

    this.showBalls = function(){
        let superBalls = game.superBalls;

        for(let i = 1; i < superBalls + 1; i ++){
            let superBola = "superBola" + i
            let bola = document.getElementById(superBola)
            bola.style.display = "block";
        }
    }
}