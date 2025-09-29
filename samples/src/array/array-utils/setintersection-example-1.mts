// Example: src/array/array-utils.mts (setIntersection)
import { Arr } from 'ts-data-forge';

Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
Arr.setIntersection([1, 2], [3, 4]); // []
