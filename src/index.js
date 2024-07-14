import { Tree, prettyPrint } from './tree';

// Function to generate an array of random numbers
function generateRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Driver script
function driverScript() {
  // 1. Create a binary search tree from an array of random numbers < 100
  const randomArray = generateRandomArray(15, 100);
  const tree = new Tree(randomArray);

  console.log("Initial tree from random numbers:");
  prettyPrint(tree.root);

  // 2. Confirm that the tree is balanced
  console.log("\nIs the tree balanced?", tree.isBalanced());

  // 3. Print out all elements in level, pre, post, and in order
  console.log("\nLevel Order:", tree.levelOrder());
  console.log("Pre Order:", tree.preOrder());
  console.log("Post Order:", tree.postOrder());
  console.log("In Order:", tree.inOrder());

  // 4. Unbalance the tree by adding several numbers > 100
  console.log("\nUnbalancing the tree with numbers > 100");
  for (let i = 0; i < 5; i++) {
    tree.insert(100 + Math.floor(Math.random() * 100));
  }
  prettyPrint(tree.root);

  // 5. Confirm that the tree is unbalanced
  console.log("\nIs the tree balanced after adding numbers > 100?", tree.isBalanced());

  // 6. Balance the tree
  console.log("\nRebalancing the tree...");
  tree.rebalance();

  // 7. Confirm that the tree is balanced
  console.log("\nIs the tree balanced after rebalancing?", tree.isBalanced());

  // 8. Print out all elements in level, pre, post, and in order
  console.log("\nLevel Order after rebalancing:", tree.levelOrder());
  console.log("Pre Order after rebalancing:", tree.preOrder());
  console.log("Post Order after rebalancing:", tree.postOrder());
  console.log("In Order after rebalancing:", tree.inOrder());

  console.log("\nFinal balanced tree:");
  prettyPrint(tree.root);
}

// Run the driver script
driverScript();