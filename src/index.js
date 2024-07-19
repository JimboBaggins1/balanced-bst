import { Tree } from "./TreeClass";

const test = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324]);


test.prettyPrint(test.buildTree());
test.insert(56);
test.prettyPrint(test.root)
test.insert(0);
test.prettyPrint(test.root)
test.insert(56);
test.prettyPrint(test.root)
test.delete(3);
test.prettyPrint(test.root)


// const test = new Tree([1, 2, 3]);

// test.buildTree();
// test.prettyPrint(test.root);
test.delete(2);
test.prettyPrint(test.root);
// console.log(test.minVal(test.root));
console.log(test.find(23222));
console.log(test.levelOrderIterative(heyLog));

function heyLog(jude) {
    console.log(`Hey, ${jude.data}!`);
}