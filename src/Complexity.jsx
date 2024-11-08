import React, { useState } from "react";
import "./App.css"; // Ensure you have some basic styles here for alignment
import "./SortingVisualizer.css"; // Add custom styles for sorting bars and buttons

// Helper function to create a random array
const generateRandomArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);

// Tree Node Class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const Complexity = () => {
  const [array, setArray] = useState(generateRandomArray(8));
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [sorting, setSorting] = useState(false);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [treeInput, setTreeInput] = useState("");
  const [treeRoot, setTreeRoot] = useState(null);
  const [treeSteps, setTreeSteps] = useState([]);
  const [traversalResult, setTraversalResult] = useState("");

  // Generate a new random array
  const handleNewArray = () => {
    const newArray = generateRandomArray(8);
    setArray(newArray);
    setSorting(false);
    setSortingSteps([]);
  };

  // Sorting functions
  const handleSort = () => {
    setSorting(true);
    setSortingSteps([]);
    if (algorithm === "Bubble Sort") {
      bubbleSort([...array]);
    } else if (algorithm === "Insertion Sort") {
      insertionSort([...array]);
    } else if (algorithm === "Selection Sort") {
      selectionSort([...array]);
    }
  };

  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        let stepDetail = `Pass ${i + 1}, Compare ${arr[j]} and ${arr[j + 1]}`;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          stepDetail += ` → Swap: [${arr.join(", ")}]`;
        } else {
          stepDetail += ` → No Swap`;
        }
        setSortingSteps((prevSteps) => [...prevSteps, stepDetail]);
        setArray([...arr]);
        await delay(300);
      }
    }
    setSorting(false);
  };

  const insertionSort = async (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      setSortingSteps((prevSteps) => [
        ...prevSteps,
        `Insert ${key} at position ${j + 1}: [${arr.join(", ")}]`,
      ]);
      setArray([...arr]);
      await delay(300);
    }
    setSorting(false);
  };

  const selectionSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setSortingSteps((prevSteps) => [
          ...prevSteps,
          `Swap ${arr[i]} and ${arr[minIdx]}: [${arr.join(", ")}]`,
        ]);
      }
      setArray([...arr]);
      await delay(300);
    }
    setSorting(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Binary Tree functions
  const insertIntoTree = (value, node) => {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = insertIntoTree(value, node.left);
    else node.right = insertIntoTree(value, node.right);
    return node;
  };

  const handleTreeInsert = () => {
    const values = treeInput.split(",").map(Number);
    let root = null;
    values.forEach((val) => (root = insertIntoTree(val, root)));
    setTreeRoot(root);
    setTreeInput("");
  };

  const traverseTreeWithSteps = (node, order, stepsList = [], depth = 0) => {
    if (!node) return stepsList;

    const indent = "  ".repeat(depth);

    if (order === "pre") {
      stepsList.push(`${indent}Visit node ${node.value}`);
      traverseTreeWithSteps(node.left, order, stepsList, depth + 1);
      traverseTreeWithSteps(node.right, order, stepsList, depth + 1);
    } else if (order === "in") {
      traverseTreeWithSteps(node.left, order, stepsList, depth + 1);
      stepsList.push(`${indent}Visit node ${node.value}`);
      traverseTreeWithSteps(node.right, order, stepsList, depth + 1);
    } else if (order === "post") {
      traverseTreeWithSteps(node.left, order, stepsList, depth + 1);
      traverseTreeWithSteps(node.right, order, stepsList, depth + 1);
      stepsList.push(`${indent}Visit node ${node.value}`);
    }

    return stepsList;
  };

  const handleTraversal = (order) => {
    if (!treeRoot) return;
    const stepsList = traverseTreeWithSteps(treeRoot, order);
    setTreeSteps(stepsList);
    const result = traverseTree(treeRoot, order).join(", ");
    setTraversalResult(result);
  };

  const traverseTree = (node, order) => {
    if (!node) return [];
    if (order === "pre")
      return [
        node.value,
        ...traverseTree(node.left, order),
        ...traverseTree(node.right, order),
      ];
    if (order === "in")
      return [
        ...traverseTree(node.left, order),
        node.value,
        ...traverseTree(node.right, order),
      ];
    return [
      ...traverseTree(node.left, order),
      ...traverseTree(node.right, order),
      node.value,
    ];
  };

  return (
    <div className="app-container text-center">
      <h1 className="main-title">Complexity Visualizer</h1>

      {/* Sorting Visualizer */}
      <div className="section">
        <h2 className="section-title">Sorting Visualizer</h2>
        <div className="array-container">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{ height: `${val * 3}px` }}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="controls">
          <button
            className="control-button"
            onClick={handleNewArray}
            disabled={sorting}
          >
            Generate New Array
          </button>
          <select
            className="control-select"
            onChange={(e) => setAlgorithm(e.target.value)}
            value={algorithm}
          >
            <option>Bubble Sort</option>
            <option>Insertion Sort</option>
            <option>Selection Sort</option>
          </select>
          <button
            className="control-button"
            onClick={handleSort}
            disabled={sorting}
          >
            Sort
          </button>
        </div>
        <div className="steps-container">
          <h3>Sorting Steps:</h3>
          {sortingSteps.map((step, index) => (
            <p key={index}>
              {index + 1}. {step}
            </p>
          ))}
        </div>
      </div>

      {/* Binary Tree Visualizer */}
      <div className="section">
        <h2 className="section-title">Binary Tree Visualizer</h2>
        <input
          type="text"
          placeholder="Enter comma-separated values"
          value={treeInput}
          onChange={(e) => setTreeInput(e.target.value)}
        />
        <button className="control-button" onClick={handleTreeInsert}>
          Insert Tree
        </button>
        <div className="traversal-controls">
          <button
            className="control-button"
            onClick={() => handleTraversal("pre")}
          >
            Pre-order
          </button>
          <button
            className="control-button"
            onClick={() => handleTraversal("in")}
          >
            In-order
          </button>
          <button
            className="control-button"
            onClick={() => handleTraversal("post")}
          >
            Post-order
          </button>
        </div>
        <p>Traversal Result: {traversalResult}</p>
        <div className="steps-container">
          <h3>Tree Traversal Steps:</h3>
          {treeSteps.map((step, index) => (
            <p key={index}>
              {index + 1}. {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complexity;
