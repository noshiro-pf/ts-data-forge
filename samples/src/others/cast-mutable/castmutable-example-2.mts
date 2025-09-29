// Example: src/others/cast-mutable.mts (castMutable)
// When to use - Working with third-party APIs

import { castMutable } from 'ts-data-forge';

// Some APIs require mutable arrays but you have readonly data
const readonlyData: readonly string[] = ['a', 'b', 'c'];
const sortedData = castMutable([...readonlyData]); // Create a copy first!
legacyApi.sort(sortedData); // API mutates the array

export { readonlyData, sortedData };
