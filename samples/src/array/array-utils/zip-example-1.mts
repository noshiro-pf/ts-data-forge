// Example: src/array/array-utils.mts (zip)
import { Arr } from 'ts-data-forge';

Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
Arr.zip([], ['a']); // []
