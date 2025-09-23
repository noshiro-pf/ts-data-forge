// Example: src/array/array-utils.mts (toFilled)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const numbers = [1, 2, 3, 4, 5];
const zeros = Arr.toFilled(numbers, 0);
expectType<typeof zeros, readonly 0[]>('=');
assert.deepStrictEqual(zeros, [0, 0, 0, 0, 0]);

// Curried usage for pipe composition
const fillWithX = Arr.toFilled('X');
const result = pipe(['a', 'b', 'c']).map(fillWithX).value;
expectType<typeof result, readonly ['X', 'X', 'X']>('=');
assert.deepStrictEqual(result, ['X', 'X', 'X']);
