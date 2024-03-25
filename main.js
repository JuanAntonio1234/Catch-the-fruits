let board = document.getElementById('board')
let wall = document.getElementById('wall')
let player = new Player(225, 750, board)
let timerId
let spawnId
let fruits = []
let lastFruitSpawnTime = Date.now()
let game = new Game()
let fruitSpawnInterval = 300 // 3000 milisegundos = 3 segundos entre cada generación de enemigos

// function gameStartaddd) {
//     player.insertPlayer()
//     timerId = setInterval(movePlayer, 25)
//     // spawnId = setInterval(createEnemies, 3000)
// }


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

        /* clearInterval(timerId)
        clearInterval(spawnId)
        fruits.forEach(function (fruit) {
            clearInterval(fruit.timerId)
        })
        // window.alert('Game Over!!!') */
    
}


function createFruits() {
    let coordX = Math.floor(Math.random() * 10) * 50
    let randomFruitType = Math.floor(Math.random() * 10) + 1
    let fruit;
    if(randomFruitType >= 0 && randomFruitType <=9){
        fruit = new Fruit(coordX, 0, board, fruits, game, "fruit")
    }
    else{
        fruit = new Fruit(coordX, 0, board, fruits, game, "bomb")
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

        // player.move()
        // case 'w':
        //     player.directionY = - 1
        //     // player.move()
        //     break
        // case 's':
        //     player.directionY = 1
        //     // player.move()
        //     break
    }
})

window.addEventListener('keyup', function (e) {
    player.direction = 0
    // player.directionY = 0
})

gameStart()