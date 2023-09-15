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
    get(index) {
        if(index < 0 || index >= this.length)    return null;
        let currNode;
        if((index+1) <= Math.floor(this.length/2)) {
            currNode = this.head;
            for(let i=0; i<index; i++) {
                currNode = currNode.next;
            }
        } else {
            currNode = this.tail;
            for(let i=this.length-1; i>index; i--) {
                currNode = currNode.prev;
            }
        }
        return currNode;
    }
    set(index, value) {
        let foundNode = this.get(index);
        if(!foundNode)  return false;
        foundNode.value = value;
        return true;
    }
    insert(index, value) {
        if(index < 0 || index > this.length)    return false;
        if(index === 0) return !!this.unshift(value);
        if(index === this.length)   return !!this.push(value);
        let newNode = new Node(value);
        let beforeNode = this.get(index-1);
        let afterNode = beforeNode.next;
        beforeNode.next = newNode, newNode.next = afterNode;
        afterNode.prev = newNode, newNode.prev = beforeNode;
        this.length++;
        return true;
    }
    remove(index) {
        if(index < 0 || index >= this.length)   return undefined;
        if(index === 0) return this.shift();
        if(index === this.length - 1)   return this.pop();
        let beforeNode = this.get(index-1);
        let removedNode = beforeNode.next;
        beforeNode.next = removedNode.next, removedNode.next = null;
        beforeNode.next.prev = beforeNode, removedNode.prev = null;
        this.length--;
        return removedNode;
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
    getTestCode(index) {
        if((index+1) <= Math.floor(this.length/2)) {
            console.log('start from front');
        } else {
            console.log('start from back');
        }
        console.log(this.get(index).value); 
    }
}
// insert, remove test code
let list = new DoublyLinkedList();
list.insert(-1,100);
list.insert(0,1);
list.insert(1,3);
list.insert(2,5);
list.insert(1,2);
list.insert(3,4);
list.print(); // [1,2,3,4,5]

console.log(list.remove(5));    // undefined
console.log(list.remove(4));    // 5
console.log(list.remove(0));    // 1 
console.log(list.remove(1));    // 3
console.log(list.remove(1));    // 4
console.log(list.remove(0));    // 2
console.log(list.remove(0));    // undefined
