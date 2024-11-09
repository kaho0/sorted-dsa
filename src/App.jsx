import React from "react";
import Complexity from "./Complexity";
import TreeVisualizer from "./TreeVisualizer";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-teal-800 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-90 p-6 rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-teal-800 mb-6">
          Welcome to the Algorithm Visualizer
        </h1>
        <TreeVisualizer />
        <Complexity />
      </div>
    </div>
  );
};

export default App;
