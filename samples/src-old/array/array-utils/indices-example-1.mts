// Example: src/array/array-utils.mts (indices)
import { Arr, expectType } from 'ts-data-forge';

// Direct usage
const fruits = ['apple', 'banana', 'cherry'];
const indices = Arr.indices(fruits);
const fruitIndices = Array.from(indices);
expectType<typeof fruitIndices, Uint32[]>('=');
assert.deepStrictEqual(fruitIndices, [0, 1, 2]);

// Curried usage
const getIndices = Arr.indices;
const result = getIndices(['a', 'b']);
const pairIndices = Array.from(result);
expectType<typeof pairIndices, Uint32[]>('=');
assert.deepStrictEqual(pairIndices, [0, 1]);

// Empty array
const empty: string[] = [];
const emptyIndices = Arr.indices(empty);
const noIndices = Array.from(emptyIndices);
expectType<typeof noIndices, Uint32[]>('=');
assert.deepStrictEqual(noIndices, []);
