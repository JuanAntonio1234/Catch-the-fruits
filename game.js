function Game() {
    this.score = 0;
    this.length = 60
    this.maxCombo = 0;
    this.currentCombo = 1;


    this.addScore = function (type) {
       
        if (type === "apple") {
            let scoreToAdd = 100 + this.currentCombo * 15;
            this.score += scoreToAdd
        }else if(type === "bomb"){
            this.score -= 500;
        }

        if(this.score < 0){
            this.score = 0;
        }

    }
}

