let LivingCreature = require("./LivingCreature")
module.exports = class Gazan extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10
        this.directions = [];
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


    chooseCell(char, char1, char2) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var emptyCell = this.chooseCell(0)
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy--
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy < 0) {
                this.die()
            }
        }
        else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }

    }
    eat() {
        let emptyCell = this.chooseCell(3,4);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 3;
            let x = newCell[0];
            let y = newCell[1];

            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i = 0; i < amenagrassEaterArr.length; i++) {
                if (amenagrassEaterArr[i].x == x && amenagrassEaterArr[i].y == y) {
                    amenagrassEaterArr.splice(i, 1)
                }
            }
            matrix[y][x] = 7
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 35) {
                this.mul()
            }
        } else {
            this.move()
        }
    }

    mul() {
        var emptyCell = this.chooseCell(0);
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell && this.energy > 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;

            var gaz = new Gazan(newX, newY);

            gazanArr.push(gaz);
            this.energy = 5
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gazanArr) {
            if (this.x == gazanArr[i].x && this.y == gazanArr[i].y) {
                gazanArr.splice(i, 1);
                break;
            }
        }
    }

}