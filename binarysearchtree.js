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
        this.size = 0;
    }
    enqueue(treeNode) { 
        if(!this.first) {
            this.first = treeNode;
            this.last = treeNode;
        } else {
            this.last.next = treeNode;
            this.last = treeNode;
        }
        this.size++;
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
        this.size--;
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
        let visited = [];
        function preOrder(currNode) {
            if(!currNode)  return;
            visited.push(currNode.value);
            if(currNode.left)   preOrder(currNode.left);
            if(currNode.right)  preOrder(currNode.right);
        }
        preOrder(this.root);
        return visited;
    }
    DFSInOrder() {
        let visited = [];
        function inOrder(currNode) {
            if(!currNode)  return;
            if(currNode.left)   inOrder(currNode.left);
            visited.push(currNode.value);
            if(currNode.right)  inOrder(currNode.right);
        }
        inOrder(this.root);
        return visited;
    }
    DFSPostOrder() {
        let visited = [];
        function postOrder(currNode) {
            if(!currNode)  return;
            if(currNode.left)   postOrder(currNode.left);
            if(currNode.right)  postOrder(currNode.right);
            visited.push(currNode.value);
        }
        postOrder(this.root);
        return visited;
    }
    BFS() {
        if(!this.root) return;
        let queue = new Queue();
        let visited = [];
        queue.enqueue(this.root);
        while(queue.size > 0) {
            let node = queue.dequeue();
            visited.push(node.value);
            if(node.left)   queue.enqueue(node.left);
            if(node.right)  queue.enqueue(node.right);  
        }
        return visited;
    }
}

        //   10
        // 5   15
       // 3 6 12 17   
// DFS preorder, inorder, postorder / BFS test code
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(3);
tree.insert(15);
tree.insert(12);
tree.insert(17);
tree.insert(6);
console.log(tree.DFSPreOrder());
console.log(tree.DFSInOrder());
console.log(tree.DFSPostOrder());
console.log(tree.BFS());
console.log(tree.root); //10
console.log(tree.root.left);//5
console.log(tree.root.right);//15
console.log(tree.root.left.left);//3
console.log(tree.root.left.right);//6
console.log(tree.root.right.left);//12
console.log(tree.root.right.right);//17

