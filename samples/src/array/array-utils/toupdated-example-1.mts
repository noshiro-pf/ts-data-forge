// Example: src/array/array-utils.mts (toUpdated)
import { expectType } from 'ts-data-forge';

import { Arr, pipe } from 'ts-data-forge';

// Basic usage with same type transformation
const numbers = [1, 2, 3, 4, 5];
const doubled = Arr.toUpdated(numbers, 2, (x) => x * 2);
// readonly number[] -> [1, 2, 6, 4, 5]

// Type union when updater returns different type
const mixed = Arr.toUpdated(numbers, 1, (x) => `value: ${x}`);
// readonly (number | string)[] -> [1, 'value: 2', 3, 4, 5]

// Complex object updates
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

const activatedUser = Arr.toUpdated(users, 1, (user) => ({
  ...user,
  active: true,
  lastUpdated: new Date(),
}));
// Bob is now active with lastUpdated field

// Bounds checking behavior
const safe1 = Arr.toUpdated([1, 2, 3], 10, (x) => x * 2); // [1, 2, 3] (index out of bounds)
const safe2 = Arr.toUpdated([1, 2, 3], 0, (x) => x * 2); // [2, 2, 3] (valid index)
const safe3 = Arr.toUpdated([], 0, (x) => x); // [] (empty array, index out of bounds)

// Functional transformations
const products = [
  { name: 'laptop', price: 1000 },
  { name: 'mouse', price: 25 },
  { name: 'keyboard', price: 75 },
];

const discounted = Arr.toUpdated(products, 0, (product) => ({
  ...product,
  price: Math.round(product.price * 0.8), // 20% discount
  onSale: true,
}));
// First product now has discounted price and onSale flag

// Curried usage for reusable updates
const doubleAtIndex2 = Arr.toUpdated(2, (x: number) => x * 2);
const capitalizeAtIndex0 = Arr.toUpdated(0, (s: string) => s.toUpperCase());
const markCompleteAtIndex = (index: number) =>
  Arr.toUpdated(index, (task: { done: boolean }) => ({ ...task, done: true }));

const numberArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const allDoubled = numberArrays.map(doubleAtIndex2);
// [[1, 2, 6], [4, 5, 12], [7, 8, 18]]

const words = [
  ['hello', 'world'],
  ['foo', 'bar'],
  ['type', 'script'],
];
const capitalized = words.map(capitalizeAtIndex0);
// [['HELLO', 'world'], ['FOO', 'bar'], ['TYPE', 'script']]

// Pipe composition for data processing
const processArray = (arr: readonly number[]) =>
  pipe(arr)
    .map(Arr.toUpdated(0, (x) => x * 10)) // Scale first element
    .map(Arr.toUpdated(1, (x) => (typeof x === 'number' ? x + 100 : x))).value; // Add to second if number

console.log(processArray([1, 2, 3])); // [10, 102, 3]

// Multiple sequential updates
const pipeline = (data: readonly number[]) =>
  pipe(data)
    .map(Arr.toUpdated(0, (x) => x * 2))
    .map(Arr.toUpdated(1, (x) => (typeof x === 'number' ? x + 10 : x)))
    .map(Arr.toUpdated(2, (x) => (typeof x === 'number' ? x.toString() : x)))
    .value;

console.log(pipeline([1, 2, 3])); // [2, 12, '3'] - readonly (number | string)[]

// Error-safe updates in data processing
const safeUpdate = <T, U>(
  array: readonly T[],
  index: number,
  updater: (value: T) => U,
) => {
  if (index < 0 || index >= array.length) {
    console.warn(
      `Index ${index} out of bounds for array of length ${array.length}`,
    );
    return array;
  }
  return Arr.toUpdated(array, index as SizeType.ArgArrNonNegative, updater);
};

// Advanced: State management pattern
type AppState = {
  users: { id: number; name: string }[];
  currentUserId: number;
};

const updateUserName = (
  state: AppState,
  userId: number,
  newName: string,
): AppState => {
  const userIndex = state.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return state;

  return {
    ...state,
    users: Arr.toUpdated(
      state.users,
      userIndex as SizeType.ArgArrNonNegative,
      (user) => ({
        ...user,
        name: newName,
      }),
    ),
  };
};

// Type inference examples showing union types
expectType<typeof doubled, readonly number[]>('='); // Same type
expectType<typeof mixed, readonly (number | string)[]>('='); // Union type
expectType<
  typeof doubleAtIndex2,
  <T extends readonly number[]>(array: T) => readonly (number  )[]
>('=');
expectType<typeof safe1, readonly number[]>('='); // Bounds check preserves type

export {
  activatedUser,
  allDoubled,
  capitalizeAtIndex0,
  capitalized,
  discounted,
  doubleAtIndex2,
  doubled,
  markCompleteAtIndex,
  mixed,
  numberArrays,
  numbers,
  pipeline,
  processArray,
  products,
  safe1,
  safe2,
  safe3,
  safeUpdate,
  updateUserName,
  users,
  words,
};
export type { AppState };
