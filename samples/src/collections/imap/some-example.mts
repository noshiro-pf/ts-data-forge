// Example: src/collections/imap.mts (some)
import { IMap } from 'ts-data-forge';

const entries = [
  ['alice', 3],
  ['bob', 5],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

assert.strictEqual(
  map.some((value) => value > 4),
  true,
);
assert.strictEqual(
  map.some((value) => value > 10),
  false,
);
