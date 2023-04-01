const socket = io()

var side = prompt("Ասեք վանտակի չափը")




function setup() {
    frameRate(15)
    createCanvas(30 * side, 30 * side)
}
function show (){
 const grassCount = document.getElementById("grassCount")
 grassCount.innerHTML = "grassCount:" + Data.grass
}
function nkarel(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            var toBot = side - side * 0.3
            textSize(toBot);
            if (matrix[y][x] == 1) {
                fill("green")
                rect(x * side, y * side, side, side);
                text('☘️', x * side, y * side + toBot)
            } else if (matrix[y][x] == 2) {
                fill("#cee312")
                rect(x * side, y * side, side, side);
                text('🐑', x * side, y * side + toBot)
            } else if (matrix[y][x] == 3) {
                fill("#fc0000")
                rect(x * side, y * side, side, side);
                text('🐺', x * side, y * side + toBot)
            } else if (matrix[y][x] == 4) {
                fill("purple")
                rect(x * side, y * side, side, side);
                text(' 🐕 ', x * side, y * side + toBot)
            } else if (matrix[y][x] == 6) {
                fill("#403a3a")
                rect(x * side, y * side, side, side);
                text('🐈‍⬛', x * side, y * side + toBot)
            } else if (matrix[y][x] == 7) {
                fill("#f566Ef")
                rect(x * side, y * side, side, side);
                text('💀', x * side, y * side + toBot)
            }
            else {
                fill("gray")
                rect(x * side, y * side, side, side)
            }

        }

    }

}
socket.on("send matrix", nkarel)
socket.on("data",show)