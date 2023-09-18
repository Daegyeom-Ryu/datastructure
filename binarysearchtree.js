class Node {    // tree node
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    enqueue(treeNode) { 
        if(!this.first) {
            this.first = treeNode;
            this.last = treeNode;
        } else {
            this.last.next = treeNode;
            this.last = treeNode;
        }
        this.length++;
        return this;
    }
    dequeue() {
        if(!this.first) return undefined;
        let oldFirst = this.first;
        if(this.first === this.last) {
            this.first = null;
            this.last = null;
        } else {
            this.first = oldFirst.next;
            delete oldFirst.next;   // enqueue에서 node에 추가된 next property 제거
        }
        this.length--;
        return oldFirst;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        let newNode = new Node(value);
        if(!this.root) {
            this.root = newNode;
            return this;
        }
        let currNode = this.root;
        while(true) {
            if(value === currNode.value)    return undefined;
            if(value < currNode.value) {
                if(!currNode.left) {
                    currNode.left = newNode;
                    return this;
                }   
                currNode = currNode.left;
            } else {
                if(!currNode.right) {
                    currNode.right = newNode;
                    return this;
                }
                currNode = currNode.right;
            }
        }
    }
    findMinNodeFromRightSubTree(lChild, rChild) {
        let min = rChild;
        let parentOfMin;
        while(min.left) {
            parentOfMin = min;
            min = parentOfMin.left;
        }
        if(rChild !== min) {
            parentOfMin.left = min.right;
            min.right = rChild;
            min.left = lChild;
        }
        return min;
    }
    findMaxNodeFromLeftSubTree(lChild, rChild) {
        let max = lChild;
        let parentOfMax;
        while(max.right) {
            parentOfMax = max;
            max = parentOfMax.right;
        }
        if(lChild !== max) {
            parentOfMax.right = max.left;
            max.left = lChild;
            max.right = rChild;
        }
        return max;
    }
    remove(value) {
        if(!this.root)  return undefined;
        // root노드 제거가 아닌 경우
        let curr = this.root;
        let parentOfCurr;
        while(curr) {
            if(value < curr.value) {
                parentOfCurr = curr;
                curr = curr.left;
            } else if(value > curr.value){
                parentOfCurr = curr;
                curr = curr.right;
            } else {
                let lChildOfCurr = curr.left;
                let rChildOfCurr = curr.right;
                if(!lChildOfCurr && !rChildOfCurr) {
                    if(value < parentOfCurr.value)    parentOfCurr.left = null;                    
                    if(value > parentOfCurr.value)    parentOfCurr.right = null;
                } else if(lChildOfCurr && !rChildOfCurr) {
                    let altCurr = this.findMaxNodeFromLeftSubTree(lChildOfCurr,rChildOfCurr);
                    if(value < parentOfCurr.value)  parentOfCurr.left = altCurr;
                    if(value > parentOfCurr.value)  parentOfCurr.right = altCurr;
                    curr.left = null;
                } else if(!lChildOfCurr && rChildOfCurr) {
                    let altCurr = this.findMinNodeFromRightSubTree(lChildOfCurr,rChildOfCurr);
                    if(value < parentOfCurr.value)  parentOfCurr.left = altCurr;
                    if(value > parentOfCurr.value)  parentOfCurr.right = altCurr;
                    curr.right = null;
                } else {
                    let altCurr = this.findMinNodeFromRightSubTree(lChildOfCurr,rChildOfCurr);
                    if(value < parentOfCurr.value)  parentOfCurr.left = altCurr;
                    if(value > parentOfCurr.value)  parentOfCurr.right = altCurr;
                    curr.left = null;
                    curr.right = null;
                }
                return curr; 
            }
        }
    }
    find(value) {
        if(!this.root)  return undefined;
        let currNode = this.root;
        let found = false;
        while(currNode && !found) {
            if(value < currNode.value) {
                currNode = currNode.left;
            } else if(value > currNode.value) {
                currNode = currNode.right;
            } else {
                found = true;
            }
        }
        if(!found)  return undefined;
        return currNode;
    }
    DFSPreOrder() {
        let result = [];
        let currNode = this.root;
        function preOrder(currNode) {
            if(!currNode)  return;
            result.push(currNode.value);
            if(currNode.left)   preOrder(currNode.left);
            if(currNode.right)  preOrder(currNode.right);
        }
        preOrder(currNode);
        return result;
    }
    DFSPreOrderWithoutRecursion() {
        let result = [];
        let current = this.root;
        function preOrder(current) {
            if(!current)  return;
            let stack = [];
            stack.push(current);
            while(stack.length > 0) {
                let currNode = stack.pop();
                result.push(currNode.value);
                if(currNode.right)  stack.push(currNode.right);
                if(currNode.left)   stack.push(currNode.left);
            }
        }
        preOrder(current);
        return result;
    }
    DFSInOrder() {
        let result = [];
        let currNode = this.root;
        function inOrder(currNode) {
            if(!currNode)  return;
            if(currNode.left)   inOrder(currNode.left);
            result.push(currNode.value);
            if(currNode.right)  inOrder(currNode.right);
        }
        inOrder(currNode);
        return result;
    }
    DFSInOrderWithoutRecursion() {
        let result = [];
        let current = this.root;
        function inOrder(current) {
            if(!current)   return;
            let stack = [], visited = [];
            stack.push(current);
            while(stack.length > 0) {
                let currNode = stack[stack.length-1];
                if(currNode.left && !visited.includes(currNode.left)) {
                    stack.push(currNode.left);
                    visited.push(currNode.left);                    
                    continue;
                }
                currNode = stack.pop();
                result.push(currNode.value);
                if(currNode.right && !visited.includes(currNode.right)) {
                    stack.push(currNode.right);
                    visited.push(currNode.right);
                }
            }
        }
        inOrder(current);
        return result;
    }
    DFSPostOrder() {
        let result = [];
        let currNode = this.root;
        function postOrder(currNode) {
            if(!currNode)  return;
            if(currNode.left)   postOrder(currNode.left);
            if(currNode.right)  postOrder(currNode.right);
            result.push(currNode.value);
        }
        postOrder(currNode);
        return result;
    }
    DFSPostOrderWithoutRecursion() {
        let result = [];
        let current = this.root;
        function postOrder(current) {
            if(!current)   return;
            let stack = [], visited = [];
            stack.push(current);
            while(stack.length > 0) {
                let currNode = stack[stack.length - 1];
                if(currNode.right && !visited.includes(currNode.right)) {
                    stack.push(currNode.right);
                    visited.push(currNode.right);
                }
                if(currNode.left && !visited.includes(currNode.left)) {
                    stack.push(currNode.left);
                    visited.push(currNode.left);
                    continue;
                }
                currNode = stack.pop();
                result.push(currNode.value);
            }   
        }
        postOrder(current);
        return result;
    }
    BFS() {
        if(!this.root) return;
        let queue = new Queue();
        let result = [];
        queue.enqueue(this.root);
        while(queue.length > 0) {
            let node = queue.dequeue();
            result.push(node.value);
            if(node.left)   queue.enqueue(node.left);
            if(node.right)  queue.enqueue(node.right);  
        }
        return result;
    }
}

// remove and test code (except root remove);
let tree = new BinarySearchTree();
tree.insert(30);
tree.insert(10);
tree.insert(50);
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(9);
tree.insert(8);
tree.insert(20);
tree.insert(18);
tree.insert(14);
tree.insert(16);
tree.insert(15);
tree.insert(17);
tree.insert(40);
tree.insert(35);
tree.insert(45);
tree.insert(49);
tree.insert(48);
tree.insert(47);
console.log(tree.remove(10));

console.log(tree.root.value); // 30 
console.log(tree.root.left.value);    // 14    
console.log(tree.root.left.left.value);   // 5    
console.log(tree.root.left.left.left.value);  // 3 
console.log(tree.root.left.left.right.value); // 7
console.log(tree.root.left.left.right.right.value);   // 9
console.log(tree.root.left.left.right.right.left.value);    // 8

console.log(tree.root.left.right.value);  // 20
console.log(tree.root.left.right.left.value); // 18
console.log(tree.root.left.right.left.left.value);    // 16
console.log(tree.root.left.right.left.left.left.value);  // 15
console.log(tree.root.left.right.left.left.right.value); // 17








