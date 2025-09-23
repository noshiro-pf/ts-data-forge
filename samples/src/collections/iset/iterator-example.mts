// Example: src/collections/iset.mts (iterator)
import { ISet } from 'ts-data-forge';

const set = ISet.create(['first', 'second']);

const collected = Array.from(set);

assert.deepStrictEqual(collected, ['first', 'second']);
