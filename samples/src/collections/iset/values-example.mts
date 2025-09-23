// Example: src/collections/iset.mts (values)
import { ISet } from 'ts-data-forge';

const set = ISet.create(['x', 'y']);

const values = Array.from(set.values());

assert.deepStrictEqual(values, ['x', 'y']);
