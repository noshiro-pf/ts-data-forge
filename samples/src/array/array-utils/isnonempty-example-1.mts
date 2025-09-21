// Sample code extracted from src/array/array-utils.mts (isNonEmpty)
import { Arr } from 'ts-data-forge';

// Basic non-emptiness checking
const emptyArray: number[] = [];
const nonEmptyArray = [1, 2, 3];

console.log(Arr.isNonEmpty(emptyArray)); // false
console.log(Arr.isNonEmpty(nonEmptyArray)); // true

// Type guard behavior enables safe element access
function getFirstElement(arr: readonly number[]): number | undefined {
  if (Arr.isNonEmpty(arr)) {
    // arr is now typed as NonEmptyArray<number>
    return arr[0]; // Safe - no undefined, TypeScript knows this exists
  }
  return undefined;
}

// Safe operations on non-empty arrays
function processData(data: readonly string[]) {
  if (!Arr.isNonEmpty(data)) return; // early return pattern

  // This is now safe without undefined checks
  const first = data[0];

  // Can safely use non-empty array methods
  const lastElement = Arr.last(data);
}

// Filtering and working with arrays
const possiblyEmptyArrays: readonly number[][] = [[1, 2, 3], [], [4, 5], []];

// Get only non-empty arrays with proper typing
const definitelyNonEmpty = possiblyEmptyArrays.filter(Arr.isNonEmpty);
// Type: NonEmptyArray<number>[]

// Now safe to access elements
const firstElements = definitelyNonEmpty.map((arr) => arr[0]); // [1, 4]

// Early validation
function calculateAverage(numbers: readonly number[]): number {
  if (!Arr.isNonEmpty(numbers)) {
    throw new Error('Cannot calculate average of empty array');
  }

  // numbers is now NonEmptyArray<number>
  return Arr.sum(numbers) / Arr.size(numbers);
}

// Functional composition
const arrayGroups = [[1, 2], [], [3, 4, 5], []];

const nonEmptyGroups = arrayGroups
  .filter(Arr.isNonEmpty) // Filter to NonEmptyArray<number>[]
  .map((group) => group[0]); // Safe access to first element: [1, 3]

// Combined with other array operations
function processArraySafely<T>(
  arr: readonly T[],
  processor: (item: T) => string,
): string {
  if (Arr.isNonEmpty(arr)) {
    return arr.map(processor).join(' -> ');
  }
  return 'No items to process';
}

// Type inference examples
const testArray = [1, 2, 3];
const isNonEmptyResult = Arr.isNonEmpty(testArray);

expectType<typeof isNonEmptyResult, boolean>('=');
expectType<Parameters<typeof Arr.isNonEmpty>[0], readonly unknown[]>('=');

// Type narrowing in conditional
if (Arr.isNonEmpty(testArray)) {
  expectType<typeof testArray, NonEmptyArray<number>>('=');
}
