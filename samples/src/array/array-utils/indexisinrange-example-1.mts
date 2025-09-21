// Sample code extracted from src/array/array-utils.mts (indexIsInRange)
import { Arr } from 'ts-data-forge';

Arr.indexIsInRange([10, 20], 0); // true
Arr.indexIsInRange([10, 20], 1); // true
Arr.indexIsInRange([10, 20], 2); // false
Arr.indexIsInRange([10, 20], -1); // false
Arr.indexIsInRange([], 0); // false
