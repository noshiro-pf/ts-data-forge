// Sample code extracted from src/array/array-utils.mts (toRemoved)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.toRemoved([1, 2, 3], 1); // [1, 3]

// Curried usage for pipe composition
const removeFirst = Arr.toRemoved(0);
const result = pipe([10, 20, 30]).map(removeFirst).value;
console.log(result); // [20, 30]
