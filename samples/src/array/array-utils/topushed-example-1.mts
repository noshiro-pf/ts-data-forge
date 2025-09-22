// Sample code extracted from src/array/array-utils.mts (toPushed)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]

// Curried usage for pipe composition
const addZero = Arr.toPushed(0);
const result = pipe([1, 2, 3]).map(addZero).value;
console.log(result); // [1, 2, 3, 0]

export { addZero, result };
