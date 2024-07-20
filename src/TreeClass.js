import { Node } from "./NodeClass";

export class Tree {
  constructor(arr) {
    this.array = arr;
    this.root = null;
  }

  buildTree(array = this.array) {
    // first, clean the array
    let cleanArr = this.cleanArray(array);

    // sort array
    let sortedArr = cleanArr.sort((a, b) => a - b);

    const start = 0;
    const end = sortedArr.length - 1;

    // base case
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);
    const firstHalfArr = sortedArr.slice(start, midPoint);
    const lastHalfArr = sortedArr.slice(midPoint + 1);

    // set the middle element of array as the root
    let rootNode = new Node(sortedArr[midPoint]);

    rootNode.left = this.buildTree(firstHalfArr);
    rootNode.right = this.buildTree(lastHalfArr);

    return (this.root = rootNode);
  }

  insert(val, currNode = this.root) {
    // base case
    if (!currNode) {
      return (this.root = new Node(val));
    }

    // check value doesn't already exist
    if (val === currNode.data) {
      return;
    }

    // recursive case
    if (val < currNode.data) {
      return currNode.left
        ? this.insert(val, currNode.left)
        : (currNode.left = new Node(val));
    } else {
      return currNode.right
        ? this.insert(val, currNode.right)
        : (currNode.right = new Node(val));
    }
  }

  delete(val, currNode = this.root) {
    // base case
    if (!currNode) {
      return currNode;
    }

    // traverse tree
    if (val < currNode.data) {
      currNode.left = this.delete(val, currNode.left);
    } else if (val > currNode.data) {
      currNode.right = this.delete(val, currNode.right);
    } else {
      // if node to be deleted has zero or one child
      if (!currNode.left) {
        return currNode.right;
      } else if (!currNode.right) {
        return currNode.left;
      } else {
        currNode.data = this.minVal(currNode.right);
        currNode.right = this.delete(currNode.data, currNode.right);
      }
    }
    return currNode;
  }

  find(val, currNode = this.root) {
    // base case
    if (!currNode) {
      return currNode;
    }

    if (val < currNode.data) {
      return this.find(val, currNode.left);
    } else if (val > currNode.data) {
      return this.find(val, currNode.right);
    } else {
      return currNode;
    }
  }

  // iterative approach
  levelOrderIterative(callback, queue = [this.root]) {
    // base case
    if (queue.length < 1) {
      return queue;
    }

    let output = [];

    // loop through queue calling function / adding to output and enqueuing any children
    while (queue.length > 0) {
      let current = queue[0];
      // if callback provided, provide node as an argument. If no callback, add node to output array
      typeof callback === "function" ? callback(current) : output.push(current);

      // if node has children, enqueue them
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }

      // dequeue node
      queue.shift();
    }

    if (output.length > 0) return output;
  }

  levelOrderRecursive(callback, queue = [this.root], output = []) {
    // base case
    if (queue.length < 1) {
      return queue;
    }

    // queue.push(root);

    let current = queue[0];

    typeof callback === "function" ? callback(current) : output.push(current);

    // if node has children, enqueue them
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }

    // dequeue node
    queue.shift();

    this.levelOrderRecursive(callback, queue, output);

    if (output.length > 0) return output;
  }

  inOrder(callback, root = this.root, output = []) {
    // base case
    if (!root) {
      root;
    }

    // traverse left subtree
    if (root.left) {
      this.inOrder(callback, root.left, output);
    }

    // visit root
    typeof callback === "function" ? callback(root) : output.push(root);

    // traverse right subtree
    if (root.right) {
      this.inOrder(callback, root.right, output);
    }

    if (output.length > 0) return output;
  }

  preOrder(callback, root = this.root, output = []) {
    // base case
    if (!root) {
      return root;
    }

    // visit root
    typeof callback === "function" ? callback(root) : output.push(root);

    // visit left subtree
    if (root.left) {
      this.preOrder(callback, root.left, output);
    }

    // visit right subtree
    if (root.right) {
      this.preOrder(callback, root.right, output);
    }

    if (output.length > 0) return output;
  }

  postOrder(callback, root = this.root, output = []) {
    // base case
    if (!root) return root;

    // visit left subtree
    if (root.left) this.postOrder(callback, root.left, output);

    // visit right subtree
    if (root.right) this.postOrder(callback, root.right, output);

    // visit root
    typeof callback === "function" ? callback(root) : output.push(root);

    if (output.length > 0) return output;
  }

  height(node = this.root) {
    // base case
    if (!node) return node;
    let lHeight = 0;
    let rHeight = 0;
    if (node.left) {
      lHeight = this.height(node.left);
    }

    if (node.right) {
      rHeight = this.height(node.right);
    }

    return lHeight > rHeight ? lHeight + 1 : rHeight + 1;
  }

  depth(node, root = this.root, counter = 0) {
    // base case
    if (!root) return root;

    // traverse tree
    if (node < root.data) return this.depth(node, root.left, counter + 1);
    else if (node > root.data) return this.depth(node, root.right, counter + 1);

    return counter;
  }

  isBalanced(root = this.root) {
    // base case
    if (!root) return 0;

    // check if left subtree is balanced
    let lHeight = this.isBalanced(root.left);
    if (lHeight === -1) return -1;

    // check if right subtree is balanced
    let rHeight = this.isBalanced(root.right);
    if (rHeight === -1) return -1;

    // check balanced
    if (Math.abs(lHeight - rHeight) > 1) return -1;

    return 1 + Math.max(lHeight, rHeight);
  }

  rebalance(root = this.root) {
    // inOrder traversal of current tree
    const sortedObjArr = this.inOrder();

    // currently have array of objects, we need array of values
    let sortedArr = [];
    sortedObjArr.forEach((node) => {
      sortedArr.push(node.data);
    });

    // build rebalanced tree
    this.buildTree(sortedArr);
  }
  // helper functions

  // find the in order successor
  minVal(currNode) {
    return currNode.left ? this.minVal(currNode.left) : currNode.data;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  cleanArray(array) {
    let cleanArr = [];
    array.forEach((elem) => {
      if (!cleanArr.includes(elem)) {
        cleanArr.push(elem);
      }
    });
    return cleanArr;
  }
}
