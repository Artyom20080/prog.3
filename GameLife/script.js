alert("Ծրագրավորում 3րդ մակարդակ")
const socket = io()

var side = 25



function setup() {
    createCanvas(30 * side, 30 * side)



}

let weather = []
function Weathers(i) {
    let color = []
    if (i == 1) {
        color = ["green"]
    }
    else if (i == 2) {
        color = ["blue"]
    }
    else if (i == 3) {
        color = ["red"]
    }
    else if (i == 4) {
        color = ["blue"]
    }
    else if (i == 5) {
    }
    weather = color
    socket.emit("weather", i)
    return weather
}
Weathers(3)

function updateColor(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(weather[0])
                rect(x * side, y * side, side, side)


            } else if (matrix[y][x] == 2) {
                fill("yellow")
                rect(x * side, y * side, side, side)


            } else if (matrix[y][x] == 3) {
                fill("#795548")
                rect(x * side, y * side, side, side)


            } else if (matrix[y][x] == 4) {
                fill("blue")
                rect(x * side, y * side, side, side)


            } else if (matrix[y][x] == 5) {
                fill("black")
                rect(x * side, y * side, side, side)



            } else if (matrix[y][x] == 7) {
                fill(weather[0])
                rect(x * side, y * side, side, side)

            }
            else {
                fill("gray")
                rect(x * side, y * side, side, side)
            }
        }

    }

}
function restart() {
    socket.emit("restart")
}
function addGrass() {
    socket.emit("add Grass")
}
function addGrassEater() {
    socket.emit("add GrassEater")
}
function addPredator() {
    socket.emit("add Predator")
}
function addWater() {
    socket.emit("add Water")
}
function addBomb() {
    socket.emit("add Bomb")
}
function addFlowers() {
    socket.emit("add Flowers")
}

socket.on("send matrix", updateColor)

socket.on("send datas", function (count) {
    let x = count.grass - count.jur
    document.getElementById("grass").innerHTML = x;
    document.getElementById("grassEater").innerHTML = count.grassEater;
    document.getElementById("predator").innerHTML = count.predator;
    document.getElementById("water").innerHTML = count.jur;
    document.getElementById("bomb").innerHTML = count.bomb;
    document.getElementById("flowers").innerHTML = count.flowers;

})
