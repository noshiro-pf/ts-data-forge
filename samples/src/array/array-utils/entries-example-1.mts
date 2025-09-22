// Sample code extracted from src/array/array-utils.mts (entries)
import { Arr } from 'ts-data-forge';

// Direct usage
const fruits = ['apple', 'banana', 'cherry'];
const entries = Arr.entries(fruits); // [[0, 'apple'], [1, 'banana'], [2, 'cherry']]

// Curried usage
const getEntries = Arr.entries;
const result = getEntries(['a', 'b']); // [[0, 'a'], [1, 'b']]

// With tuples
const tuple = [10, 20, 30] as const;
const tupleEntries = Arr.entries(tuple); // [[0, 10], [1, 20], [2, 30]]

export { entries, fruits, getEntries, result, tuple, tupleEntries };
