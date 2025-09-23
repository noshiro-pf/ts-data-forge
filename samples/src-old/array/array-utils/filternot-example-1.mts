// Example: src/array/array-utils.mts (filterNot)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const oddNumbers = Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0);
expectType<typeof oddNumbers, readonly (1 | 2 | 3 | 4)[]>('=');
assert.deepStrictEqual(oddNumbers, [1, 3]);

// Curried usage for pipe composition
const excludeEvens = Arr.filterNot((x: number) => x % 2 === 0);
const result = pipe([1, 2, 3, 4, 5, 6]).map(excludeEvens).value;
expectType<typeof result, readonly number[]>('=');
assert.deepStrictEqual(result, [1, 3, 5]);
