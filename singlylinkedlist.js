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
}
let list = new SinglyLinkedList();
list.push(3);
list.push(2);
list.push(1);
console.log(list);
list.pop();
console.log(list);
list.pop();
console.log(list);
list.pop();
console.log(list);
list.pop();
console.log(list);