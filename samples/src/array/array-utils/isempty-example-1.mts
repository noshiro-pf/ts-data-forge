// Sample code extracted from src/array/array-utils.mts (isEmpty)
import { Arr } from 'ts-data-forge';

// Basic emptiness checking
const emptyArray: number[] = [];
const nonEmptyArray = [1, 2, 3];

console.log(Arr.isEmpty(emptyArray)); // true
console.log(Arr.isEmpty(nonEmptyArray)); // false

// Type guard behavior
function processArray(arr: readonly number[]) {
  if (Arr.isEmpty(arr)) {
    // arr is now typed as readonly []
    console.log('Array is empty');
    // arr[0]; // type error!
    return 0;
  }
}

// Early returns
function sumArray(numbers: readonly number[]): number {
  if (Arr.isEmpty(numbers)) {
    return 0; // Handle empty case early
  }
  return numbers.reduce((sum, n) => sum + n, 0);
}
