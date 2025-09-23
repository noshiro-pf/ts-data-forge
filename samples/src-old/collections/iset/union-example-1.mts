// Example: src/collections/iset.mts
import { ISet } from 'ts-data-forge';

const set = ISet.create(['a', 'b', 'c']);
const removedB = set.delete('b');

assert.strictEqual(removedB.has('a'), true);
assert.strictEqual(removedB.size, 2);
assert.deepStrictEqual(removedB.toArray(), ['a', 'c']);
