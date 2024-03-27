let board = document.getElementById('board')
let wall = document.getElementById('wall')
let player = new Player(225, 700, 100, board)
let timerId
let spawnId
let fruits = []
let lastFruitSpawnTime = Date.now()
let game = new Game(player)
let fruitSpawnInterval = 400 // modificar para cambiar la velocidad del juego


function gameStart() {
    player.insertPlayer()
    function gameLoop() {
        movePlayer()
        let currentTime = Date.now()
        if (currentTime - lastFruitSpawnTime > fruitSpawnInterval) {
            createFruits()
            lastFruitSpawnTime = currentTime
        }
        requestAnimationFrame(gameLoop)
    }
    gameLoop()
}


function movePlayer() {
        player.move() 
}


function createFruits() {
    let coordX = Math.floor(Math.random() * 10) * 50
    let randomFruitType = Math.floor(Math.random() * 20) + 1
    let fruit;
    if(randomFruitType >= 0 && randomFruitType <=15){
        fruit = new Fruit(coordX, 0, board, fruits, game, "fruit", player)
    }
    else if(randomFruitType <=17 && randomFruitType >15){
        fruit = new Fruit(coordX, 0, board, fruits, game, "goldenApple", player)
    }
    else if(randomFruitType === 18 || randomFruitType === 19){
        fruit = new Fruit(coordX, 0, board, fruits, game, "iceCream", player)
    }
    else{
        fruit = new Fruit(coordX, 0, board, fruits, game, "bomb", player)
    }
    
    fruit.insertFruit()
    fruits.push(fruit)
}

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'a':
            player.direction = - 1
            // player.move()
            break
        case 'd':
            player.direction = 1
            break
        case 'ArrowLeft':
            player.direction = -1
            break
        case 'ArrowRight':
            player.direction = 1
            break
    }
})

window.addEventListener('keyup', function (e) {
    player.direction = 0
})

gameStart()