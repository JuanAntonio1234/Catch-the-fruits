function Fruit(x, y, board, fruits, game, type, player) {
    let self = this
    this.type = type
    this.x = x
    this.y = y
    this.speed = 2
    this.direction = 1
    this.width = 50
    this.height = 50
    this.player = player
    this.sprite = document.createElement('div')

    this.insertFruit = function () {
        if (this.type == "fruit") {
            this.sprite.setAttribute('class', 'fruit')
        } else if (this.type == "bomb") {
            this.sprite.setAttribute('class', 'bomb')
        }
        else if (this.type == "goldenApple") {
            this.sprite.setAttribute("class", "goldenApple")
        }
        else if (this.type == "iceCream") {
            this.sprite.setAttribute("class", "iceCream")
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
            if (this.type != "bomb" && this.type != "goldenApple") {
                let currentComboHtml = document.getElementById("Combo")
                currentComboHtml.innerText = ("Combo: 0")
                game.currentCombo = 0;
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
                game.currentCombo += 1
                game.addScore("apple")

                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.currentCombo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type == "bomb") {
                this.player.health -= 20;
                game.currentCombo = 0
                game.addScore("bomb")

                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.currentCombo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type === "goldenApple") {
                game.currentCombo += 1
                game.addScore("golden_apple")

                score_html.innerText = "Score: " + game.score

                combo_html.innerText = "Combo: " + game.currentCombo
                this.removeFruit(fruits.indexOf(this))
            }
            else if (this.type === "iceCream") {
                if (this.player.speed > 2) {
                    this.player.speed -= 2
                    setTimeout(() => {
                        this.player.speed += 2;
                      }, 4000);
                    }
                this.removeFruit(fruits.indexOf(this))
            }
        }
    }

    this.timerId = setInterval(this.move, 5)
}