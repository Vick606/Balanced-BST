import { Node } from './node';

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Remove duplicates and sort the array
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

    const buildBalancedTree = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(uniqueSortedArray[mid]);

      node.left = buildBalancedTree(start, mid - 1);
      node.right = buildBalancedTree(mid + 1, end);

      return node;
    };

    return buildBalancedTree(0, uniqueSortedArray.length - 1);
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (node === null) return new Node(value);
      
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = insertNode(node.right, value);
      }
      
      return node;
    };

    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    const removeNode = (node, value) => {
      if (node === null) return null;
      
      if (value < node.data) {
        node.left = removeNode(node.left, value);
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
      } else {
        // Node to delete found
        
        // Case 1: Leaf node
        if (node.left === null && node.right === null) {
          return null;
        }
        
        // Case 2: Node with only one child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        
        // Case 3: Node with two children
        let tempNode = this.findMinNode(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
      }
      
      return node;
    };

    this.root = removeNode(this.root, value);
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) return current;
      current = value < current.data ? current.left : current.right;
    }
    return null;
  }

  levelOrder(callback) {
    if (!this.root) return [];
    
    const queue = [this.root];
    const result = [];
    
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return callback ? undefined : result;
  }

  inOrder(callback) {
    const traverse = (node, result) => {
      if (node === null) return;
      
      traverse(node.left, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      traverse(node.right, result);
    };
    
    const result = [];
    traverse(this.root, result);
    return callback ? undefined : result;
  }

  preOrder(callback) {
    const traverse = (node, result) => {
      if (node === null) return;
      
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      traverse(node.left, result);
      traverse(node.right, result);
    };
    
    const result = [];
    traverse(this.root, result);
    return callback ? undefined : result;
  }

  postOrder(callback) {
    const traverse = (node, result) => {
      if (node === null) return;
      
      traverse(node.left, result);
      traverse(node.right, result);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    };
    
    const result = [];
    traverse(this.root, result);
    return callback ? undefined : result;
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current !== null) {
      if (node.data === current.data) return depth;
      depth++;
      current = node.data < current.data ? current.left : current.right;
    }
    return -1; // Node not found
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return true;
      
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      
      return checkBalance(node.left) && checkBalance(node.right);
    };
    
    return checkBalance(this.root);
  }

  rebalance() {
    const nodes = this.inOrder();
    this.root = this.buildTree(nodes);
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};