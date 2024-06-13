let cells = new Array(10);
for (let i = 0; i < cells.length; i++) {
    cells[i] = new Cell(i, i);
    cells[i].startDistance = Math.random() * 10;
    cells[i].endDistance = Math.random() * 10;
}
let heap = new BinaryHeap(cells);
while(heap.count > 0) {
    console.log(heap.get().distance);
}

let map = new PathMap(40, 40, 20);