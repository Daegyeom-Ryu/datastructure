class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) {
        let newNode = new Node(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        if(!this.head)  return undefined;
        let poppedNode = this.tail;
        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let beforeTail = this.tail.prev;
            beforeTail.next = null;
            this.tail = beforeTail;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode;
    }
    unshift(value) {
        let newNode = new Node(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift() {
        if(!this.head)  return undefined;
        let oldHead = this.head;
        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let newHead = this.head.next;
            newHead.prev = null;
            this.head = newHead;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }
    print() {
        let current = this.head;
        let arr = [];
        while(current) {
            arr.push(current.value);
            current = current.next;
        }
        console.log(arr);
        return arr;
    }
}
// unshift, shift test code
let list = new DoublyLinkedList();
console.log('unshift, shift test code');
list.unshift(5);
list.unshift(4);
list.unshift(3);
list.unshift(2);
list.unshift(1);
list.print(); // [1,2,3,4,5]
console.log(list.shift()); // 1 prev = null, next = null
console.log(list.shift()); // 2
console.log(list.shift()); // 3
list.print(); // [4,5]
console.log(list.shift()); // 4
console.log(list.shift()); // 5
console.log(list.shift()); // undefined

// push, pop, unshift, shift test code
console.log('push, pop, unshift, shift test code');
list.push(4);
list.unshift(3);
list.unshift(2);
list.push(5);
list.unshift(1);
list.print(); // [1,2,3,4,5]

console.log(list.pop()); // 5
console.log(list.shift()); // 1 
console.log(list.pop()); // 4
console.log(list.shift()); // 2  
console.log(list.pop()); // 3
console.log(list.pop()); // undefined; 