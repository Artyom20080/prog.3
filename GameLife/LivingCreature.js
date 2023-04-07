module.exports = class LivingCreature {
    constructor(x,y){
        this.x = x
        this.y = y
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


chooseCell(char) {
    let found = [];
    for (let i in this.directions) {
        let x = this.directions[i][0];
        let y = this.directions[i][1];

        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
            if (matrix[y][x] == char) {
                found.push(this.directions[i]);
            }
        }
    }
    return found;
}

}