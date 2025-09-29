// Example: src/array/array-utils.mts (butLast)
import { Arr } from 'ts-data-forge';

Arr.butLast([1, 2, 3] as const); // [1, 2]
Arr.butLast([1] as const); // []
Arr.butLast([]); // []
