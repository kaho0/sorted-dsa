import React, { useState } from "react";
import "./SortingVisualizer.css";

// Helper function to create a random array
const generateRandomArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);

const Complexity = () => {
  const [array, setArray] = useState(generateRandomArray(8));
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [sorting, setSorting] = useState(false);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [sortingType, setSortingType] = useState("");

  const handleNewArray = () => {
    const newArray = generateRandomArray(8);
    setArray(newArray);
    setSorting(false);
    setSortingSteps([]);
    setSortingType("");
  };

  const handleSort = () => {
    setSorting(true);
    setSortingSteps([]);
    setSortingType(algorithm);
    if (algorithm === "Bubble Sort") bubbleSort([...array]);
    else if (algorithm === "Insertion Sort") insertionSort([...array]);
    else if (algorithm === "Selection Sort") selectionSort([...array]);
    else if (algorithm === "Heap Sort") heapSort([...array]);
    else if (algorithm === "Radix Sort") radixSort([...array]);
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

  const heapSort = async (arr) => {
    const heapify = async (arr, length, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      if (left < length && arr[left] > arr[largest]) largest = left;
      if (right < length && arr[right] > arr[largest]) largest = right;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setSortingSteps((prevSteps) => [
          ...prevSteps,
          `Heapify: [${arr.join(", ")}]`,
        ]);
        setArray([...arr]);
        await delay(300);
        await heapify(arr, length, largest);
      }
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await heapify(arr, arr.length, i);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setSortingSteps((prevSteps) => [
        ...prevSteps,
        `Swap root with last: [${arr.join(", ")}]`,
      ]);
      setArray([...arr]);
      await delay(300);
      await heapify(arr, i, 0);
    }
    setSorting(false);
  };

  const radixSort = async (arr) => {
    const getMax = (arr) => arr.reduce((a, b) => (a > b ? a : b));
    const countSort = async (arr, exp) => {
      let output = new Array(arr.length).fill(0);
      let count = new Array(10).fill(0);

      for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = arr.length - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }

      for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
      }

      setSortingSteps((prevSteps) => [
        ...prevSteps,
        `After exp=${exp}: [${arr.join(", ")}]`,
      ]);
      setArray([...arr]);
      await delay(300);
    };

    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countSort(arr, exp);
    }
    setSorting(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="app-container text-center">
      <h3 className="text-5xl">Sorting Visualizer</h3>
      <div className="sorting-section">
        <div className="array-container">
          {array.map((num, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{ height: `${num * 3}px` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={handleNewArray} disabled={sorting}>
            Generate New Array
          </button>
          <button onClick={handleSort} disabled={sorting}>
            Sort
          </button>
        </div>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={sorting}
        >
          <option>Bubble Sort</option>
          <option>Insertion Sort</option>
          <option>Selection Sort</option>
          <option>Heap Sort</option>
          <option>Radix Sort</option>
        </select>
        <div className="sorting-result">
          {sortingType && (
            <>
              <h3>{sortingType} Sorting Steps</h3>
              <p>
                <strong>Steps:</strong>
              </p>
              <ul>
                {sortingSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complexity;
