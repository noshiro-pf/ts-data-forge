// Example: src/array/array-utils.mts (indices)
import { Arr } from 'ts-data-forge';

// Direct usage
const fruits = ['apple', 'banana', 'cherry'];
const indices = Arr.indices(fruits); // [0, 1, 2]

// Curried usage
const getIndices = Arr.indices;
const result = getIndices(['a', 'b']); // [0, 1]

// Empty array
const empty: string[] = [];
const emptyIndices = Arr.indices(empty); // []

export { empty, emptyIndices, fruits, getIndices, indices, result };
