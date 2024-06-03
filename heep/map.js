class PathMap{
    constructor(width,height,cellSize){
        this.width =   width
        this.height = height
        this.cellSize = cellSize

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        this.canvas.width =width * cellSize
        this.canvas.height =height * cellSize
        this.#drawLayout()
        
        this.cells =new Array(width)
        for(let i= 0; i < width; i++){
            this.cells[i]=new Array(height)
            for (let j = 0; j < height; j++) {
                this.cells[i][j] = new Cell(i,j)
                
            }
        }

        this.canvas.addEventListener('mousedown',(event)=>{
            let rect =this.canvas.getBoundingClientRect()
            let x =Math.max(event.clientX-rect.x, 0)
            let y = Math.max(event.clientY -rect.y, 0)
            x= Math.floor(x/cellSize)
            y= Math.floor(y/cellSize)
            this.#addWall(x,y)
        })

        document.body.appendChild(this.canvas);
    }

    #addWall(x,y){
        let cell =this.cell[x][y]
        cell.wall = true
        this.#drawCell(cell, 'black')
    }

    #drawLine(x1,y1,x2,y2){
        this.context.beginPath()
        this.context.moveTo(x1,y1)
        this.context.lineTo(x2,y2)
        this.context.stroke()
    }

    #drawCell(cell,fillColor){
        this.context.fillStyle = fillColor
        this.context.fillRect(cell.x*this.cellSize, cell.y*this.cellSize, this.cellSize, this.cellSize)
        this.context.strokeRect(cell.x*this.cellSize, cell.y*this.cellSize, this.cellSize, this.cellSize)

    }

    #eraseCell(cell){
        this.context.clearRect(cell.x*this.cellSize, cell.y*this.cellSize, this.cellSize, this.cellSize)
        this.context.strokeRect(cell.x*this.cellSize, cell.y*this.cellSize, this.cellSize, this.cellSize)

    }

    #drawLayout(){//nakresleni mrizky
        for (let y = 0; y <= this.height; y++) {
            this.#drawLine(0, y*this.cellSize, this.width*this.cellSize, y*this.cellSize);
        }
        for (let x = 0; x <= this.width; x++) {
            this.#drawLine(x*this.cellSize, 0, x*this.cellSize, this.height*this.cellSize);
        }
    }

    findpath() {
        let celllist = []
        celllist.push(this.start)
        let closeCells = new Set()
        while(celllist.length>0){
            let bestCell = celllist[0]
            for(let i = 1 ; i < celllist.length;i++){
                if(bestCell.compareTo(celllist[i]) > 0){
                    bestCell = celllist[i]
                    bestIndex = i
                }
            }
            closeCells.add(bestCell)
            celllist.splice(bestCell,1)
            if(bestCell === this.target){
                return bestCell
            }
            let neighbours = this.getNeighbours(bestCell)
            for(let i = 0 ; i < neighbours.length; i++){
                const neighbours = neighbours[i]
                if(closeCells.has(neighbours)) continue
                let startDistance = bestCell.startDistance + this.getDistance(bestCell,neighbours)
                let inList = celllist.includes(neighbours)
            }
        }

    }

    getNeighbours(cell) {
        let neighbours = []
        for (let dx = -1; dx < 2; dx++){
            let x = cell.x + dx 
            if(x-0 || x>=this.width)continue
            for(let dy = -1 ;dy < 2; dy++){
                let y = cell.y +dy
                if(dy===0&&dy===0) continue
                if(y <0 ||y>= this.height)continue
                if(this.cells[x][y].wall)continue
                neighbours.push(this.cells[x][y])
                
            }
        }
        return neighbours

    }

    getDistance(cell1, cell2){
        let x = Math.abs(cell1.x - cell2.x)
        let y = Math.abs(cell1.y - cell2.y)
        if(x>y){
            return y * Math.SQRT2 + (x-y)
        }
        return x * Math.SQRT2 + (y-x)
        
    }

}