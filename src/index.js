import { Tree } from "./TreeClass";

// const test = new Tree([1, 7, 8, 9]);
// test.buildTree();

// test.insert(10);
// // test.insert(2546);
// // test.insert(4456);
// test.prettyPrint(test.root)
// test.rebalance();
// test.prettyPrint(test.root)


// console.log(test.isBalanced());
// function heyLog(jude) {
//     console.log(`Hey, ${jude.data}!`);
// }


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getArrayOfNums() {
    let arr = [];
    for (let i = 0; i < getRandomInt(50); i++) {
        arr.push(getRandomInt(100));
    }
    return arr;
}

const treeArr = getArrayOfNums();
const tree = new Tree(treeArr);
tree.buildTree();
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrderRecursive());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
tree.insert(101);
tree.insert(1001);
tree.insert(151);
tree.insert(396);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance()
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrderRecursive());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

