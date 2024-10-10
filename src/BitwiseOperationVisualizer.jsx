import React, { useState } from "react";

const BitwiseVisualizer = () => {
  const [numberA, setNumberA] = useState(BigInt(0));
  const [numberB, setNumberB] = useState(BigInt(0));
  const [operation, setOperation] = useState("AND");
  const [shiftCount, setShiftCount] = useState(1);

  const clearAll = () => {
    setNumberA(BigInt(0));
    setNumberB(BigInt(0));
    setOperation("AND");
    setShiftCount(1);
  };

  const operations = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    XOR: (a, b) => a ^ b,
    "NOT A": (a) => ~a,
    "Left Shift A": (a, count) => a << BigInt(count),
    "Right Shift A": (a, count) => a >> BigInt(count),
  };

  const getResult = () => {
    if (operation === "NOT A") return operations[operation](numberA);
    if (operation.includes("Shift"))
      return operations[operation](numberA, shiftCount);
    return operations[operation](numberA, numberB);
  };

  const updateNumber = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") setter(BigInt(0));
    else setter(BigInt(value));
  };

  const updateShiftCount = (e) => {
    const value = parseInt(e.target.value) || 0;
    setShiftCount(Math.max(0, Math.min(31, value)));
  };

  const BitDisplay = ({ number, label }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm text-gray-400">
          Decimal: {number.toString()}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 font-mono bg-gray-800 p-2 rounded">
        {number
          .toString(2)
          .padStart(32, "0")
          .split("")
          .map((bit, i) => (
            <div
              key={i}
              className={`w-7 h-7 flex items-center justify-center rounded
              ${
                bit === "1"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {bit}
            </div>
          ))}
      </div>
    </div>
  );

  const ShiftControl = () => (
    <div className="flex items-center">
      <label className="flex-grow text-sm font-medium mb-2">Shift Count</label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShiftCount((prev) => Math.max(0, prev - 1))}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          -
        </button>
        <input
          type="number"
          value={shiftCount}
          onChange={updateShiftCount}
          className="w-16 bg-gray-800 text-white px-3 py-1 rounded text-center"
          min="0"
          max="31"
        />
        <button
          onClick={() => setShiftCount((prev) => Math.min(31, prev + 1))}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-row">
      <div className="w-auto mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bitwise Operations Visualizer</h1>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Number A</label>
            <input
              type="text"
              value={numberA.toString()}
              onChange={updateNumber(setNumberA)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Operation</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded"
            >
              {Object.keys(operations).map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        </div>

        {operation.includes("Shift") ? (
          <div className="mb-6">
            <ShiftControl />
          </div>
        ) : (
          !operation.includes("NOT") && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Number B</label>
              <input
                type="text"
                value={numberB.toString()}
                onChange={updateNumber(setNumberB)}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded"
              />
            </div>
          )
        )}

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <BitDisplay number={numberA} label="Number A" />
          {!operation.includes("NOT") && !operation.includes("Shift") && (
            <BitDisplay number={numberB} label="Number B" />
          )}
          <div className="border-t border-gray-700 my-4"></div>
          <BitDisplay
            number={getResult()}
            label={`Result (${operation}${
              operation.includes("Shift") ? ` by ${shiftCount}` : ""
            })`}
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Operation Explanation</h2>
          <div className="text-gray-300">
            {operation === "AND" && "Sets each bit to 1 if both bits are 1."}
            {operation === "OR" &&
              "Sets each bit to 1 if at least one of two bits is 1."}
            {operation === "XOR" &&
              "Sets each bit to 1 if exactly one of two bits is 1."}
            {operation === "NOT A" &&
              "Inverts all the bits, changing 1s to 0s and vice versa."}
            {operation === "Left Shift A" &&
              `Shifts all bits to the left by ${shiftCount} position${
                shiftCount !== 1 ? "s" : ""
              }. Rightmost bits become 0.`}
            {operation === "Right Shift A" &&
              `Shifts all bits to the right by ${shiftCount} position${
                shiftCount !== 1 ? "s" : ""
              }. Leftmost bits are filled based on the sign (0 for positive numbers).`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitwiseVisualizer;
