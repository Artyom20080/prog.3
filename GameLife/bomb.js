let LivingCreature = require("./LivingCreature")

module.exports = class Bomb extends LivingCreature{
    constructor(x,y){
              super(x,y)
              this.energy = 1
              this.directions = []
    }


    getNewCoordinates() {
      this.directions = [
          [this.x - 1, this.y - 1],
          [this.x, this.y - 1],
          [this.x + 1, this.y - 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
          [this.x - 1, this.y + 1],
          [this.x, this.y + 1],
          [this.x + 1, this.y + 1]
      ];
  }
  chooseCell(char,char1,char2,char3) {
      this.getNewCoordinates();
      let found = [];

      for (let i in this.directions) {
          let x = this.directions[i][0];
          let y = this.directions[i][1];

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
              if (matrix[y][x] == char) {
                  found.push(this.directions[i]);
              }
          }

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
              if (matrix[y][x] == char1) {
                  found.push(this.directions[i]);
              }
          }

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
            if (matrix[y][x] == char2) {
                found.push(this.directions[i]);
            }
        }

          if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
              if (matrix[y][x] == char3) {
                  found.push(this.directions[i]);
              }
          }
          
      }

      return found;
  }


  mul() {
      let emptyCell = this.chooseCell(0);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
 
      if (newCell && this.energy > 5) {
          let newX = newCell[0];
          let newY = newCell[1];

          matrix[newY][newX] = 5;
          let pred = new Bomb(newX, newY);
          bombArr.push(pred);

          this.energy = 12;
      }
  }


  eat() {
      let emptyCell = this.chooseCell(1,2,3,4);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
      console.log(newCell);

      if (newCell) {
          this.energy += 5;
          let newX = newCell[0];
          let newY = newCell[1];
          for (let i = 0; i < grassArr.length; i++) {
              if (grassArr[i].x == newX && grassArr[i].y == newY) {
                  grassArr.splice(i, 1)
                  matrix[newY][newX] = 6;
                  break;
              }
          }

          for (let i = 0; i < grassEaterArr.length; i++) {
              if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                  grassEaterArr.splice(i, 1)
                  matrix[newY][newX] = 6;
                  break;

              }
          }
          for (let i = 0; i < waterArr.length; i++) {
              if (waterArr[i].x == newX && waterArr[i].y == newY) {
                  waterArr.splice(i, 1)
                  matrix[newY][newX] = 6;
                  break;

              }
          }
          for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                predatorArr.splice(i, 1)
                matrix[newY][newX] = 6;
                break;

            }
        }

        matrix[this.y][this.x] = 5;

          this.x = newX;
          this.y = newY;

          if (this.energy > 20) {
              this.mul()
          }
      } 
      
    
  }

  
  die() {
      for (let i = 0; i < bombArr.length; i++) {
          if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
            bombArr.splice(i, 1)
          }
      }
      matrix[this.y][this.x] = 0;
  }
}
