// Example: src/array/array-utils.mts (toSortedBy)
import { Arr } from 'ts-data-forge';

const items = [
  { name: 'Eve', score: 70 },
  { name: 'Adam', score: 90 },
  { name: 'Bob', score: 80 },
] as const;

const asc = Arr.toSortedBy(items, (item) => item.score);
assert.deepStrictEqual(
  asc satisfies readonly {
    name: string;
    score: number;
  }[],
  [
    { name: 'Eve', score: 70 },
    { name: 'Bob', score: 80 },
    { name: 'Adam', score: 90 },
  ],
);

const desc = Arr.toSortedBy(
  items,
  (item) => item.score,
  (a, b) => b - a,
);
assert.deepStrictEqual(
  desc satisfies readonly {
    name: string;
    score: number;
  }[],
  [
    { name: 'Adam', score: 90 },
    { name: 'Bob', score: 80 },
    { name: 'Eve', score: 70 },
  ],
);
