// Sample code extracted from src/others/memoize-function.mts (memoizeFunction)
// Multi-argument functions with composite keys

import { memoizeFunction } from 'ts-data-forge';

// Grid calculation with x,y coordinates
const calculateGridValue = (x: number, y: number, scale: number): number => {
  console.log(`Computing grid(${x},${y},${scale})`);
  // Expensive computation...
  return Math.sin(x * scale) * Math.cos(y * scale);
};

const memoizedGrid = memoizeFunction(
  calculateGridValue,
  (x, y, scale) => `${x},${y},${scale}`, // String concatenation for composite key
);

// Alternative: Using bit manipulation for integer coordinates
const memoizedGrid2 = memoizeFunction(
  calculateGridValue,
  (x, y, scale) => (x << 20) | (y << 10) | scale, // Assuming small positive integers
);
