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
        if((index+1) <= this.length/2) {
            console.log('start from front');
        } else {
            console.log('start from back');
        }
        console.log(this.get(index).value); 
    }
}
// get, set test code
let list = new DoublyLinkedList();
console.log('get, set test code');
for(let i=0; i<100; i++) {
    list.push(i+1);
}

list.getTestCode(49); // 짝수개 & index 49 (50번째) -> start from front && value = 50
list.getTestCode(10); // 짝수개 & index 10          -> start from front && value = 11
list.getTestCode(50); // 짝수개 & index 50 (51번째) -> start from back && value = 51
list.getTestCode(90); // 짝수개 & index 90          -> start form back && value = 91
list.pop();
list.getTestCode(48); // 홀수개 & index 48 (49번째) -> start from front && value = 49
list.getTestCode(10); // 홀수개 & index 10          -> start from front && value = 11
list.getTestCode(49); // 홀수개 & index 49 (50번째) -> start from back && value = 50
list.getTestCode(90); // 홀수개 & index 90          -> start from back && value = 91
list.set(50,1000);
console.log(list.get(50).value);    //1000

