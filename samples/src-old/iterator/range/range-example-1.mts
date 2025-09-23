// Example: src/iterator/range.mts
import { range } from 'ts-data-forge';

const ascending = Array.from(range(0, 3));
const descending = Array.from(range(3, 0, -1));

assert.deepStrictEqual(ascending, [0, 1, 2]);
assert.deepStrictEqual(descending, [3, 2, 1]);
