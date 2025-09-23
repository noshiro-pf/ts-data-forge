// Example: src/array/array-utils.mts (length)
import { Arr } from 'ts-data-forge';

const ids = [10, 20, 30, 40] as const;
const empty: number[] = [];

const idsLength = Arr.length(ids);
const emptyLength = Arr.length(empty);

assert.strictEqual(idsLength, 4);
assert.strictEqual(emptyLength, 0);
