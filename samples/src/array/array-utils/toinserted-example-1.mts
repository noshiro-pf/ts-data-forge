// Sample code extracted from src/array/array-utils.mts (toInserted)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.toInserted([1, 2, 3], 1, 10); // [1, 10, 2, 3]

// Curried usage for pipe composition
const insertAtStart = Arr.toInserted(0, 99);
const result = pipe([1, 2, 3]).map(insertAtStart).value;
console.log(result); // [99, 1, 2, 3]
