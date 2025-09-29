// Example: src/array/array-utils.mts (head)
import { expectType } from 'ts-data-forge';

import { Arr, Optional } from 'ts-data-forge';

// Empty array - precise None type
const emptyResult = Arr.head([]); // Optional.None
console.log(Optional.isNone(emptyResult)); // true

// Tuple with known structure - precise Some type
const tupleResult = Arr.head(['first', 'second', 'third'] as const);
// Type: Optional.Some<'first'>
if (Optional.isSome(tupleResult)) {
  console.log(tupleResult.value); // 'first' - TypeScript knows exact type
}

// Non-empty array - guaranteed Some type
const nonEmpty: NonEmptyArray<number> = [10, 20, 30] as NonEmptyArray<number>;
const guaranteedResult = Arr.head(nonEmpty); // Optional.Some<number>
// No need to check - always Some for NonEmptyArray

// General array - may be Some or None
const generalArray: number[] = [1, 2, 3];
const maybeResult = Arr.head(generalArray); // Optional<number>
if (Optional.isSome(maybeResult)) {
  console.log(`First element: ${maybeResult.value}`);
} else {
  console.log('Array is empty');
}

// Working with different types
const strings = ['hello', 'world'];
const firstString = Arr.head(strings); // Optional<string>

const objects = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const firstObject = Arr.head(objects); // Optional<{id: number, name: string}>

// Functional composition
const getFirstElements = (arrays: readonly number[][]) =>
  arrays.map(Arr.head).filter(Optional.isSome);

const nestedArrays = [[1, 2], [3, 4], [], [5]];
const firstElements = getFirstElements(nestedArrays);
// [Optional.Some(1), Optional.Some(3), Optional.Some(5)]

// Type inference examples
expectType<typeof emptyResult, Optional.None>('=');
expectType<typeof tupleResult, Optional.Some<'first'>>('=');
expectType<typeof guaranteedResult, Optional.Some<number>>('=');
expectType<typeof maybeResult, Optional<number>>('=');

export {
  emptyResult,
  firstElements,
  firstObject,
  firstString,
  generalArray,
  getFirstElements,
  guaranteedResult,
  maybeResult,
  nestedArrays,
  nonEmpty,
  objects,
  strings,
  tupleResult,
};
