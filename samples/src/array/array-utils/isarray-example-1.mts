// Sample code extracted from src/array/array-utils.mts (isArray)
import { Arr } from 'ts-data-forge';

function processValue(value: string | number[] | null) {
  if (Arr.isArray(value)) {
    // value is now typed as number[]
    console.log(value.length);
  }
}

Arr.isArray([1, 2, 3]); // true
Arr.isArray('hello'); // false
Arr.isArray(null); // false

export { processValue };
