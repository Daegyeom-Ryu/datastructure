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

        //   10
        // 5   15
       // 3 6 12 17   
// DFS preorder, inorder, postorder without Recursion and test code
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(3);
tree.insert(15);
tree.insert(12);
tree.insert(17);
tree.insert(6);

console.log(tree.DFSPreOrder());
console.log(tree.DFSPreOrderWithoutRecursion());
console.log(tree.DFSInOrder());
console.log(tree.DFSInOrderWithoutRecursion());
console.log(tree.DFSPostOrder());
console.log(tree.DFSPostOrderWithoutRecursion());
console.log(tree.BFS());
// console.log(tree.root); //10
// console.log(tree.root.left);//5
// console.log(tree.root.right);//15
// console.log(tree.root.left.left);//3
// console.log(tree.root.left.right);//6
// console.log(tree.root.right.left);//12
// console.log(tree.root.right.right);//17

