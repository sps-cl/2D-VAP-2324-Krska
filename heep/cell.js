class Cell{
    constructor(x, y) {
        this.x = x;//pozice v mapě - x
        this.y = y;//pozice v mapě - y
        this.wall = false;//zda je buňka přístupná pro hledání trasy
        this.startDistance = 0;//vzdálenost od počátku trasy
        this.endDistance = 0;//vzdálenost od konce trasy
        this.heapIndex = 0;//index buňky v binární haldě
        
        //atribut pro propojení buněk do spojového seznamu
        //abychom dokázeli rekonstruovat vypočtenou trasu
        this.next = null;
    }

    get distance() {//getter vracející celkovou vzdálenost buňky 
        return this.startDistance + this.endDistance;
    }

    compareTo(other) {//metoda pro porovnání buněk mezi sobou
        //other je instancí třídy Cell
        if (this.distance < other.distance) return -1;
        if (this.distance > other.distance) return 1;
        if (this.startDistance < other.startDistance) return -1;
        if (this.startDistance > other.startDistance) return 1;
        return 0;
    }
}