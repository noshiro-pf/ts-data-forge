// Sample code extracted from src/array/array-utils.mts (seq)
import { Arr } from 'ts-data-forge';

// Compile-time known lengths produce precise tuple types
const indices = Arr.seq(4); // readonly [0, 1, 2, 3]
const empty = Arr.seq(0); // readonly []
const single = Arr.seq(1); // readonly [0]

// Runtime positive values produce non-empty arrays
const count = Math.floor(Math.random() * 5) + 1;
const nonEmpty = Arr.seq(count); // NonEmptyArray<SizeType.Arr>

// General runtime values may be empty
const maybeEmpty = Arr.seq(Math.floor(Math.random() * 5)); // readonly SizeType.Arr[]

// Useful for generating array indices
const data = ['a', 'b', 'c', 'd'];
const indexSequence = Arr.seq(data.length); // [0, 1, 2, 3]

// Type inference examples
expectType<typeof indices, readonly [0, 1, 2, 3]>('=');
expectType<typeof empty, readonly []>('=');
expectType<typeof single, readonly [0]>('=');

export { count, data, empty, indexSequence, indices, maybeEmpty, nonEmpty, single };
