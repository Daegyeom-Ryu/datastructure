class Node {
    constructor(priority,value) {
        this.priority = priority;
        this.value = value;
        this.insertedTime = Date.now();
    }
}
class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(priority, value) {
        let newNode = new Node(priority, value);
        this.queue.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let childIdx = this.queue.length - 1;
        const child = this.queue[childIdx];
        while(childIdx > 0) {
            let parentIdx = Math.floor((childIdx-1)/2);
            const parent = this.queue[parentIdx];
            if(parent.priority <= child.priority)   break;
            this.queue[parentIdx] = child;
            this.queue[childIdx] = parent;
            childIdx = parentIdx;
        }
    }
    dequeue() {
        let min = this.queue[0];
        let end = this.queue.pop();
        if(this.queue.length > 0) {
            this.queue[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const element = this.queue[idx];
        while(true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let left, right;
            let swap = null;
            if(leftIdx < this.queue.length) {
                left = this.queue[leftIdx];
                if(element.priority > left.priority ||
                   element.priority === left.priority && element.insertedTime > left.insertedTime     
                )   swap = leftIdx;
            }    
            if(rightIdx < this.queue.length) {
                right = this.queue[rightIdx];
                if((!swap && element.priority > right.priority) || 
                   (!swap && (element.priority === right.priority && element.insertedTime > right.insertedTime)) ||
                   (swap && left.priority > right.priority) ||
                   (swap && (left.priority === right.priority && left.insertedTime > right.insertedTime))
                )  swap = rightIdx; 
            }   
            if(!swap)   break;
            this.queue[idx] = this.queue[swap];
            this.queue[swap] = element;
            idx = swap;
        }
    }
}
// complete priorityqueue duplicated priority problem
// inserted-first come out first;
let pq = new PriorityQueue();
setTimeout(()=>pq.enqueue(1,'first'),0);
setTimeout(()=>pq.enqueue(1,'second'),100);
setTimeout(()=>pq.enqueue(3,'first'),200);
setTimeout(()=>pq.enqueue(3,'second'),300);
setTimeout(()=>pq.enqueue(3,'third'),400);
setTimeout(()=>{
    let length = pq.queue.length;
    for(let i=0;i<length;i++) {
        console.log(pq.dequeue());
    }
},500);

// 1, 'first';
// 1, 'second';
// 3, 'first'
// 3, 'second';
// 3, 'third';




