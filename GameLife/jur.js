let LivingCreature = require("./LivingCreature")
let Grass = require("./grass")
module.exports = class Water extends LivingCreature{
    constructor(x, y){
       super(x,y)
        
    }
    chooseCell(char) {
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
           
        }
        return found;
    }

   
    
    move() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 1;

            let w = new Grass(newX, newY);
            
            grassArr.push(w);
            this.x = newX;
            this.y = newY;


           
        } 
    }
}
