let bubbleSortContainer = document.getElementById("bubblesort-div");
let insertionSortContainer = document.getElementById("insertionSort-div");

let max = 30;
document.documentElement.style.setProperty("--max-value", max)

let array = new Array(max);
bubbleSortContainer.style.setProperty("--item-count", array.length)




for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * max) + 1;
}

let bubbleSort = new BubbleSortAnim(array, bubbleSortContainer);
bubbleSort.sortAsc();

let insertionSort = new InsertionSortAnim(array, insertionSortContainer);
insertionSort.sortAsc();