// Example: src/array/array-utils.mts (skip)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]

// Curried usage for pipe composition
const skipFirst2 = Arr.skip(2);
const result = pipe([1, 2, 3, 4, 5]).map(skipFirst2).value;
console.log(result); // [3, 4, 5]

export { result, skipFirst2 };
