// Sample code extracted from src/array/array-utils.mts (toSorted)
import { Arr } from 'ts-data-forge';

const items = [
  { name: 'Eve', score: 70 },
  { name: 'Adam', score: 90 },
  { name: 'Bob', score: 80 },
];
Arr.toSortedBy(items, (item) => item.score);
// [{ name: 'Eve', score: 70 }, { name: 'Bob', score: 80 }, { name: 'Adam', score: 90 }]
Arr.toSortedBy(
  items,
  (item) => item.score,
  (a, b) => b - a,
); // Sort descending
// [{ name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }, { name: 'Eve', score: 70 }]
