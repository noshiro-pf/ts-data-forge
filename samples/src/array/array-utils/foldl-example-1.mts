// Example: src/array/array-utils.mts (foldl)
import { Arr } from 'ts-data-forge';

Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldl(['a', 'b', 'c'], (acc, str) => acc + str.toUpperCase(), ''); // 'ABC'
