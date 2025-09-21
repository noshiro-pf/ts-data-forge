// Sample code extracted from src/array/array-utils.mts (filterNot)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)

// Curried usage for pipe composition
const excludeEvens = Arr.filterNot((x: number) => x % 2 === 0);
const result = pipe([1, 2, 3, 4, 5, 6]).map(excludeEvens).value;
console.log(result); // [1, 3, 5]
