var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
var n = 50
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

        matrix[y][x] = 6
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
    dataSend = {
        matrix: matrix,
        grassCount: grassArr.length,
        grasseaterCount: grassEaterArr.length,
        predatorCount: predatorArr.length,
        amenagrassEaterCount: amenagrassEaterArr.length,
        amenakerCount: amenakerArr.length,
        gazanCount: gazanArr.length
    }
    io.emit("send matrix", matrix)
}
setInterval(gameMove, 500)


function kill() {
    GrassArr = [];
    GrassEaterArr = [];
    PredatorArr = [];
    AmenakerArr = [];
    AmenagrassEaterArr = [];
    GazanArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            GrassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            GrassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
}


function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            GishatichArr.push(new Predator(x, y, 3))
        }
    }
}
function  addAmenagrassEater(){
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            AnicvacDagaxArr.push(new AmenagrassEater(x, y, 4))
        }
    }
}
function addAmenaker() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            CrichArr.push(new Amenaker(x, y, 6))
        }
    }
}

function addGazan() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 7
            CrichArr.push(new Gazan(x, y, 7))
        }
    }
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    // createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add amenagrassEater", addAmenagrassEater);
    socket.on("add amenaker", addAmenaker);
    socket.on("add gazan", addGazan);
});


var statistics = {};

setInterval(function () {
    statistics.Grass = GrassArr.length;
    statistics.GrassEater = GrassEaterArr.length;
    statistics.Predator = PredatorArr.length;
    statistics.AmenagrassEater = AmenagrassEaterArr.length;
    statistics.Amenaker= AmneakerArr.length;
    statistics.Gazan= GazanArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        io.emit("data", statistics)
    })
}, 666)
