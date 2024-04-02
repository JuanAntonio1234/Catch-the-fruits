let board = document.getElementById("board");
let fruitSpawnInterval = 3000000; // modificar para cambiar la velocidad del juego
let wall = document.getElementById("wall");
let player = new Player(225, 700, 3, board);
let timerId;
let spawnId;
let fruits = [];
let lastFruitSpawnTime = Date.now();
let game = new Game(player);

function gameStart() {
  player.insertPlayer();
  function gameLoop() {
    movePlayer();
    let currentTime = Date.now();
    if (currentTime - lastFruitSpawnTime > fruitSpawnInterval) {
      createFruits();
      lastFruitSpawnTime = currentTime;
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

function movePlayer() {
  player.move();
}

function createFruits() {
  let coordX = Math.floor(Math.random() * 10) * 50;
  let randomFruitType = Math.floor(Math.random() * 20) + 1;
  let fruit;
  if (randomFruitType >= 0 && randomFruitType <= 13) {
    fruit = new Fruit(coordX, 0, board, fruits, game, "fruit", player);
  } else if (randomFruitType <= 17 && randomFruitType > 13) {
    fruit = new Fruit(coordX, 0, board, fruits, game, "bomb", player);
  } else if (randomFruitType === 18 || randomFruitType === 19) {
    fruit = new Fruit(coordX, 0, board, fruits, game, "iceCream", player);
  } else {
    fruit = new Fruit(coordX, 0, board, fruits, game, "Onigiri", player);
  }

  fruit.insertFruit();
  fruits.push(fruit);
}

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      if (e.shiftKey) {
        player.direction = -2;
      } else {
        player.direction = -1;
      }
      break;
    case "ArrowRight":
      if (e.shiftKey) {
        player.direction = 2;
      } else {
        player.direction = 1;
      }
      break;
    case "Shift":
      player.direction *= 2;
      break;
  }
});

window.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      if (player.direction < 0) {
        player.direction = 0;
      }
      break;
    case "ArrowRight":
      if (player.direction > 0) {
        player.direction = 0;
      }
      break;
  }
}); 

function restartGame(){
  let restarter = new Fruit(100, 0, board, fruits, game, "fruit", player);
  restarter.restartGame();
}

gameStart();
