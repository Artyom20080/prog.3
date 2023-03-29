var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);
const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Predator = require("./predator")
const AmenagrassEater = require("./AmenagrassEater")
const Amenaker = require("./Amenaker")
const Gazan = require("./gazan")
function matrixGenerator(matrixSize, grass, grassEater, predator, amenagrassEater, amenaker, gazan) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }

    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }

    for (let i = 0; i < amenagrassEater; i++) {
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4
    }
    for (let i = 0; i < amenaker; i++) {
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5
    }
    for (let i = 0; i < gazan; i++) {
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 7
    }


    io.emit("send matrix", matrix)
    return matrix
}




matrix = matrixGenerator(30, 1, 1, 1, 0, 1, 0)
grassArr = []
grassEaterArr = []
predatorArr = []
amenagrassEaterArr = []
amenakerArr = []
gazanArr = []




function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y], [x] == 4) {
                var amenEa = new AmenagrassEater(x, y)
                amenagrassEaterArr.push(amenEa)
            } else if (matrix[y], [x] == 5) {
                var amena = new Amenaker(x, y)
                amenakerArr.push(amena)
            } else if (matrix[y], [x] == 7) {
                var gaz = new Gazan(x, y)
                gazanArr.push(gaz)
            }
        }
    } io.emit("send matrix", matrix)

}
createObj()

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i = 0; i < amenagrassEaterArr.length; i++) {
        amenagrassEaterArr[i].eat()

    }

    for (let i = 0; i < amenakerArr.length; i++) {
        amenakerArr[i].eat()
    }

    for (let i = 0; i < gazanArr.length; i++) {
        gazanArr[i].eat()
    }
    io.emit("send matrix", matrix)
}
setInterval(gameMove, 500)