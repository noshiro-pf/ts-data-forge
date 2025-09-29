// Example: src/array/array-utils.mts (isArrayAtLeastLength)
import { Arr } from 'ts-data-forge';

const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayAtLeastLength(arr, 2)) {
  // arr is now typed as readonly [number, number, ...number[]]
}
Arr.isArrayAtLeastLength([1], 2); // false

export { arr };
