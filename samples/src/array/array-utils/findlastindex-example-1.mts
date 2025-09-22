// Sample code extracted from src/array/array-utils.mts (findLastIndex)
import { Arr, pipe } from 'ts-data-forge';

// Basic last index finding
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const lastBananaIndex = Arr.findLastIndex(
  fruits,
  (fruit) => fruit === 'banana',
);
console.log(lastBananaIndex); // 3 - index of last 'banana'

// Finding with complex conditions
const numbers = [1, 5, 10, 15, 20, 10, 5];
const lastLargeIndex = Arr.findLastIndex(
  numbers,
  (value, index) => value > 8 && index < 5,
);
console.log(lastLargeIndex); // 3 - index of last value > 8 before index 5 (15)

// Finding objects by property
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true },
  { id: 4, active: false },
];

const lastActiveIndex = Arr.findLastIndex(users, (user) => user.active);
console.log(lastActiveIndex); // 2 - index of last active user

const lastInactiveIndex = Arr.findLastIndex(users, (user) => !user.active);
console.log(lastInactiveIndex); // 3 - index of last inactive user

// Empty array handling
const emptyResult = Arr.findLastIndex([], (x: number) => x > 0); // -1

// Curried usage for functional composition
const findLastNegativeIndex = Arr.findLastIndex((x: number) => x < 0);
const findLastLongStringIndex = Arr.findLastIndex((s: string) => s.length > 5);

const datasets = [
  [1, 2, -3, 4, -5], // last negative at index 4
  [5, 6, 7, 8], // no negative
  [-1, 0, 1, -2], // last negative at index 3
];

const lastNegativeIndices = datasets.map(findLastNegativeIndex);
// [4, -1, 3]

// Functional composition
const data = [
  'short',
  'medium',
  'very long string',
  'tiny',
  'another long one',
];
const lastLongIndex = Arr.findLastIndex(data, (s) => s.length > 8);
console.log(lastLongIndex); // 4 - index of 'another long one'

// Using with pipe
const result = pipe(['a', 'bb', 'ccc', 'bb']).map(
  Arr.findLastIndex((s: string) => s.length === 2),
).value; // 3 (last occurrence of 'bb')

// Comparing with findIndex
const values = [1, 2, 3, 2, 4];
const firstTwo = Arr.findIndex(values, (x) => x === 2); // 1
const lastTwo = Arr.findLastIndex(values, (x) => x === 2); // 3

// Type safety with tuples
const tuple = [10, 20, 30, 20] as const;
const lastTwentyIndex = Arr.findLastIndex(tuple, (x) => x === 20);
// Type: ArrayIndex<readonly [10, 20, 30, 20]> | -1
// Value: 3

export { data, datasets, emptyResult, findLastLongStringIndex, findLastNegativeIndex, firstTwo, fruits, lastActiveIndex, lastBananaIndex, lastInactiveIndex, lastLargeIndex, lastLongIndex, lastNegativeIndices, lastTwentyIndex, lastTwo, numbers, result, tuple, users, values };
