// Example: src/collections/imap.mts (mapKeys)
import { IMap } from 'ts-data-forge';

// embed-sample-code-ignore-above
const entries = [
  ['first', 1],
  ['second', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

const upperKeys = map.mapKeys((key) => key.toUpperCase());

assert.deepStrictEqual(Array.from(upperKeys), [
  ['FIRST', 1],
  ['SECOND', 2],
]);
