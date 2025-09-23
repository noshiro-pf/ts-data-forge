// Example: src/array/array-utils.mts (count)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const greaterThanTwo = Arr.count([1, 2, 3, 4], (x) => x > 2);
assert.strictEqual(greaterThanTwo, 2);

// Curried usage for pipe composition
const countEvens = Arr.count((x: number) => x % 2 === 0);
const result = pipe([1, 2, 3, 4, 5, 6]).map(countEvens).value;
assert.strictEqual(result, 3);
