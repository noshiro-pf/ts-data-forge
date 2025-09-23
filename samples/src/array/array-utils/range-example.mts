// Example: src/array/array-utils.mts (range)
import { Arr, asUint32 } from 'ts-data-forge';

const ascending = Arr.range(asUint32(1), asUint32(5));
const empty = Arr.range(asUint32(2), asUint32(2));

assert.deepStrictEqual(ascending, [1, 2, 3, 4]);
assert.deepStrictEqual(empty, []);
