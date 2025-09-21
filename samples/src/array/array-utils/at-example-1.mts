// Sample code extracted from src/array/array-utils.mts (at)
import { Arr, Optional, pipe } from 'ts-data-forge';

// Direct usage with positive indices
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const first = Arr.at(fruits, 0); // Optional.Some('apple')
const third = Arr.at(fruits, 2); // Optional.Some('cherry')
const outOfBounds = Arr.at(fruits, 10); // Optional.None

// Negative indexing (accessing from the end)
const last = Arr.at(fruits, -1); // Optional.Some('elderberry')
const secondLast = Arr.at(fruits, -2); // Optional.Some('date')
const negativeOutOfBounds = Arr.at(fruits, -10); // Optional.None

// Edge cases
const emptyResult = Arr.at([], 0); // Optional.None
const negativeOnEmpty = Arr.at([], -1); // Optional.None
const singleElement = Arr.at(['only'], 0); // Optional.Some('only')
const singleNegative = Arr.at(['only'], -1); // Optional.Some('only')

// Safe access pattern with type-safe unwrapping
const maybeElement = Arr.at(fruits, 2);
if (Optional.isSome(maybeElement)) {
  console.log(`Found: ${maybeElement.value}`); // Type-safe access, no undefined
} else {
  console.log('Index out of bounds');
}

// Alternative unwrapping with default
const elementOrDefault = Optional.unwrapOr(Arr.at(fruits, 100), 'not found');
console.log(elementOrDefault); // 'not found'

// Curried usage for functional composition
const getSecondElement = Arr.at(1);
const getLastElement = Arr.at(-1);
const getMiddleElement = Arr.at(2);

const nestedArrays = [[10, 20, 30, 40], [50, 60], [70]];
const secondElements = nestedArrays.map(getSecondElement);
// [Optional.Some(20), Optional.None, Optional.None]

const lastElements = nestedArrays.map(getLastElement);
// [Optional.Some(40), Optional.Some(60), Optional.Some(70)]

// Pipe composition for data processing
const processArray = (arr: readonly string[]) =>
  pipe(arr)
    .map(getSecondElement)
    .map((opt) => Optional.map(opt, (s) => s.toUpperCase()))
    .map((opt) => Optional.unwrapOr(opt, 'MISSING')).value;

console.log(processArray(['a', 'b', 'c'])); // 'B'
console.log(processArray(['x'])); // 'MISSING'

// Advanced curried usage with transformation pipelines
const extractAndProcess = pipe([
  ['hello', 'world', 'typescript'],
  ['functional', 'programming'],
  ['type', 'safety', 'matters', 'most'],
])
  .map((arr) => arr.map(getSecondElement))
  .map((opts) => opts.map((opt) => Optional.unwrapOr(opt, '[missing]'))).value;
// [['world'], ['[missing]'], ['safety']]

// Type inference examples
expectType<typeof first, Optional<string>>('=');
expectType<typeof getSecondElement, <T>(array: readonly T[]) => Optional<T>>(
  '=',
);
expectType<typeof negativeOutOfBounds, Optional<string>>('=');
