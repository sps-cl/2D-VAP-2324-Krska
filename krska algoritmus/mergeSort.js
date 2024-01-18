class MergeSortAnim extends sortAnim {
    async sortAsc() {
        let array1 = new Array(this.values.length);
        for (let i = 0; i < this.values.length; i++) {
            array1[i] = this.values[i]
        }
        let array2 = new Array(this.values.length);
        for (let size = 1; size < this.values.length; size *= 2) {
           for (let low = 0; low < this.values.length; low += size * 2) {
                let mid = low + size;
                if (mid >= this.values.length) mid = this.values.length -1;
                let high = low + size * 2;
                if (high > this.values.length) high = this.values.length;
                let i = low, j = mid, k = low;
                while(i < mid && j < high) {
                    this.setCompareColor(this.columns[i]);
                    this.setCompareColor(this.columns[k]);
                    this.setCompareColor(this.columns[j]);
                    await this.sleep(50);
                    this.setDefaultColor(this.columns[i]);
                    this.setDefaultColor(this.columns[k]);
                    this.setDefaultColor(this.columns[j]);
                    if (array1[i] < array1[j]) {
                        array2[k] = array1[i];
                        this.setValue(k, array1[i])
                        await this.sleep(50);
                        i++
                    } else {
                        array2[k] = array1[j];
                        this.setValue(k, array1[j])
                        j++;
                
                    }
                    k++;
                }
                while(i < mid) {
                    array2[k] = array1[i];
                    this.setValue(k, array1[i])
                    i++;
                    k++;
                }
                while(j < high) {
                    array2[k] = array1[j];
                    this.setValue(k, array1[j])
                    j++;
                    k++;
                }
            }
            [array1, array2] = [array2, array1];
           }
           for (let index = 0; index < this.values.length; index++) {
            this.setSortedColor(this.columns[index])
           }
        }
}