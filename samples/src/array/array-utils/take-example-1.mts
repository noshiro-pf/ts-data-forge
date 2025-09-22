// Sample code extracted from src/array/array-utils.mts (take)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]

// Curried usage for pipe composition
const takeFirst3 = Arr.take(3);
const result = pipe([1, 2, 3, 4, 5]).map(takeFirst3).value;
console.log(result); // [1, 2, 3]

export { result, takeFirst3 };
