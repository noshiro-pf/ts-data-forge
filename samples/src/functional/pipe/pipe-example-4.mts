// Sample code extracted from src/functional/pipe.mts (pipe)
// Mixed type transformations:

import { strict as assert } from 'node:assert/strict';

import { pipe } from 'ts-data-forge';

// Starting with a string, transforming through different types
const complex = pipe('hello')
  .map((s) => s.length) // number: 5
  .map((n) => (n > 3 ? n : undefined)) // number | undefined: 5
  .mapNullable((n) => n * 10).value; // number: 50 (or undefined if undefined) // 50 or undefined
assert(complex === 50);

// Short string case
const shortString = pipe('hi')
  .map((s) => s.length) // number: 2
  .map((n) => (n > 3 ? n : undefined)) // number | undefined: undefined
  .mapNullable((n) => n * 10).value; // undefined
assert(shortString === undefined);

export { complex, shortString };
