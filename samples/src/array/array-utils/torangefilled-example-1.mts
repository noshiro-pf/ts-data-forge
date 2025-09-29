// Example: src/array/array-utils.mts (toRangeFilled)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const numbers = [1, 2, 3, 4, 5];
const result = Arr.toRangeFilled(numbers, 0, [1, 4]); // [1, 0, 0, 0, 5]

// Curried usage for pipe composition
const fillMiddleWithX = Arr.toRangeFilled('X', [1, 3]);
const result2 = pipe(['a', 'b', 'c', 'd']).map(fillMiddleWithX).value; // ['a', 'X', 'X', 'd']

export { fillMiddleWithX, numbers, result, result2 };
