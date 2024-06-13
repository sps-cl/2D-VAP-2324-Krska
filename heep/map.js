class PathMap {
    constructor(width, height, cellSize) {
        this.width = width;//počet buněk v šířce
        this.height = height;//počet buněk ve výšce
        this.cellSize = cellSize;//velikost jedné buňky

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        
        this.canvas.width = width * cellSize;//počet buněk * velikost buňky
        this.canvas.height = height * cellSize;

        this.context.lineWidth = 2;

        this.#drawLayout();

        this.cells = new Array(width);//vytvoření pole o velikosti width(šířka mapy)
        for (let i = 0; i < width; i++) {//cyklus generující sloupce mapy
            this.cells[i] = new Array(height);
            for (let j = 0; j < height; j++) {//cyklus generující buňky ve sloupci
                this.cells[i][j] = new Cell(i, j);//vytvotvoření nové buňky - i je souřadnice v ose x, j v y
            }
        }
        
        this.selectedMethod = this.#addWall;
        let mousedown = false;

        window.addEventListener('mousedown', (event) => {//nastavení funkce volané při stisku tlačítka myši
            mousedown = true;
            this.canvas.dispatchEvent(new MouseEvent('mousemove', event));
        });

        window.addEventListener('mouseup', (event) => {//nastavení funkce volané při puštění tlačítka myši
            mousedown = false;
        });

        this.canvas.addEventListener('mousemove', (event) => {//nastavení funkce volané při pohybu myši
            if (!mousedown) return;
            let rect = this.canvas.getBoundingClientRect();//zísnání obdélníku ohraničujícího plátno v otevřeném prohlížečovém okně
            let x = Math.max(event.clientX - rect.x, 0);//posun souřadnic myši o pozici plátna v okně - bez posunu by nebyla pozice klinutí vyhodnocena přesně
            let y = Math.max(event.clientY - rect.y, 0);
            x = Math.floor(x / cellSize);//výpočet indexu buňky z pixelů v ose x
            y = Math.floor(y / cellSize);//výpočet indexu buňky z pixelů v ose y
            if (x >= this.width || y >= this.height) return;
            this.selectedMethod(x, y);

            this.#redrawMap();
            this.drawPath();
        });

        window.addEventListener('keydown', (event) => {
            switch(event.key.toLowerCase()) {
                case 'w': //Wall
                    this.selectedMethod = this.#addWall;
                    break;
                case 'e': //Empty
                    this.selectedMethod = this.#removeWall;
                    break;
                case 's': //Start
                    this.selectedMethod = this.#setStart;
                    break;
                case 't': //Target
                    this.selectedMethod = this.#setTarget;
                    break;    
            }
        });

        this.start = this.cells[0][0];
        this.target = this.cells[width - 1][height - 1];

        this.#drawCell(this.start, 'red');
        this.#drawCell(this.target, 'green');

        document.body.appendChild(this.canvas);

        this.drawPath();
    }

    #addWall(x, y) {
        let cell = this.cells[x][y];//načtení vybrané buňky
        if (cell != this.start && cell != this.target) {//kontrola zda je možné zeď přidat
            cell.wall = true;
            this.#drawCell(cell, 'black');//zobrazení buňky na kterou bylo kliknuto
        }
    }

    #removeWall(x, y) {
        let cell = this.cells[x][y];//načtení vybrané buňky
        if (cell.wall) {//kontrola zda je možné zeď odstranit
            cell.wall = false;
            this.#eraseCell(cell);//smazání buňky na kterou bylo kliknuto
        } 
    }

    #setStart(x, y) {
        let cell = this.cells[x][y];//načtení vybrané buňky
        if (!cell.wall && cell != this.target) {//kontrola, zda je možné startovní buňku nastavit
            this.#eraseCell(this.start);//smazání původní startovní buňky
            this.start = cell;
            this.#drawCell(this.start, 'red');//vykreslení nové startovní buňky
        }
    }

    #setTarget(x, y) {
        let cell = this.cells[x][y];//načtení vybrané buňky
        if (!cell.wall && cell != this.start) {//kontrola, zda je možné cílové buňku nastavit
            this.#eraseCell(this.target);//smazání původní cílové buňky
            this.target = cell;
            this.#drawCell(this.target, 'green');//vykreslení nové cílové buňky
        }
    }

    #drawLine(x1, y1, x2, y2) {//funkce pro vykreslení čáry
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    #drawCell(cell, fillColor) {//cell je instance třídy Cell, fillColor je textový řetězec
        this.context.fillStyle = fillColor;
        this.context.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.context.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
    }

    #eraseCell(cell) {
        this.context.clearRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
        this.context.strokeRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize);
    }

    #drawLayout() {//nakreslení mřížky
        for (let y = 0; y <= this.height; y++) {//vodorovné čáry
            this.#drawLine(0, y * this.cellSize, this.width * this.cellSize, y * this.cellSize);  
        }

        for (let x = 0; x <= this.width; x++) {//svislé čáry
            this.#drawLine(x * this.cellSize, 0, x * this.cellSize, this.height * this.cellSize);  
        }
    }
    #redrawMap() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.#drawLayout();
        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++){
                if(this.cells[x][y].wall) this.#drawCell(this.cells[x][y], "black");
            }
        }
        this.#drawCell(this.start, 'red');
        this.#drawCell(this.target, 'green');
    }

    findPath() {
        let cellHeap = new BinaryHeap(this.width * this.height);
        cellHeap.add(this.start);
        let closedCells = new Set();
        while(cellHeap.count > 0) {
            let bestCell = cellHeap.get();
            closedCells.add(bestCell);
            if (bestCell === this.target) return bestCell;
            let neighbours = this.getNeighbours(bestCell);
            for (let i = 0; i < neighbours.length; i++) {
                const neighbour = neighbours[i];
                if (closedCells.has(neighbour)) continue; 
                let inList = cellHeap.contains(neighbour);
                let startDistance = bestCell.startDistance + this.getDistance(neighbour, bestCell);
                if (!inList || startDistance < neighbour.startDistance) {
                    neighbour.startDistance = startDistance;
                    neighbour.endDistance = this.getDistance(neighbour, this.target);
                    neighbour.next = bestCell
                    cellHeap.add(neighbour);
                }
            }
        }
    }
    drawPath() {
        let path = this.findPath();
        if(!path) return false; 
        while (path.next != this.start) {
            path = path.next;
            this.#drawCell(path, "yellow");
        }
        return true;
    }

    getNeighbours(cell) {
        let neighbours = [];
        for (let dx = -1; dx < 2; dx++) {
            let x = cell.x + dx;
            if (x < 0 || x >= this.width) continue;
            for (let dy = -1; dy < 2; dy++) {
                let y = cell.y + dy;
                if (dy === 0 && dx === 0) continue;
                if (y < 0 || y >= this.height) continue;
                if (this.cells[x][y].wall) continue;
                neighbours.push(this.cells[x][y]);
            }
        }
        return neighbours;
    }

    getDistance(cell1, cell2) {
        let x = Math.abs(cell1.x - cell2.x);//vzdálenost v ose x
        let y = Math.abs(cell1.y - cell2.y);//vzdálenost v ose y
        if (x > y) {//výpočet vzdálosti celkové e započtením cesty po diagonále
            return y * Math.SQRT2 + (x - y);
        }
        return x * Math.SQRT2 + (y - x);
    }
}