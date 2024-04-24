let bubbleSortContainer = document.getElementById("bubblesort-div");
let insertionSortContainer = document.getElementById("insertionSort-div");
let shellSortContainer = document.getElementById("shellSort-div");
let quickSortContainer = document.getElementById("quickSort-div");
let mergeSortContainer = document.getElementById("mergeSort-div");
let countingSortContainer = document.getElementById("countingSort-div");

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

let shellSort = new ShellSortAnim(array, shellSortContainer);
shellSort.sortAsc();

let quickSort = new QuickSortAnim(array, quickSortContainer);
quickSort.sortAsc();

let mergeSort = new MergeSortAnim(array, mergeSortContainer);
mergeSort.sortAsc();

let countingSort = new CountingSortAnim(array, countingSortContainer);
countingSort.sortAsc();