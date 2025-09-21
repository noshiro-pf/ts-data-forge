// Sample code extracted from src/array/array-utils.mts (tail)
import { Arr } from 'ts-data-forge';

Arr.tail([1, 2, 3] as const); // [2, 3]
Arr.tail([1] as const); // []
Arr.tail([]); // []
