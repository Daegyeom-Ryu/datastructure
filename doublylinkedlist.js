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
// push, pop test code
let list = new DoublyLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.print(); // [1,2,3,4,5]
console.log(list.pop()) // 5 prev=null, next=null 
console.log(list.pop()) // 4
console.log(list.pop()) // 3
list.print(); // [1,2]
console.log(list.pop()) // 2
console.log(list.pop()) // 1
console.log(list.pop()) // undefined
