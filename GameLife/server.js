var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("Server Started")
});

var intervals = {
    grass: 0,
    grassEater: 0,
    predator: 0,
    water: 0,
}

const Grass = require("./grass.js")
const GrassEater = require("./GrassEater.js")
const Predator = require("./Predator.js")
const Bomb = require("./bomb.js")
const Water = require("./jur.js")
const Flowers = require("./flowers.js")


function matrixGenerator(matrixSize, grass, grassEater, predator, water_count, bomb, flowers) {
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
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }


    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }

    }


    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }

    }


    for (let i = 0; i < water_count; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }

    }

    for (let i = 0; i < bomb; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }

    }
    for (let i = 0; i < flowers; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 7
        }

    }

    io.emit("send matrix", matrix)
    return matrix
}

matrix = matrixGenerator(25, 0, 0, 0, 0, 0, 0)
grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
bombArr = []
flowersArr = []


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
            } else if (matrix[y][x] == 4) {
                var waterEnergy = new Water(x, y)
                waterArr.push(waterEnergy)
            } else if (matrix[y][x] == 5) {
                var bomb = new Bomb(x, y)
                bombArr.push(bomb)
            } else if (matrix[y][x] == 7) {
                var flowers = new Flowers(x, y)
                flowersArr.push(flowers)
            }
        }
    }

}

createObj()
const winter = 1;
const summer = 2;
const autumn = 3;
const spring = 4;
function weatherHandler(weather){
    switch (weather) {
        case winter:
            clearInterval(intervals.grass)
            intervals.grass = setInterval(grassMul,2000);
            break;
        case summer:
            clearInterval(intervals.grass)
            intervals.grass = setInterval(grassMul,500);
            break;
        case autumn:
            clearInterval(intervals.grass)
            intervals.grass = setInterval(grassMul,1000);
            break;
        case spring:
            clearInterval(intervals.grass)
            intervals.grass = setInterval(grassMul,1000);
            break;
    }
}

function grassMul() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
}

function grassEaterMul() {
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
}

function predatorMul(){
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
}

function waterMul(){
    for (let i in waterArr) {
        waterArr[i].move()
    }
}

function gameMove() {
    io.sockets.emit("send matrix", matrix)
}
function addGrass() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            var grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
        }
    }
}
function addPredator() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var pred = new Predator(x, y)
            predatorArr.push(pred)
        }
    }
}
function addWater() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            var waterEnergy = new Water(x, y)
            waterArr.push(waterEnergy)
        }
    }
}
function addBomb() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var bomb = new Bomb(x, y)
            bombArr.push(bomb)
        }
    }
}
function addFlowers() {
    for (var i = 0; i < 1; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 7
            var flowers = new Flowers(x, y)
            flowersArr.push(flowers)
        }
    }
}
function restart() {
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    waterArr = []
    bombArr = []
    flowersArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
   
}



io.on('connection', function (socket) {
    createObj();
    socket.on("weather",weatherHandler)
    socket.on("restart", restart)
    socket.on("add Grass", addGrass)
    socket.on("add GrassEater", addGrassEater)
    socket.on("add Predator", addPredator)
    socket.on("add Water", addWater)
    socket.on("add Bomb", addBomb)
    socket.on("add Flowers", addFlowers)
})

setInterval(function statitics() {

    countd = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predatorArr.length,
        jur: waterArr.length,
        bomb: bombArr.length,
        flowers: flowersArr.length


    }
    fs.writeFile("statics.json", JSON.stringify(countd), function () {
        io.emit("send datas", countd)
    })

}, 1000);

setInterval(gameMove, 500)
intervals.grass = setInterval(grassMul,1000)
intervals.grassEater = setInterval(grassEaterMul,1000)
intervals.predator = setInterval(predatorMul,1000)
intervals.water = setInterval(waterMul,1000)

