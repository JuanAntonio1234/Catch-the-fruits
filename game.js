function Game() {
    this.score = 0;
    this.combo = 0;
    this.superBalls = 0;


    this.addScore = function (type) {
       
        if (type === "apple") {
            let scoreToAdd = 100 + this.combo * 15;
            this.score += scoreToAdd
        }
        else if(type === "bomb"){
            this.score -= 500;
        }
        else if(type === "golden_apple"){
            this.score += 5000 + this.combo * 15;
        }
        else if(type === "iceCream"){
            this.score += 500000 + this.combo * 15;
        }

        if(this.score < 0){
            this.score = 0;
        }

    }
}

