class QuickSortAnim extends sortAnim {
    
    async sortAsc(){
        this.sortRecursive(this.values,0,this.values.length - 1)
    }

    async sortRecursive(){
        if(low<high){
            let pi = this.partitionomuto(this.values, low, high)
            this.sortRecursive(this.values, low, pi -1)
            this.sortRecursive(this.values, pi + 1, high)
        }
    }

    async partitionomuto(  low, high){
        let pivot = this.values[high]
        let pi = low - 1
        for(let i = low; i < high; i++){
            if(this.values[i] < pivot) {
                pi++
                [this.values[i],this.values[pi]]=[this.values[pi],this.values[i]]
            }
        }
    }
         
    /*
    for (let index = 0; index < i; index++) {
        this.setSortedColor(this.columns[index]);
        
    }
    */
}
