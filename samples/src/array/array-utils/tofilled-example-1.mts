// Example: src/array/array-utils.mts (toFilled)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const numbers = [1, 2, 3, 4, 5];
const zeros = Arr.toFilled(numbers, 0); // [0, 0, 0, 0, 0]

// Curried usage for pipe composition
const fillWithX = Arr.toFilled('X');
const result = pipe(['a', 'b', 'c']).map(fillWithX).value; // ['X', 'X', 'X']

export { fillWithX, numbers, result, zeros };
