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
        let parentOfMin = null;
        while(min.left) {
            parentOfMin = min;
            min = parentOfMin.left;
        }
        if(parentOfMin) {
            parentOfMin.left = min.right;
            min.right = rChild;
        }
        min.left = lChild;
        return min;
    }
    findMaxNodeFromLeftSubTree(lChild, rChild) {
        let max = lChild;
        let parentOfMax;
        while(max.right) {
            parentOfMax = max;
            max = parentOfMax.right;
        }
        if(parentOfMax) {
            parentOfMax.right = max.left;
            max.left = lChild;
        }
        max.right = rChild;
        return max;
    }
    remove(value) {
        if(!this.root)  return undefined;
        let curr = this.root;
        let parentOfCurr = null;
        while(curr) {
            if(value < curr.value) {
                parentOfCurr = curr;
                curr = curr.left;
                continue;
            } else if(value > curr.value){
                parentOfCurr = curr;
                curr = curr.right;
                continue;
            } 
            let lChildOfCurr = curr.left;
            let rChildOfCurr = curr.right;
            if(!lChildOfCurr && !rChildOfCurr) {
                if(!parentOfCurr)   this.root = null;
                else    value < parentOfCurr.value ? parentOfCurr.left = null : parentOfCurr.right = null;
            } else if(lChildOfCurr && !rChildOfCurr) {
                let altCurr = this.findMaxNodeFromLeftSubTree(lChildOfCurr,rChildOfCurr);
                if(!parentOfCurr)   this.root = altCurr;
                else    value < parentOfCurr.value ? parentOfCurr.left = altCurr : parentOfCurr.right = altCurr;
                curr.left = null;
            } else if(!lChildOfCurr && rChildOfCurr) {
                let altCurr = this.findMinNodeFromRightSubTree(lChildOfCurr,rChildOfCurr);
                if(!parentOfCurr)   this.root = altCurr;
                else    value < parentOfCurr.value ? parentOfCurr.left = altCurr : parentOfCurr.right = altCurr;
                curr.right = null;
            } else {
                let altCurr = this.findMinNodeFromRightSubTree(lChildOfCurr,rChildOfCurr);
                if(!parentOfCurr)   this.root = altCurr;
                else    value < parentOfCurr.value ? parentOfCurr.left = altCurr : parentOfCurr.right = altCurr;
                curr.left = null;
                curr.right = null;
            }
            return curr; 
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

// remove and case test code;
console.log('----------------------------------------------------------------------');
console.log('root remove && noChild');
let tree = new BinarySearchTree();  
tree.insert(10);
tree.remove(tree.root);   // 10
let result = tree.root === null ? 'success' : 'fail';
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('root remove && only leftSubTree && leftChild is max of leftSubTree');
tree = new BinarySearchTree(); 
tree.insert(10).insert(5).insert(3).insert(4);
tree.remove(tree.root.value); // 10 
let success = tree.root.value === 5 && tree.root.right === null 
            && tree.root.left.value === 3 && tree.root.left.right.value === 4;
result = success ? 'success' : 'fail';
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('root remove && only rightSubTree && rightChild is min of rightSubTree');
tree = new BinarySearchTree(); 
tree.insert(10).insert(12).insert(16).insert(13);
tree.remove(tree.root.value); // 10 
success = tree.root.value === 12 && tree.root.left === null 
        && tree.root.right.value === 16 && tree.root.right.left.value === 13;
result = success ? 'success' : 'fail';
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('root remove && two SubTree && rightChild is min of rightSubTree');
tree = new BinarySearchTree();  
tree.insert(10).insert(5).insert(12).insert(14).insert(13);
tree.remove(tree.root.value); // 10 
success = tree.root.value === 12 && tree.root.left.value === 5 
        && tree.root.right.value === 14 && tree.root.right.left.value === 13;
result = success ? 'success' : 'fail';
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('root remove && two SubTree');
tree = new BinarySearchTree();  
tree.insert(10).insert(5).insert(15).insert(13).insert(14);
tree.remove(tree.root.value);   // 10
success = tree.root.value === 13 && tree.root.left.value === 5
        && tree.root.right.value === 15 && tree.root.right.left.value === 14;
result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && only leftSubTree && leftChild is max');
tree = new BinarySearchTree();  
tree.insert(20).insert(10).insert(30).insert(5).insert(3).insert(4);
let parentOfCurr = tree.root;
let curr = parentOfCurr.left;
tree.remove(curr.value);    // 10
success = tree.root.value === 20 && tree.root.left.value === 5 && tree.root.right.value === 30
        && tree.root.left.left.value === 3 && tree.root.left.left.right.value === 4;
result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && only leftSubtree');
tree = new BinarySearchTree();  
tree.insert(20).insert(10).insert(30).insert(5).insert(6).insert(3).insert(8).insert(7); 
parentOfCurr = tree.root;
curr = parentOfCurr.left;
tree.remove(curr.value);    // 10
success = tree.root.value === 20 && tree.root.right.value === 30 && tree.root.left.value === 8 
        && tree.root.left.left.value === 5 && tree.root.left.left.left.value === 3 
        && tree.root.left.left.right.value === 6 && tree.root.left.left.right.right.value === 7;
result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && only rightSubTree && rightChild is min');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(13).insert(15).insert(14);
parentOfCurr = tree.root;
curr = parentOfCurr.left;
tree.remove(curr.value);    // 10

success = tree.root.value === 20 && tree.root.left.value === 13 && tree.root.right.value === 30 
        && tree.root.left.right.value === 15 && tree.root.left.right.left.value === 14;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && only rightSubtree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(13).insert(11).insert(12);
parentOfCurr = tree.root;
curr = parentOfCurr.left;
tree.remove(curr.value);    // 10

success = tree.root.value === 20 && tree.root.left.value === 11 && tree.root.right.value === 30 
        && tree.root.left.right.value === 13 && tree.root.left.right.left.value === 12;

result = success ? 'success' : 'fail';        
console.log(result);
console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && two SubTree && rightChild is min of rightSubTree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(7).insert(30).insert(13).insert(15).insert(14);
parentOfCurr = tree.root;
curr = parentOfCurr.left; 
tree.remove(curr.value);    // 10

success = tree.root.value === 20 && tree.root.left.value === 13 && tree.root.right.value === 30
        && tree.root.left.left.value === 7 && tree.root.left.right.value === 15 && tree.root.left.right.left.value === 14;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && two SubTree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(7).insert(30).insert(13).insert(11).insert(12);
parentOfCurr = tree.root;
curr = parentOfCurr.left; 
tree.remove(curr.value);    // 10

success = tree.root.value === 20 && tree.root.left.value === 11 && tree.root.right.value === 30
        && tree.root.left.left.value === 7 && tree.root.left.right.value === 13 && tree.root.left.right.left.value === 12;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.right) remove && only leftSubTree && leftChild is max');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(25).insert(23).insert(24);
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10 && tree.root.right.value === 25 
        && tree.root.right.left.value === 23 && tree.root.right.left.right.value === 24;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.right) remove && only leftSubtree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(25).insert(27).insert(26).insert(29).insert(28);
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10 && tree.root.right.value === 29
        && tree.root.right.left.value === 25 && tree.root.right.left.right.value === 27
        && tree.root.right.left.right.left.value === 26 && tree.root.right.left.right.right.value === 28;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.right) remove && only rightSubTree && rightChild is min');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(35).insert(38).insert(36).insert(39); 
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10 && tree.root.right.value === 35
        && tree.root.right.right.value === 38 && tree.root.right.right.left.value === 36
        && tree.root.right.right.right.value === 39;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.right) remove && only rightSubtree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(36).insert(34).insert(32).insert(35).insert(33);
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10
        && tree.root.right.value === 32 && tree.root.right.right.value === 36
        && tree.root.right.right.left.value === 34 && tree.root.right.right.left.left.value === 33
        &&tree.root.right.right.left.right.value === 35;

