// Sample code extracted from src/array/array-utils.mts (last)
import { Arr, Optional } from 'ts-data-forge';

// Empty array - precise None type
const emptyResult = Arr.last([]); // Optional.None
console.log(Optional.isNone(emptyResult)); // true

// Tuple with known structure - precise Some type
const tupleResult = Arr.last(['first', 'middle', 'last'] as const);
// Type: Optional.Some<'last'>
if (Optional.isSome(tupleResult)) {
  console.log(tupleResult.value); // 'last' - TypeScript knows exact type
}

// Non-empty array - guaranteed Some type
const nonEmpty: NonEmptyArray<number> = [10, 20, 30] as NonEmptyArray<number>;
const guaranteedResult = Arr.last(nonEmpty); // Optional.Some<number>
// No need to check - always Some for NonEmptyArray

// General array - may be Some or None
const generalArray: number[] = [1, 2, 3];
const maybeResult = Arr.last(generalArray); // Optional<number>
if (Optional.isSome(maybeResult)) {
  console.log(`Last element: ${maybeResult.value}`);
} else {
  console.log('Array is empty');
}

// Working with different types
const strings = ['hello', 'world', 'example'];
const lastString = Arr.last(strings); // Optional<string>

const coordinates = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
];
const lastCoordinate = Arr.last(coordinates); // Optional<{x: number, y: number}>

// Single element arrays
const single = [42];
const singleResult = Arr.last(single); // Optional<number> containing 42

// Functional composition with arrays of arrays
const getLastElements = (arrays: readonly string[][]) =>
  arrays.map(Arr.last).filter(Optional.isSome);

const nestedArrays = [['a', 'b'], ['c'], [], ['d', 'e', 'f']];
const lastElements = getLastElements(nestedArrays);
// [Optional.Some('b'), Optional.Some('c'), Optional.Some('f')]

// Common pattern: get last element or default
const data = [10, 20, 30];
const lastOrDefault = Optional.unwrapOr(Arr.last(data), 0); // 30
const emptyLastOrDefault = Optional.unwrapOr(Arr.last([]), 0); // 0

// Type inference examples
expectType<typeof emptyResult, Optional.None>('=');
expectType<typeof tupleResult, Optional.Some<'last'>>('=');
expectType<typeof guaranteedResult, Optional.Some<number>>('=');
expectType<typeof maybeResult, Optional<number>>('=');

export { coordinates, data, emptyLastOrDefault, emptyResult, generalArray, getLastElements, guaranteedResult, lastCoordinate, lastElements, lastOrDefault, lastString, maybeResult, nestedArrays, nonEmpty, single, singleResult, strings, tupleResult };
