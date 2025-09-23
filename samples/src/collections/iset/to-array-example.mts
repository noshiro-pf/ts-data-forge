// Example: src/collections/iset.mts (toArray)
import { ISet } from 'ts-data-forge';

const set = ISet.create(['north', 'south']);

assert.deepStrictEqual(set.toArray(), ['north', 'south']);