result = success ? 'success' : 'fail';        
console.log(result);

console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.right) remove && two SubTree && rightChild is min of rightSubTree');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(25).insert(35).insert(34).insert(38).insert(31).insert(32); 
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10
        && tree.root.right.value === 31 && tree.root.right.left.value === 25
        && tree.root.right.right.value === 35 && tree.root.right.right.left.value === 34
        && tree.root.right.right.right.value === 38 && tree.root.right.right.left.left.value === 32;

result = success ? 'success' : 'fail';        
console.log(result);
console.log('----------------------------------------------------------------------');
console.log('curr(parentOfCurr.left) remove && two SubTree(use rightSubTree)');
tree = new BinarySearchTree(); 
tree.insert(20).insert(10).insert(30).insert(25).insert(35).insert(38).insert(36).insert(39); 
parentOfCurr = tree.root;
curr = parentOfCurr.right; 
tree.remove(curr.value);    // 30

success = tree.root.value === 20 && tree.root.left.value === 10 && tree.root.right.value === 35
        && tree.root.right.left.value === 25&& tree.root.right.right.value === 38
        && tree.root.right.right.left.value === 36&& tree.root.right.right.right.value === 39;

result = success ? 'success' : 'fail';        
console.log(result);
console.log('----------------------------------------------------------------------');
