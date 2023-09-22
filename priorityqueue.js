class Node {
    constructor(priority,value) {
        this.value = value;
        this.priority = priority;
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
                if(element.priority > left.priority)    swap = leftIdx;
            }    
            if(rightIdx < this.queue.length) {
                right = this.queue[rightIdx];
                if((!swap && element.priority > right.priority) || 
                   (swap && left.priority > right.priority)
                )   swap = rightIdx;
            }   
            if(!swap)   break;
            this.queue[idx] = this.queue[swap];
            this.queue[swap] = element;
            idx = swap;
        }
    }
}
// priorityqueue enqueue, dequeue method and test code;
let pq = new PriorityQueue();
pq.enqueue(3,'10억 부자');
pq.enqueue(5,'마음 부자');
pq.enqueue(2,'100억 부자');
pq.enqueue(4,'1억 부자');
pq.enqueue(1,'1000억 부자');

for(let i=0;i<6;i++) {
    console.log(pq.dequeue());
}


