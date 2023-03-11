

function matrixGenerator(matrixSize,grass,grassEater,predator,amenagrassEater,amenaker) {
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

    for(let i =0;i< amenagrassEater; i++){
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4
    }
    for(let i =0;i< amenaker; i++){
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5
    }




    return matrix
}

var matrix = matrixGenerator(30,30,30,1,0,1)
var side = prompt("Ասեք վանտակի չափը")


var grassArr = []
var grassEaterArr = []
var predatorArr = [] 
var amenagrassEaterArr= []
var amenakerArr = []

function setup() {
    frameRate(15)
    createCanvas(matrix[0].length * side ,matrix.length * side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
       
           if(matrix[y][x] == 1){
                var gr = new Grass(x,y)
                grassArr.push(gr)
           }else  if(matrix[y][x] == 2){
            var grEat = new GrassEater(x,y)
            grassEaterArr.push(grEat)
           }else if(matrix[y][x] == 3){
            var pred = new Predator(x,y)
                predatorArr.push(pred)
            }else if(matrix[y],[x] == 4){
                var amenEa= new AmenagrassEater(x,y)
                amenagrassEaterArr.push(amenEa)
            }else  if (matrix[y],[x] == 5){
                var amena = new Amenaker  (x,y)
                 amenakerArr.push(amena)
            }
           }
        }
        
    }



function draw() {
    
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            var toBot = side - side * 0.3
            textSize(toBot);
                if(matrix[y][x] == 1){
                     fill ("green")
                     rect(x * side, y * side, side, side);
                     text('☘️', x * side, y * side + toBot)  
                }else if (matrix[y][x] == 2){
                        fill ("#cee312")
                        rect(x * side, y * side, side, side);
                        text('🐑', x * side, y * side + toBot)  
                }else if(matrix[y][x] == 3){
                            fill ("#fc0000")
                            rect(x * side, y * side, side, side);
                            text('🐺', x * side, y * side + toBot)  
                }else if(matrix[y][x] == 4){
                    fill("purple")
                    rect(x * side, y * side, side, side);
                    text(' 🐕‍🦺 ', x * side, y * side + toBot)  
                }else if (matrix[y][x]==6){
                    fill("#403a3a")
                    rect(x * side, y * side, side, side);
                    text('🐈‍⬛', x * side, y * side + toBot)  
                }
             else{
                    fill ("gray")
                    rect (x * side , y * side ,side,side)
                }
                
        }
          
      }

      for(let i in  grassArr){
            grassArr[i].mul()
      }

      for(let i in  grassEaterArr){
        grassEaterArr[i].eat()
        
  }



     for(let i in predatorArr){
         predatorArr[i].eat()
     }

     for (let i = 0; i < amenagrassEaterArr.length; i++) {
        amenagrassEaterArr[i].eat()
        
    }
  
    for (let i = 0; i < amenakerArr.length; i++) {
        amenakerArr[i].eat()
    }

}
