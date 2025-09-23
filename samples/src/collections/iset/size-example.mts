// Example: src/collections/iset.mts (size)
import { ISet } from 'ts-data-forge';

const set = ISet.create([1, 2, 3]);

assert.strictEqual(set.size, 3);
