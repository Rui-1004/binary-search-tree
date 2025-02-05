class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array, start, end) {
    this.root = buildTree(array, start, end);
  }

  getLeaf(root) {
    // root = root.left;

    while (root.left != null && root.right != null) {
      root = root.right;
    }
    return root;
  }

  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left === null) return root.right;

      if (root.right === null) return root.left;

      let leaf = this.getLeaf(root);

      root.data = leaf.data;

      if (root.right.data === leaf.data) {
        root.right = this.deleteItem(leaf.data, root.right);
      } else {
        root.left = this.deleteItem(leaf.data, root.left);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return root;
    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    } else return root;
  }

  levelOrder(callback, root = this.root) {
    if (typeof callback !== 'function') throw Error("Expected a callback, got something else.");
    if (root === null) return root;

    let queue = [];
    let current;

    queue.push(root);

    while (queue.length > 0) {
      current = queue.shift();

      if(current.left != null) queue.push(current.left);
      if(current.right != null) queue.push(current.right);

      callback(current);
    }
  }

  preOrder(callback, root = this.root) {
    if (typeof callback !== 'function') throw Error("Expected a callback, got something else.");
    if (root === null) return root;

    callback(root);
    root.left = this.preOrder(callback, root.left);
    root.right = this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== 'function') throw Error("Expected a callback, got something else.");
    if (root === null) return root;

    root.left = this.inOrder(callback, root.left);
    callback(root);
    root.right = this.inOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (typeof callback !== 'function') throw Error("Expected a callback, got something else.");
    if (root === null) return root;

    root.left = this.postOrder(callback, root.left);
    root.right = this.postOrder(callback, root.right);
    callback(root);
  }

  log(node) {
    console.log(node);
  }

  height(node) {
    if (node === null) return -1;
    let heightLeft;
    let heightRight;

    heightLeft = this.height(node.left);
    heightRight = this.height(node.right);
  
    return Math.max(heightLeft, heightRight) + 1;
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null) return -1;
    if (node.data < root.data) {
      return this.depth(node, root.left, depth + 1);
    } else if (node.data > root.data) {
      return this.depth(node, root.right, depth + 1);
    } else return depth;
  }

  isBalanced(root = this.root) {
    if (root === null) return 0;
    let heightLeft;
    let heightRight;

    heightLeft = this.height(root.left);
    heightRight = this.height(root.right);

    if (Math.abs(heightLeft - heightRight) > 1) {
      return console.log("Not balanced");
    } else {
      return console.log("Balanced");
    }
  }

  rebalance() {
    let array = [];

    this.preOrder((node) => array.push(node.data));

    array.sort((a, b) => a - b).filter((value, index) => array.indexOf(value) === index);

    console.log(array);

    this.root = buildTree(array, 0, array.length - 1);
  }
}

function buildTree(arr, start, end) {
  if (start > end) return null;
  
  let mid = start + Math.floor((end - start) / 2);

  let root = new Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}



export { Node, Tree };