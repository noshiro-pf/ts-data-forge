// Example: src/array/array-utils.mts (isSuperset)
import { Arr } from 'ts-data-forge';

Arr.isSuperset([1, 2, 3], [1, 2]); // true
Arr.isSuperset([1, 2], [1, 2, 3]); // false
Arr.isSuperset([1, 2, 3], []); // true
