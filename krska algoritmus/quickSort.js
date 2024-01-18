class QuickSortAnim extends sortAnim {
    
    async sortAsc(){
        this.sortRecursive(0,this.values.length - 1)
    }

    async sortRecursive(low, high){

        if(low<high){
            let pi = await this.partitionomuto(low, high)
            await this.sortRecursive(low, pi -1)
            await this.sortRecursive(pi + 1, high)
        }
        else if (low == high){
            this.setSortedColor(this.columns[low])
        }
    }

    async partitionomuto(low, high){
        let pivot = this.values[high]
        let pi = low;
        this.setCompareColor(this.columns[high])
        for(let i = low; i < high; i++){
            this.setCompareColor(this.columns[i])
            await this.sleep(50)
            this.setDefaultColor(this.columns[i])
            if(this.values[i] < pivot) {
                this.swapValues(i,pi)
                pi++
            }
        }
        this.setSortedColor(this.columns[high])
        this.swapValues(pi, high);
        await this.sleep(50)
        return pi;
    }
         

    
}
