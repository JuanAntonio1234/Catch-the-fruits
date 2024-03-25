function Player(x, y, board) {
    let self = this
    this.x = x
    this.y = y
    this.speed = 5
    this.direction = 0
    this.width = 100
    this.height = 100

    this.sprite = document.createElement('div')
    this.velocityY = 0

    this.insertPlayer = function () {
        this.sprite.setAttribute('id', 'player')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        board.appendChild(this.sprite)
    }

    this.move = function () {
        let moveInX = self.x + self.speed * self.direction
        // Verificar límites horizontales como antes
        if (moveInX >= 0 && moveInX <= 420) {
            self.x = moveInX
            self.sprite.style.left = self.x + 'px'
        }

        self.sprite.style.top = self.y + 'px'
    }
}