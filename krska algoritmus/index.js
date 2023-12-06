let BubbleSortContainer = document.getElementById("bubblesort-div");

let max = 30;
document.documentElement.style.setProperty("--max-value", max)

let array = new Array(max);
BubbleSortContainer.style.setProperty("--item-count", array.length)

for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * max) + 1;
}

let bubbleSort = new sortAnim(array, BubbleSortContainer);
bubbleSort.sortAsc();