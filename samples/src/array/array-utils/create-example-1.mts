// Example: src/array/array-utils.mts (create)
import { expectType } from 'ts-data-forge';

import { Arr } from 'ts-data-forge';

// Compile-time known lengths produce precise tuple types
const strings = Arr.create(3, 'hello'); // readonly ['hello', 'hello', 'hello']
const numbers = Arr.create(2, 42); // readonly [42, 42]
const empty = Arr.create(0, 'unused'); // readonly []

// Object references are shared (shallow copy behavior)
const obj = { id: 1, name: 'test' };
const objects = Arr.create(3, obj); // readonly [obj, obj, obj]
objects[0].id = 999; // Mutates the shared object reference for all entries
const sharedMutation = objects[1].id;

// Runtime positive values produce non-empty arrays when length is > 0
const count = 3;
const nonEmpty = Arr.create(count, 'item'); // NonEmptyArray<string>

// Literal type preservation with const assertion
const literals = Arr.create(2, 'success' as const); // readonly ['success', 'success']

// Type inference examples
expectType<typeof strings, readonly ['hello', 'hello', 'hello']>('=');
expectType<typeof numbers, readonly [42, 42]>('=');
expectType<typeof empty, readonly []>('=');

const summary = {
  count,
  empty,
  literals,
  nonEmpty,
  numbers,
  obj,
  objects,
  sharedMutation,
  strings,
};

// embed-sample-code-ignore-below
export { summary };
