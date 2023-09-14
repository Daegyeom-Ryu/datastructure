class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value) {   // 맨 뒤에 삽입 후 리스트 반환
        let newNode = new Node(value);
        if(!this.head) {    
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() { // 맨 뒤 제거 후 제거 노드 반환
        if(!this.head)  return undefined;
        let poppedNode = this.tail;
        if(this.head === this.tail) {   // 노드 1개
            this.head = null;
            this.tail = null;
        } else {    // 노드 2개 이상
            let node = this.head;
            let tailBeforeNode;
            while(node.next) {   
                tailBeforeNode = node;
                node = node.next;
            }
            tailBeforeNode.next = null;
            this.tail = tailBeforeNode;
        }
        this.length--;
        return poppedNode;
    }
    unshift(value) {    // 맨 앞에 삽입 후 리스트 반환
        let newNode = new Node(value);
        if(!this.head) {    
            this.head = newNode;
            this.tail = newNode;
        } else {    
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift() {   // 맨 앞에서 삭제 후 삭제한 노드 반환
        if(!this.head)  return undefined;
        let oldHead = this.head;
        if(this.head === this.tail) {   // 노드 1개
            this.head = null;
            this.tail = null;
        } else {    // 노드 2개 이상
            this.head = oldHead.next;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }
    
}
let list = new SinglyLinkedList();
list.unshift(1);
list.unshift(2);
list.unshift(3);
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
console.log(list.shift());
console.log(list);
