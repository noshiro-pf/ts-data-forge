// Example: src/array/array-utils.mts (findLastIndex)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Basic last index finding
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const lastBananaIndex = Arr.findLastIndex(
  fruits,
  (fruit) => fruit === 'banana',
);
assert.strictEqual(lastBananaIndex, 3);

// Finding with complex conditions
const numbers = [1, 5, 10, 15, 20, 10, 5];
const lastLargeIndex = Arr.findLastIndex(
  numbers,
  (value, index) => value > 8 && index < 5,
);
assert.strictEqual(lastLargeIndex, 4); // index of last value > 8 before index 5 (20)

// Finding objects by property
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true },
  { id: 4, active: false },
] as const;

const lastActiveIndex = Arr.findLastIndex(users, (user) => user.active);
assert.strictEqual(lastActiveIndex, 2); // index of last active user

const lastInactiveIndex = Arr.findLastIndex(users, (user) => !user.active);
assert.strictEqual(lastInactiveIndex, 3); // index of last inactive user

// Empty array handling
const emptyResult = Arr.findLastIndex([], (x: number) => x > 0);
assert.strictEqual(emptyResult, -1);

// Curried usage for functional composition
const findLastNegativeIndex = Arr.findLastIndex((x: number) => x < 0);

const datasets = [
  [1, 2, -3, 4, -5], // last negative at index 4
  [5, 6, 7, 8], // no negative
  [-1, 0, 1, -2], // last negative at index 3
] as const;

const lastNegativeIndices = datasets.map(findLastNegativeIndex);
expectType<typeof lastNegativeIndices, (Uint32 | -1)[]>('=');
assert.deepStrictEqual(lastNegativeIndices, [4, -1, 3]);
// Functional composition
const data = [
  'short',
  'medium',
  'very long string',
  'tiny',
  'another long one',
];
const lastLongIndex = Arr.findLastIndex(data, (s) => s.length > 8);
assert.strictEqual(lastLongIndex, 4); // index of 'another long one'

// Using with pipe
const result = pipe(['a', 'bb', 'ccc', 'bb']).map(
  Arr.findLastIndex((s: string) => s.length === 2),
).value;
assert.strictEqual(result, 3); // last occurrence of 'bb'

// Comparing with findIndex
const values = [1, 2, 3, 2, 4];
const firstTwo = Arr.findIndex(values, (x) => x === 2);
const lastTwo = Arr.findLastIndex(values, (x) => x === 2);
assert.strictEqual(firstTwo, 1);
assert.strictEqual(lastTwo, 3);

// Type safety with tuples
const tuple = [10, 20, 30, 20] as const;
const lastTwentyIndex = Arr.findLastIndex(tuple, (x) => x === 20);
expectType<typeof lastTwentyIndex, 0 | 1 | 2 | 3 | -1>('=');
assert.strictEqual(lastTwentyIndex, 3);
