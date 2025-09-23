// Example: src/collections/iset.mts (isEmpty)
import { ISet } from 'ts-data-forge';

const emptySet = ISet.create<number>([]);
const filledSet = ISet.create([1, 2]);

assert.strictEqual(emptySet.isEmpty, true);
assert.strictEqual(filledSet.isEmpty, false);
