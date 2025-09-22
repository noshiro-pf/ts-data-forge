// Sample code extracted from src/array/array-utils.mts (findLast)
import { Arr } from 'ts-data-forge';

// Direct usage
const numbers = [1, 2, 3, 4, 5];
const lastEven = Arr.findLast(numbers, (n) => n % 2 === 0); // Optional.some(4)

// Curried usage
const isPositive = (n: number) => n > 0;
const findLastPositive = Arr.findLast(isPositive);
const result = findLastPositive([-1, 2, -3, 4]); // Optional.some(4)

// No match
const noMatch = Arr.findLast([1, 3, 5], (n) => n % 2 === 0); // Optional.none

export { findLastPositive, isPositive, lastEven, noMatch, numbers, result };
