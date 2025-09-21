// Sample code extracted from src/iterator/range.mts (range)
import { range } from 'ts-data-forge';

// Basic ascending range
for (const n of range(0, 5)) {
  console.log(n); // Outputs: 0, 1, 2, 3, 4
}

// Range with custom step
for (const n of range(0, 10, 2)) {
  console.log(n); // Outputs: 0, 2, 4, 6, 8
}

// Descending range with negative step
for (const n of range(10, 0, -1)) {
  console.log(n); // Outputs: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
}

// Negative numbers with negative step
for (const n of range(0, -10, -1)) {
  console.log(n); // Outputs: 0, -1, -2, -3, -4, -5, -6, -7, -8, -9
}

// Convert generator to array
const numbers = Array.from(range(1, 4)); // [1, 2, 3]
const evens = [...range(0, 11, 2)]; // [0, 2, 4, 6, 8, 10]

// Empty ranges
Array.from(range(5, 5)); // [] (start equals end)
Array.from(range(5, 3)); // [] (positive step, start > end)
Array.from(range(3, 5, -1)); // [] (negative step, start < end)

// Using with iterator protocol manually
const gen = range(1, 4);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Practical usage patterns
// Create index sequences
const indices = Array.from(range(0, items.length));

// Generate test data
const testIds = [...range(1, 101)]; // [1, 2, ..., 100]

// Iterate with step intervals
for (const minute of range(0, 60, 5)) {
  scheduleTask(minute); // Every 5 minutes
}

// Countdown sequences
for (const count of range(10, 0, -1)) {
  console.log(`T-minus ${count}`);
}
