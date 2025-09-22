// Sample code extracted from src/array/array-utils.mts (zeros)
import { Arr } from 'ts-data-forge';

// Compile-time known lengths produce precise tuple types
const exactLength = Arr.zeros(3); // readonly [0, 0, 0]
const empty = Arr.zeros(0); // readonly []

// Runtime positive values produce non-empty arrays
const count = Math.floor(Math.random() * 5) + 1;
const nonEmpty = Arr.zeros(count); // NonEmptyArray<0>

// General runtime values may be empty
const maybeEmpty = Arr.zeros(Math.floor(Math.random() * 5)); // readonly 0[]

// Type inference examples
expectType<typeof exactLength, readonly [0, 0, 0]>('=');
expectType<typeof empty, readonly []>('=');
expectType<typeof nonEmpty, NonEmptyArray<0>>('=');
expectType<typeof maybeEmpty, readonly 0[]>('=');

export { count, empty, exactLength, maybeEmpty, nonEmpty };
