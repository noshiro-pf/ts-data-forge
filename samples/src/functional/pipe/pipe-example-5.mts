// Example: src/functional/pipe.mts (pipe)
// Error-safe computation chains:

import { strict as assert } from 'node:assert/strict';

import { pipe } from 'ts-data-forge';

// Building complex computations safely
const maybeNumber: number | undefined = 25;
const result = pipe(maybeNumber)
  .mapNullable((n) => (n > 0 ? n : undefined)) // Positive numbers only
  .mapNullable((n) => Math.sqrt(n)) // Safe square root
  .mapNullable((n) => (n < 100 ? n : undefined)) // Limit result
  .mapNullable((n) => Math.round(n * 100) / 100).value; // Round to 2 decimals // number | undefined

assert(result === 5); // sqrt(25) = 5

const negativeNumber: number | undefined = -5;
const negativeResult = pipe(negativeNumber).mapNullable((n) =>
  n > 0 ? n : undefined,
).value;
assert(negativeResult === undefined); // negative number

export { maybeNumber, negativeNumber, negativeResult, result };
