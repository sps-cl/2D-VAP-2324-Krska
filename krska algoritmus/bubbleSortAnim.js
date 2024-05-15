class BubbleSortAnim extends sortAnim {
    async sortAsc(){
        for (var i = 0; i < this.values.length; i++) {

            let swap = false;
            let bound = this.values.length - i;

            for (let j = 1; j < bound; j++) {
                this.setCompareColor(this.columns[j - 1]);
                this.setCompareColor(this.columns[j]);
                await this.sleep(1);
                this.setDefaultColor(this.columns[j - 1]);
                this.setDefaultColor(this.columns[j]);
                if (this.values[j - 1] > this.values[j]) {
                    swap = true;
                    this.swapValues(j - 1, j)
                }
           }

           this.setSortedColor(this.columns[bound - 1]);
           if(!swap) break;
        }
        for (let index = 0; index < i; index++) {
            this.setSortedColor(this.columns[index]);
            
        }
    }
}