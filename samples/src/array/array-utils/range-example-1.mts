// Example: src/array/array-utils.mts (range)
import { expectType } from 'ts-data-forge';

import { Arr } from 'ts-data-forge';

// Compile-time known ranges with step=1 produce precise tuple types
const range1to4 = Arr.range(1, 5); // readonly [1, 2, 3, 4]
const range0to2 = Arr.range(0, 3); // readonly [0, 1, 2]
const emptyRange = Arr.range(5, 5); // readonly []
const reverseEmpty = Arr.range(5, 1); // readonly [] (invalid with positive step)

// SmallUint constraint examples (0-255 for precise typing)
const small = Arr.range(0, 10); // readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const maxSmall = Arr.range(250, 255); // readonly [250, 251, 252, 253, 254]
const beyondSmall = Arr.range(0, 300); // readonly SafeUint[] (loses precision)

// Custom step increments
const evens = Arr.range(0, 10, 2); // readonly SafeUint[] -> [0, 2, 4, 6, 8]
const odds = Arr.range(1, 10, 2); // readonly SafeUint[] -> [1, 3, 5, 7, 9]
const countdown = Arr.range(5, 0, -1); // readonly SafeInt[] -> [5, 4, 3, 2, 1]
const bigStep = Arr.range(0, 20, 5); // readonly SafeUint[] -> [0, 5, 10, 15]

// Edge cases that return empty arrays
const singleElement = Arr.range(3, 4); // readonly [3]
const invalidRange = Arr.range(10, 5, 2); // readonly [] (start > end with positive step)
const invalidReverse = Arr.range(1, 10, -1); // readonly [] (start < end with negative step)
const zeroRange = Arr.range(42, 42); // readonly [] (start equals end)

// Runtime ranges lose precise typing but maintain safety
const dynamicStart = Math.floor(Math.random() * 10) as SafeInt;
const dynamicEnd = (dynamicStart + 5) as SafeInt;
const dynamicRange = Arr.range(dynamicStart, dynamicEnd); // readonly SafeInt[]

// Negative numbers and mixed signs
const negativeRange = Arr.range(-5, 5); // readonly SafeInt[] -> [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
const negativeCountdown = Arr.range(0, -5, -1); // readonly SafeInt[] -> [0, -1, -2, -3, -4]

// Useful for generating index ranges and iteration
const indices = Arr.range(0, 10); // readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const reversedIndices = Arr.range(9, -1, -1); // readonly SafeInt[] -> [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// Functional programming patterns
const squares = Arr.range(1, 6).map((x) => x * x); // [1, 4, 9, 16, 25]
const fibonacci = Arr.range(0, 10).reduce((acc, _, i) => {
  if (i <= 1) return [...acc, i];
  return [...acc, acc[i - 1] + acc[i - 2]];
}, [] as number[]); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Type inference examples showing precise vs general types
expectType<typeof range1to4, readonly [1, 2, 3, 4]>('='); // Precise tuple
expectType<typeof emptyRange, readonly []>('='); // Precise empty tuple
expectType<typeof evens, readonly SafeUint[]>('='); // General positive array
expectType<typeof countdown, readonly SafeInt[]>('='); // General integer array
expectType<typeof negativeRange, readonly SafeInt[]>('='); // General integer array
expectType<typeof small, readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>('='); // Precise tuple
expectType<typeof beyondSmall, readonly SafeUint[]>('='); // General array (beyond SmallUint)

export {
  beyondSmall,
  bigStep,
  countdown,
  dynamicEnd,
  dynamicRange,
  dynamicStart,
  emptyRange,
  evens,
  fibonacci,
  indices,
  invalidRange,
  invalidReverse,
  maxSmall,
  negativeCountdown,
  negativeRange,
  odds,
  range0to2,
  range1to4,
  reversedIndices,
  reverseEmpty,
  singleElement,
  small,
  squares,
  zeroRange,
};
