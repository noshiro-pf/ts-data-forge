// Sample code extracted from src/array/array-utils.mts (concat)
import { Arr } from 'ts-data-forge';

Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
Arr.concat([], [1, 2]); // [1, 2]
Arr.concat([1, 2], []); // [1, 2]
