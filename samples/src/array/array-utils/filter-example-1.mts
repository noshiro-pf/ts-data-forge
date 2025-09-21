// Sample code extracted from src/array/array-utils.mts (filter)
import { Arr, pipe } from 'ts-data-forge';

// Direct usage
const numbers = [1, 2, 3, 4, 5];
const evens = Arr.filter(numbers, (n) => n % 2 === 0); // [2, 4]

// Type guard usage
const mixed: (string | number | null)[] = ['hello', 42, null, 'world'];
const strings = Arr.filter(mixed, (x): x is string => typeof x === 'string'); // string[]
const notNull = Arr.filter(mixed, (x): x is NonNullable<typeof x> => x != null); // (string | number)[]

// Curried usage with type guards
const isString = (x: unknown): x is string => typeof x === 'string';
const filterStrings = Arr.filter(isString);
const result = filterStrings(['a', 1, 'b', 2]); // string[]

// Functional composition
const processNumbers = pipe(
  Arr.filter((n: number) => n > 0),
  Arr.map((n) => n * 2),
);
