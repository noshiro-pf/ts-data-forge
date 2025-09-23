// Example: src/array/array-utils.mts (rest)
import { Arr } from 'ts-data-forge';

const values = [1, 2, 3] as const;

const remainder = Arr.rest(values);
const emptyRemainder = Arr.rest([1] as const);

assert.deepStrictEqual(remainder, [2, 3] as const);
assert.deepStrictEqual(emptyRemainder, [] as const);
