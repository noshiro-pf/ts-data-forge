// Example: src/array/array-utils.mts (skipLast)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]

// Curried usage for pipe composition
const skipLast2 = Arr.skipLast(2);
const result = pipe([1, 2, 3, 4, 5]).map(skipLast2).value;
console.log(result); // [1, 2, 3]

export { result, skipLast2 };
