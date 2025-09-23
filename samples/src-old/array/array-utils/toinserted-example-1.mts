// Example: src/array/array-utils.mts (toInserted)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const inserted = Arr.toInserted([1, 2, 3], 1, 10);
assert.deepStrictEqual(inserted satisfies readonly number[], [1, 10, 2, 3]);

// Curried usage for pipe composition
const insertAtStart = Arr.toInserted(0, 99);
const result = pipe([1, 2, 3]).map(insertAtStart).value;
assert.deepStrictEqual(result satisfies readonly number[], [99, 1, 2, 3]);
