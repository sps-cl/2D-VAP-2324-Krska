class Cell{
    constructor (x,y){
        this.x = x // pozice v mape x
        this.y = y// pozice v mape y
        this.wall = false //zda je bunkda pristupna pro hledani trasy
        this.startDistance = 0 // vzdalenost od startu
        this.endDistant = 0//vzdalenost od konce
        this.heepIndex = 0
        this.next = null

    }

    get distance() { //getter vracejici cekovou vzdalenost bunky
        return this.startDistance + this.endDistant
    }

    compareTO(other){
        if (this.distance < other.distance) return -1
        if (this.distance > other.distance) return 1
        if (this.startDistance < other.startDistance) return -1
        if (this.startDistance > other.startDistance) return 1
        return 0
    }
}