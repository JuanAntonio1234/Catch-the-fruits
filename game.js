function Game() {
    this.score = 0;
    this.length = 60
    this.maxCombo = 0;
    this.currentCombo = 1;


    this.addScore = function (type) {
       
        if (type === "apple") {
            let scoreToAdd = 100 + this.currentCombo * 15;
            this.score += scoreToAdd
        }
        else if(type === "bomb"){
            this.score -= 500;
        }
        else if(type === "golden_apple"){
            this.score += 5000 + this.currentCombo * 15;
        }
        else if(type === "iceCream"){
            this.score += 500000 + this.currentCombo * 15;
        }

        if(this.score < 0){
            this.score = 0;
        }

    }
}

