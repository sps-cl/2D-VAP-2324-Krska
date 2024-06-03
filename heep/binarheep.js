class BinaryHeap{
    constructor(size){
        if(size instanceof Array){
            this.items = size;
            this.count = this.items.length;
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].heapIndex = i;
            }
            this.heapify();
        }else{
            this.items = new Array(size);
            this.count = 0;
        }
    }
    sortDown(index){
        let firstChildIndex = index * 2 + 1;
        let secondChildIndex = firstChildIndex + 1

        while(firstChildIndex < this.count){
            if (secondChildIndex < this.count){
                if (this.items[firstChildIndex].compareTo(this.items[secondChildIndex]) > 0) {
                    firstChildIndex = secondChildIndex;
                }
            }
            if (this.items[index].compareTo(this.items[firstChildIndex]) > 0){
                this.swap(this.items[index], this.items[firstChildIndex]);
                index = firstChildIndex;
                firstChildIndex = index * 2 + 1;
                secondChildIndex = firstChildIndex + 1;
            }else return;
        }
    }
    sortUp(index){ 
        while (index > 0) {
            let parentIndex = (index - 1) >> 1;
            if (this.items[parentIndex].compareTo(this.items[index]) > 0){
                this.swap(this.index[parentIndex], this.items[index]);
                index = parentIndex;
            }else return;
        }
    }
    contains(item){
        return this.items[item.heapIndex] === item;
    }
    get(){
        if(this.count === 0) return;
        let item = this.items[0];
        this.items[0] = this.items[--this.count];
        this.items[0].heapIndex = 0;
        this.sortDown(0);
        return item;
    }
    add(item){
        if (this.count === this.items.length) return;
            if (this.contains(item)) {
                this.sortUp(item.heapIndex);
                this.sortDown(item.heapIndex);
                return;
            }
            this.items[this.count] = item;
            item.heapIndex = this.count;
            this.sortUp(this.count);
            this.count++;
    }
    heapify(){
        for (let i = (this.count >> 1) - 1; i >= 0; i--) {
           this.sortDown(i);
        }
    }
    swap(item1, item2){
        let temp = item1.heapIndex;
        item1.heapIndex = item2.heapIndex;
        item2.heapIndex = temp;
        this.items[item1.heapIndex] = item1;
        this.items[item2.heapIndex] = item2;
    }
}