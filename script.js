document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("ropes").value.trim();

    if (input.length === 0) {
        document.getElementById("result").innerText = "Please enter rope lengths!";
        return;
    }

    // Convert comma-separated input into array of numbers
    let arr = input.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));

    if (arr.length === 0) {
        document.getElementById("result").innerText = "Invalid input!";
        return;
    }

    const result = minCost(arr);
    document.getElementById("result").innerText = result;
});

// Function to calculate minimum cost using Min-Heap
function minCost(arr) {
    // Create a Min Heap
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        push(val) {
            this.heap.push(val);
            this.bubbleUp();
        }
        bubbleUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let parent = Math.floor((index - 1) / 2);
                if (this.heap[parent] <= this.heap[index]) break;
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            }
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return min;
        }
        bubbleDown() {
            let index = 0;
            const length = this.heap.length;
            while (true) {
                let left = 2 * index + 1;
                let right = 2 * index + 2;
                let smallest = index;

                if (left < length && this.heap[left] < this.heap[smallest]) {
                    smallest = left;
                }
                if (right < length && this.heap[right] < this.heap[smallest]) {
                    smallest = right;
                }
                if (smallest === index) break;

                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }
        size() {
            return this.heap.length;
        }
    }

    // Use Min-Heap to find minimum cost
    const heap = new MinHeap();

    for (let x of arr) heap.push(x);

    let totalCost = 0;

    while (heap.size() > 1) {
        let first = heap.pop();
        let second = heap.pop();

        let cost = first + second;
        totalCost += cost;

        heap.push(cost);
    }

    return totalCost;
}
