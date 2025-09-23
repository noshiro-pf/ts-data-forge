// Example: src/collections/iset.mts (isSubsetOf)
import { ISet } from 'ts-data-forge';

const subset = ISet.create<number>([1, 2]);
const superset = ISet.create<number>([1, 2, 3]);

assert.strictEqual(subset.isSubsetOf(superset), true);
assert.strictEqual(superset.isSubsetOf(subset), false);
