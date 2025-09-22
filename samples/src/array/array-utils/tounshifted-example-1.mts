// Sample code extracted from src/array/array-utils.mts (toUnshifted)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]

// Curried usage for pipe composition
const prependZero = Arr.toUnshifted(0);
const result = pipe([1, 2, 3]).map(prependZero).value;
console.log(result); // [0, 1, 2, 3]

export { prependZero, result };
