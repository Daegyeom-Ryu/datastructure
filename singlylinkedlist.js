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
    get(index) {    // index에 해당하는 노드 리턴
        if(index < 0 || index >= this.length)   return null;
        let currNode = this.head;
        let count = 0;
        while(count < index) {
            currNode = currNode.next;
            count++;
        }
        return currNode;
    }
    set(index, value) { // index에 해당하는 노드의 값 업데이트 -> boolean 반환
        let foundNode = this.get(index);
        if(!foundNode)  return false;
        foundNode.value = value;
        return true;
    }
    insert(index, value) {  // 인덱스와 값을 받아서, 해당 인덱스에 노드 추가, boolean 반환
        if(index < 0 || index > this.length)   return false;
        if(index === 0) return !!this.unshift(value);   // 노드 하나도 없을 때 추가 || 노드 하나 있을 때 추가
        if(index === this.length)   return !!this.push(value);  // 노드 하나 있을 때 추가
        let beforeNode = this.get(index - 1);
        let afterNode = beforeNode.next;
        let insertedNode = new Node(value);
        beforeNode.next = insertedNode;
        insertedNode.next = afterNode;
        this.length++;
        return true;
    }
    remove(index) { // 인덱스를 받아서 해당 인덱스의 노드를 제거하고, 앞 뒤 값을 연결, 제거 노드 반환
        if(index < 0 || index >= this.length)    return undefined;
        if(index === 0) return this.shift();    // 노드 1개일 때 제거 || 노드 2개일 때 제거
        if(index === this.length - 1)   return this.pop();  //노드 2개일 때 제거
        
        let beforeNode = this.get(index - 1);
        let removedNode = beforeNode.next;
        beforeNode.next = removedNode.next;
        removedNode.next = null;
        this.length--;
        return removedNode;
    }
    reverse() { // 순서 역방향으로 만들기
        if(!this.head)  return undefined;
        if(this.head === this.tail) return this;
        
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        
        let prev = null;
        let next;
        while(node) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
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
// reverse test code
let list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.print(); // [1,2,3,4,5]
list.reverse();
list.print(); // [5,4,3,2,1]
