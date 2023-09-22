class BinaryMaxHeap {
    constructor() {
        this.values = [];
    }
    insert(value) {
        this.values.push(value);
        this.bubbleUp();
    }
    bubbleUp() {
        let childIdx = this.values.length - 1;
        const child = this.values[childIdx];
        while(childIdx > 0) {
            let parentIdx = Math.floor((childIdx - 1) / 2);
            const parent = this.values[parentIdx];
            if(parent >= child)  break;
            this.values[parentIdx] = child;
            this.values[childIdx] = parent;
            childIdx = parentIdx;
        }
    }
    extractMax() {
        let max = this.values[0];
        let end = this.values.pop();
        if(this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }
    sinkDown() {
        let idx = 0;
        const element = this.values[idx];
        while(true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let left, right;
            let swap = null;
            if(leftIdx < this.values.length)    left = this.values[leftIdx];
            if(rightIdx < this.values.length)   right = this.values[rightIdx];

            if(left && element < left)  swap = leftIdx;
            if(right && ((!swap && element < right) || (swap && left < right)))   swap = rightIdx;

            if(!swap)   break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
// insert and extractMax test code
let heap = new BinaryMaxHeap();
heap.insert(1);
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(6);
heap.insert(7);
console.log(heap.values);   // [7, 4, 6, 1, 3, 2, 5]
heap.extractMax(); 
console.log(heap.values);   // [6, 4, 5, 1, 3, 2]
heap.extractMax();
console.log(heap.values);   // [5, 4, 2, 1, 3]
heap.extractMax();
console.log(heap.values);   // [4, 3, 2, 1]
heap.extractMax();
console.log(heap.values);   // [3, 1, 2]
heap.extractMax();
console.log(heap.values);   // [2, 1]
heap.extractMax();
console.log(heap.values);   // [1]
heap.extractMax();
console.log(heap.values);   // []
heap.extractMax();
console.log(heap.values);   // []