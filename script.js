function calculateMinCost() {

    let input = document.getElementById("rope-lengths").value.trim();

    if (input.length === 0) {
        document.getElementById("result").innerText = "Please enter rope lengths!";
        return;
    }

    let arr = input.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));

    if (arr.length === 0) {
        document.getElementById("result").innerText = "Invalid Input!";
        return;
    }

    const result = minCost(arr);
    document.getElementById("result").innerText = result;
}

// Min Cost Function using Min-Heap
function minCost(arr) {

    class MinHeap {
        constructor() {
            this.heap = [];
        }
        push(val) {
            this.heap.push(val);
            this.bubbleUp();
        }
        bubbleUp() {
            let i = this.heap.length - 1;
            while (i > 0) {
                let p = Math.floor((i - 1) / 2);
                if (this.heap[p] <= this.heap[i]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            let top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return top;
        }
        bubbleDown() {
            let i = 0;
            let n = this.heap.length;

            while (true) {
                let l = 2 * i + 1;
                let r = 2 * i + 2;
                let smallest = i;

                if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
                if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;

                if (smallest === i) break;

                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }
        size() {
            return this.heap.length;
        }
    }

    const heap = new MinHeap();
    arr.forEach(x => heap.push(x));

    let cost = 0;

    while (heap.size() > 1) {
        let a = heap.pop();
        let b = heap.pop();
        let sum = a + b;
        cost += sum;
        heap.push(sum);
    }

    return cost;
}
