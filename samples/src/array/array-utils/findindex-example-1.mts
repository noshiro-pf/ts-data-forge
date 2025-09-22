// Sample code extracted from src/array/array-utils.mts (findIndex)
import { Arr, Optional, pipe } from 'ts-data-forge';

// Basic index finding
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const bananaIndex = Arr.findIndex(fruits, (fruit) => fruit === 'banana');
if (Optional.isSome(bananaIndex)) {
  console.log(bananaIndex.value); // 1 - index of first 'banana'
}

// Finding with complex conditions
const numbers = [1, 5, 10, 15, 20];
const firstLargeIndex = Arr.findIndex(
  numbers,
  (value, index) => value > 10 && index > 1,
);
// Optional.Some(3) - index of 15 (first value > 10 after index 1)

// Finding objects by property
const users = [
  { id: 1, active: false },
  { id: 2, active: true },
  { id: 3, active: true },
];

const firstActiveIndex = Arr.findIndex(users, (user) => user.active);
// Optional.Some(1) - index of first active user

const inactiveAdminIndex = Arr.findIndex(
  users,
  (user) => !user.active && user.id > 5,
);
// Optional.None - no inactive user with id > 5

// Empty array handling
const emptyResult = Arr.findIndex([], (x) => x > 0); // Optional.None

// Curried usage for functional composition
const findNegativeIndex = Arr.findIndex((x: number) => x < 0);
const findLongStringIndex = Arr.findIndex((s: string) => s.length > 5);

const datasets = [
  [1, 2, -3, 4], // index 2 has negative
  [5, 6, 7, 8], // no negative
  [-1, 0, 1], // index 0 has negative
];

const negativeIndices = datasets.map(findNegativeIndex);
// [Optional.Some(2), Optional.None, Optional.Some(0)]

// Using found indices for further operations
const data = ['short', 'medium', 'very long string', 'tiny'];
const longStringIndex = Arr.findIndex(data, (s) => s.length > 8);

if (Optional.isSome(longStringIndex)) {
  const index = longStringIndex.value;
  console.log(`Found at position ${index}: ${data[index]}`);
  // "Found at position 2: very long string"
}

// Pipe composition
const result = pipe(['a', 'bb', 'ccc'])
  .map(findLongStringIndex)
  .map((opt) => Optional.unwrapOr(opt, -1)).value; // 2 (index of 'ccc')

// Comparing with native findIndex (which returns -1)
const nativeResult = fruits.findIndex((fruit) => fruit === 'grape'); // -1
const safeResult = Arr.findIndex(fruits, (fruit) => fruit === 'grape'); // Optional.None

// Safe index usage patterns
const maybeIndex = Arr.findIndex(numbers, (x) => x > 100);
const indexOrDefault = Optional.unwrapOr(maybeIndex, 0); // 0 (not found)

// Using index for array access
const foundIndex = Arr.findIndex(fruits, (f) => f.startsWith('c'));
const foundElement = Optional.isSome(foundIndex)
  ? fruits[foundIndex.value]
  : 'not found';
// 'cherry'

// Type inference examples
expectType<typeof bananaIndex, Optional<SizeType.Arr>>('=');
expectType<
  typeof findNegativeIndex,
  (array: readonly number[]) => Optional<SizeType.Arr>
>('=');

export { bananaIndex, data, datasets, emptyResult, findLongStringIndex, findNegativeIndex, firstActiveIndex, firstLargeIndex, foundElement, foundIndex, fruits, inactiveAdminIndex, indexOrDefault, longStringIndex, maybeIndex, nativeResult, negativeIndices, numbers, result, safeResult, users };
