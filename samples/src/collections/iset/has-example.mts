// Example: src/collections/iset.mts (has)
import { ISet } from 'ts-data-forge';

const set = ISet.create(['apple', 'banana']);

assert.strictEqual(set.has('apple'), true);
assert.strictEqual(set.has('cherry'), false);
