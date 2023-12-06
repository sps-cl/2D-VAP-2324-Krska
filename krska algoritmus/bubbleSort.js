class BubbleSort{

    static sortAsc(){

        for (let i = 0; i < array.length; i++) {

            let swap = false;
            
           for (let j = 0; j < array.length - 1; j++) {
            if (array[j - 1] > array[j]) {
                [arrsay[j -1], array[j]] = [array[j], array[j - 1]]
            }
            
           }
           if(!swap) return;
        }
    }
}