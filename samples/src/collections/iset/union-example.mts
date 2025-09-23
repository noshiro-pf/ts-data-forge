// Example: src/collections/iset.mts (union)
import { ISet } from 'ts-data-forge';

const numbers = ISet.create([1, 2]);
const letters = ISet.create(['a', 'b']);

const combined = numbers.union(letters);

assert.deepStrictEqual(Array.from(combined), [1, 2, 'a', 'b']);
