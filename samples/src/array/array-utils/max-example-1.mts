// Sample code extracted from src/array/array-utils.mts (max)
import { Arr } from 'ts-data-forge';

Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
Arr.max([]); // Optional.none
