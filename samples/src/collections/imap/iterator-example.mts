// Example: src/collections/imap.mts (iterator)
import { IMap } from 'ts-data-forge';

// embed-sample-code-ignore-above
const entries = [
  ['first', 1],
  ['second', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

const collected = Array.from(map);

assert.deepStrictEqual(collected, [
  ['first', 1],
  ['second', 2],
]);
