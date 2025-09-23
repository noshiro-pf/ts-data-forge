// Example: src/collections/iset.mts (ISet.equal)
import { ISet } from 'ts-data-forge';

const first = ISet.create<number>([1, 2]);
const second = ISet.create<number>([2, 1]);
const third = ISet.create<number>([1, 3]);

assert.strictEqual(ISet.equal(first, second), true);
assert.strictEqual(ISet.equal(first, third), false);
