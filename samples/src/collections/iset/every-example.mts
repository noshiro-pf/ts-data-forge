// Example: src/collections/iset.mts (every)
import { ISet } from 'ts-data-forge';

const numbers = ISet.create([2, 4, 6]);

const allEven = numbers.every((value) => value % 2 === 0);
const narrowed = numbers.every((value): value is 2 | 4 | 6 => value % 2 === 0);

assert.strictEqual(allEven, true);
assert.strictEqual(narrowed, true);
