// Example: src/array/array-utils.mts (setDifference)
import { Arr } from 'ts-data-forge';

Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
Arr.setDifference([1, 2], [3, 4]); // [1, 2]
