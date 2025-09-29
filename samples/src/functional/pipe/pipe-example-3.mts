// Example: src/functional/pipe.mts (pipe)
// Optional value handling with monadic operations:

import { strict as assert } from 'node:assert/strict';

import { Optional, pipe } from 'ts-data-forge';

// Working with Optional types
const optional = Optional.some(42);
const result = pipe(optional)
  .mapOptional((x) => x / 2) // Optional.some(21)
  .mapOptional((x) => Math.sqrt(x)).value; // Optional.some(~4.58) // Optional.some(4.58...)
assert(Optional.isSome(result));
assert(Math.abs(Optional.unwrap(result) - Math.sqrt(21)) < 0.01);

// Optional with None
const noneOptional = Optional.none;
const noneResult = pipe(noneOptional).mapOptional((x) => x * 2).value;
assert(Optional.isNone(noneResult));

export { noneOptional, noneResult, optional, result };
