// Example: src/array/array-utils.mts (foldr)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const sumRight = Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0);
assert.strictEqual(sumRight, 6);

// Curried usage for pipe composition
const concatRight = Arr.foldr((acc: string, curr: string) => curr + acc, '');
const result = pipe(['a', 'b', 'c']).map(concatRight).value;
assert.strictEqual(result, 'abc');
