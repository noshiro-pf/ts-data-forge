// Sample code extracted from src/functional/pipe.mts (pipe)
// Nullable value handling with automatic null checking:

import { strict as assert } from 'node:assert/strict';

import { pipe } from 'ts-data-forge';

// Safe operations on potentially nullish values
const maybeNumber: number | undefined = 10;
const result = pipe(maybeNumber)
  .mapNullable((x) => x * 2) // Only applies if not null
  .mapNullable((x) => `Result: ${x}`).value; // Only applies if previous step succeeded // 'Result: 20' or undefined
assert(result === 'Result: 20');

// Handling null values
const nullValue: number | null = null;
const nullResult = pipe(nullValue).mapNullable((x) => x * 2).value;
assert(nullResult === undefined);

export { maybeNumber, nullResult, nullValue, result };
