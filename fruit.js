function Fruit(x, y, board, fruits, game) {
    let self = this
    this.x = x
    this.y = y
    this.speed = 20
    this.direction = 1
    this.width = 50
    this.height = 50
    this.sprite = document.createElement('div')

    this.insertFruit = function () {
        this.sprite.setAttribute('class', 'fruit')
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
            let currentComboHtml = document.getElementById("Combo")
            currentComboHtml.innerText = ("Combo: 0")
            fruits.shift()
            game.currentCombo = 0;
        }
        else {
            fruits.splice(idx, 1)
        }
        clearInterval(this.timerId)
        board.removeChild(this.sprite)
    }

    this.checkCollision = function () {
        if (this.x < player.x + player.width &&
            this.y < player.y + player.height &&
            this.x + this.width > player.x &&
            this.y + this.height > player.y) {
            game.currentCombo += 1
            game.addScore()
            let score_html = document.getElementById("Score")
            score_html.innerText = "Score: " + game.score
            let combo_html = document.getElementById("Combo")
            combo_html.innerText = "Combo: " + game.currentCombo
            this.removeFruit(fruits.indexOf(this)) //Eliminamos la fruta que tocamos de la lista de frutas y del dom
            console.log(game.score)
        }
    }

    this.timerId = setInterval(this.move, 50)
}