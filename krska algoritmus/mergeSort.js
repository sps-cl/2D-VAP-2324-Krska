class MergeSortAnim extends sortAnim {
    async sortAsc(){
        for (var gap = this.values.length>>1; gap > 0; gap >>= 1) {
            for (var i = gap; i < this.values.length; i++){
                let j = i - gap;
                while(j>= 0 && this.values[j] > this.values[j + gap]){
                    this.setCompareColor(this.columns[j]);
                    this.setCompareColor(this.columns[j+ gap]);
                    await this.sleep(100);
                    this.setDefaultColor(this.columns[j]);
                    this.setDefaultColor(this.columns[j+ gap]);
                    this.swapValues(j,j + gap)
                    j-= gap;
                }
            }
        }
        for (let index = 0; index < i; index++) {
            this.setSortedColor(this.columns[index]);
            
        }
    }
}