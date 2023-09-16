class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
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
}

        //   10
        // 5   15
       // 3 6 12 17   
// insert, find test code
let tree = new BinarySearchTree();
console.log(tree.find(10)); // undefined;
tree.insert(10);
tree.insert(5);
tree.insert(5); // 중복 생략
tree.insert(3);
tree.insert(15);
tree.insert(12);
tree.insert(17);
tree.insert(6);
console.log(tree.root.left.value);        // 5
console.log(tree.root.left.left.value);   // 3
console.log(tree.root.left.right.value);  // 6
console.log(tree.root.right.value);       // 15
console.log(tree.root.right.left.value);  // 12
console.log(tree.root.right.right.value); // 17
console.log(tree.find(10).value);         // 10
console.log(tree.find(5).value);          // 5
console.log(tree.find(17).value);         // 17
console.log(tree.find(20));               // undefined