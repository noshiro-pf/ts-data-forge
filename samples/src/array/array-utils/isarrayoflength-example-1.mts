// Sample code extracted from src/array/array-utils.mts (isArrayOfLength)
import { Arr } from 'ts-data-forge';

const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayOfLength(arr, 3)) {
  // arr is now typed as readonly [number, number, number]
}
Arr.isArrayOfLength([1, 2], 3); // false

export { arr };
