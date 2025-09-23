// Example: src/collections/iset.mts (isSupersetOf)
import { ISet } from 'ts-data-forge';

const superset = ISet.create<string>(['a', 'b', 'c']);
const subset = ISet.create<string>(['a', 'c']);

assert.strictEqual(superset.isSupersetOf(subset), true);
assert.strictEqual(subset.isSupersetOf(superset), false);
