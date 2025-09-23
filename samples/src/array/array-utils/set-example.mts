// Example: src/array/array-utils.mts (set)
import { Arr } from 'ts-data-forge';

const scores: number[] = [10, 20, 30];

const updated = Arr.set(scores, 1, 25);

assert.deepStrictEqual(updated, [10, 25, 30]);
