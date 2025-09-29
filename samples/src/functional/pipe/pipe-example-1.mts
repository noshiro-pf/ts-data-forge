// Example: src/functional/pipe.mts (pipe)
// Basic value transformation chaining:

import { strict as assert } from 'node:assert/strict';

import { pipe } from 'ts-data-forge';

// Simple sequential transformations
const result = pipe(10)
  .map((x) => x * 2) // 20
  .map((x) => x + 5) // 25
  .map((x) => x.toString()).value; // '25'
assert(result === '25');

// String processing pipeline
const processed = pipe('  Hello World  ')
  .map((s) => s.trim()) // "Hello World"
  .map((s) => s.toLowerCase()) // "hello world"
  .map((s) => s.split(' ')) // ["hello", "world"]
  .map((arr) => arr.join('-')).value; // "hello-world"
assert(processed === 'hello-world');

export { processed, result };
