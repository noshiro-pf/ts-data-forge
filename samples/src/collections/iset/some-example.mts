// Example: src/collections/iset.mts (some)
import { ISet } from 'ts-data-forge';

const numbers = ISet.create([1, 3, 5]);

assert.strictEqual(
  numbers.some((value) => value > 4),
  true,
);
assert.strictEqual(
  numbers.some((value) => value > 10),
  false,
);
