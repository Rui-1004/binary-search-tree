import {Tree} from './tree.js'

const prettyPrint = (node, prefix = "", isLeft = true) => {
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

let array = [1, 7, 4, 23, 45, 9, 4, 21, 86, 7, 9, 67, 52, 32];

array = array.sort((a, b) => a - b).filter((value, index) => array.indexOf(value) === index);

let tree = new Tree(array, 0, array.length - 1);

prettyPrint(tree.root);

tree.isBalanced();

// tree.levelOrder(tree.log);
// tree.preOrder(tree.log);
// tree.inOrder(tree.log);
// tree.postOrder(tree.log);

tree.insert(195);
tree.insert(267);
tree.insert(457);
tree.insert(153);
tree.insert(766);

tree.isBalanced();
tree.rebalance();

// tree.levelOrder(tree.log);
// tree.preOrder(tree.log);
// tree.inOrder(tree.log);
// tree.postOrder(tree.log);

prettyPrint(tree.root);