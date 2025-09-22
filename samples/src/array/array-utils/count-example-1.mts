// Sample code extracted from src/array/array-utils.mts (count)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.count([1, 2, 3, 4], (x) => x > 2); // 2

// Curried usage for pipe composition
const countEvens = Arr.count((x: number) => x % 2 === 0);
const result = pipe([1, 2, 3, 4, 5, 6]).map(countEvens).value;
console.log(result); // 3

export { countEvens, result };
