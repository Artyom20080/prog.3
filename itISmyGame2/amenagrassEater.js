let LivingCreature = requrie("./LivingCreature ")
module.exports = class AmenagrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
        this.directions = []


    }
    getNewCordinates() {
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
    chooseCell(char, char2) {
        this.getNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char2) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random()* found.length)]

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new AmenagrassEater(x, y);
            matrix[y][x] = 4;
            amenagrassEaterArr.push(eater);

            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(1, 2);
        let exact = found[Math.floor(Math.random()* found.length)]

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y

            if (this.energy > 50) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < amenagrassEaterArr.length; i++) {
            if (amenagrassEaterArr[i].x == this.x && amenagrassEaterArr[i].y == this.y) {
                amenagrassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}

