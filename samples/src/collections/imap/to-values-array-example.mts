// Example: src/collections/imap.mts (toValuesArray)
import { IMap } from 'ts-data-forge';

const entries = [
  ['x', 10],
  ['y', 20],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

assert.deepStrictEqual(map.toValuesArray(), [10, 20]);
