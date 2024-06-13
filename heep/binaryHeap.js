class BinaryHeap {
    constructor(size) {
        if (size instanceof Array) {
            this.items = size;
            this.count = this.items.length;
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].heapIndex = i;
            }
            this.heapify();
        } else {
            this.items = new Array(size);
            this.count = 0;
        }
    }

    clear() {
        this.count = 0;
    }

    sortDown(index) {
        let firstIndex = index * 2 + 1;
        let secondIndex = firstIndex + 1;

        while(firstIndex < this.count) {
            if (secondIndex < this.count) {
                if (this.items[firstIndex].compareTo(this.items[secondIndex]) > 0) {
                    firstIndex = secondIndex;
                }
            }
            if (this.items[index].compareTo(this.items[firstIndex]) > 0) {
                this.swap(this.items[index], this.items[firstIndex]);
                index = firstIndex;
                firstIndex = index * 2 + 1;
                secondIndex = firstIndex + 1;
            } else return;
        }
    }

    sortUp(index) {
        while(index > 0) {
            let parentIndex = (index - 1) >> 1;
            if (this.items[parentIndex].compareTo(this.items[index]) > 0) {
                this.swap(this.items[parentIndex], this.items[index]);
                index = parentIndex;
            } else return;
        }
    }

    get() {
        if (this.count === 0) return;
        let item = this.items[0];
        this.items[0] = this.items[--this.count];
        this.items[0].heapIndex = 0;
        this.sortDown(0);
        return item;
    }

    add(item) {
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

    heapify() {
        for (let i = (this.count >> 1) - 1; i >= 0; i--) {
            this.sortDown(i);
        }
    }

    contains(item) {
        return this.items[item.heapIndex] === item && item.heapIndex < this.count;
    }

    swap(item1, item2) {
        let tmp = item1.heapIndex;
        item1.heapIndex = item2.heapIndex;
        item2.heapIndex = tmp;
        this.items[item1.heapIndex] = item1;
        this.items[item2.heapIndex] = item2;
    }
}