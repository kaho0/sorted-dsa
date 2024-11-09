import React, { useState } from "react";
import "./TreeVisualizer.css";
// TreeNode class representing each node in the binary tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Main TreeVisualizer component
const TreeVisualizer = () => {
  const [treeRoot, setTreeRoot] = useState(null);
  const [treeInput, setTreeInput] = useState("");
  const [traversalSteps, setTraversalSteps] = useState([]);
  const [traversalType, setTraversalType] = useState("");
  const [givenTree, setGivenTree] = useState(""); // State to store and display the input tree

  // Function to build binary tree from user input
  const buildTree = () => {
    const values = treeInput.split(",").map((val) => {
      const number = Number(val.trim());
      return isNaN(number) ? null : number;
    });
    if (values.some((val) => val === null)) {
      return alert("Please enter valid numbers for the tree nodes.");
    }
    if (values.length === 0) return;

    setTreeRoot(buildBinaryTree(values, 0));
    setGivenTree(treeInput); // Update the given tree display
    setTreeInput("");
  };

  // Recursive function to build the binary tree
  const buildBinaryTree = (values, index) => {
    if (index >= values.length || values[index] === null) return null;

    const node = new TreeNode(values[index]);
    node.left = buildBinaryTree(values, 2 * index + 1);
    node.right = buildBinaryTree(values, 2 * index + 2);
    return node;
  };

  // Pre-order Traversal with steps
  const preOrder = (node, steps = []) => {
    if (!node) return steps;

    steps.push(`Visit ${node.value}`);
    if (node.left) steps.push(`Go Left from ${node.value}`);
    preOrder(node.left, steps);
    if (node.right) steps.push(`Go Right from ${node.value}`);
    preOrder(node.right, steps);

    return steps;
  };

  // In-order Traversal with steps
  const inOrder = (node, steps = []) => {
    if (!node) return steps;

    if (node.left) steps.push(`Go Left from ${node.value}`);
    inOrder(node.left, steps);
    steps.push(`Visit ${node.value}`);
    if (node.right) steps.push(`Go Right from ${node.value}`);
    inOrder(node.right, steps);

    return steps;
  };

  // Post-order Traversal with steps
  const postOrder = (node, steps = []) => {
    if (!node) return steps;

    if (node.left) steps.push(`Go Left from ${node.value}`);
    postOrder(node.left, steps);
    if (node.right) steps.push(`Go Right from ${node.value}`);
    postOrder(node.right, steps);
    steps.push(`Visit ${node.value}`);

    return steps;
  };

  // Function to handle traversal display based on the selected type
  const handleTraversal = (type) => {
    if (!treeRoot) return alert("Please build the tree first!");

    let steps = [];
    if (type === "Pre-order") steps = preOrder(treeRoot);
    else if (type === "In-order") steps = inOrder(treeRoot);
    else if (type === "Post-order") steps = postOrder(treeRoot);

    setTraversalSteps(steps);
    setTraversalType(type);
  };

  return (
    <div className="tree-visualizer">
      <h1>Binary Tree Traversal</h1>
      <h3>Enter Binary Tree Nodes (comma-separated, e.g., 5,3,8,1,4,7,9):</h3>
      <input
        type="text"
        value={treeInput}
        onChange={(e) => setTreeInput(e.target.value)}
        placeholder="Enter tree nodes"
      />
      <button onClick={buildTree}>Build Tree</button>

      {givenTree && (
        <div className="given-tree text-center">
          <h3 className="text-center">Given Tree:</h3>
          <p className="text-center">{givenTree}</p>
        </div>
      )}

      <h3>Choose Traversal:</h3>
      <button onClick={() => handleTraversal("Pre-order")}>Pre-order</button>
      <button onClick={() => handleTraversal("In-order")}>In-order</button>
      <button onClick={() => handleTraversal("Post-order")}>Post-order</button>

      <div className="result">
        {traversalType && (
          <>
            <h3>{traversalType} Traversal</h3>
            <p>
              <strong>Steps:</strong>
            </p>
            <ul>
              {traversalSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TreeVisualizer;
