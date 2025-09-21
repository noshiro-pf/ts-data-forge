// Sample code extracted from src/array/array-utils.mts (min)
import { Arr } from 'ts-data-forge';

Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
Arr.min([]); // Optional.none
