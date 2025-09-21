// Sample code extracted from src/array/array-utils.mts (flat)
import { Arr, SafeUint } from 'ts-data-forge';

// Direct usage
const nested = [1, [2, [3, 4]], 5];
const flat1 = Arr.flat(nested, 1); // [1, 2, [3, 4], 5]
const flat2 = Arr.flat(nested, 2); // [1, 2, 3, 4, 5]

// Curried usage
const flattenOnceLevel = Arr.flat(1);
const result = flattenOnceLevel([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

// Flatten all levels
const deepNested = [1, [2, [3, [4, 5]]]];
const allFlat = Arr.flat(deepNested, SafeUint.MAX_VALUE); // [1, 2, 3, 4, 5]
