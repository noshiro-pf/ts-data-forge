// Sample code extracted from src/array/array-utils.mts (every)
import { Arr } from 'ts-data-forge';

// Direct usage
const numbers = [2, 4, 6, 8];
const allEven = Arr.every(numbers, (n) => n % 2 === 0); // true

// Type guard usage - narrows entire array type
const mixed: (string | number)[] = ['hello', 'world'];
if (Arr.every(mixed, (x): x is string => typeof x === 'string')) {
  // TypeScript knows mixed is string[] here
  console.log(mixed.map((s) => s.toUpperCase()));
}

// Curried usage with type guards
const isString = (x: unknown): x is string => typeof x === 'string';
const allStrings = Arr.every(isString);
const data: unknown[] = ['a', 'b', 'c'];
if (allStrings(data)) {
  // TypeScript knows data is string[] here
  console.log(data.join(''));
}

// Empty array
const empty: number[] = [];
const result2 = Arr.every(empty, (n) => n > 0); // true

export { allEven, allStrings, data, empty, isString, mixed, numbers, result2 };
