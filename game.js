function Game(){
    this.score = 0;
    this.length = 60
    this.maxCombo = 0;
    this.currentCombo = 1;


    this.addScore = function(){
        let scoreToAdd = 100 + this.currentCombo * 15;
        this.score += scoreToAdd
    }
}

