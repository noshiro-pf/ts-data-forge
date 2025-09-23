// Example: src/array/array-utils.mts (toSorted)
import { Arr, expectType } from 'ts-data-forge';

const items = [
  { name: 'Eve', score: 70 },
  { name: 'Adam', score: 90 },
  { name: 'Bob', score: 80 },
] as const;

const asc = Arr.toSortedBy(items, (item) => item.score);
expectType<
  typeof asc,
  ArrayOfLength<
    3,
    | Readonly<{ name: 'Eve'; score: 70 }>
    | Readonly<{ name: 'Adam'; score: 90 }>
    | Readonly<{ name: 'Bob'; score: 80 }>
  >
>('=');
assert.deepStrictEqual(asc, [
  { name: 'Eve', score: 70 },
  { name: 'Bob', score: 80 },
  { name: 'Adam', score: 90 },
]);

const desc = Arr.toSortedBy(
  items,
  (item) => item.score,
  (a, b) => b - a,
);
expectType<
  typeof desc,
  ArrayOfLength<
    3,
    | Readonly<{ name: 'Eve'; score: 70 }>
    | Readonly<{ name: 'Adam'; score: 90 }>
    | Readonly<{ name: 'Bob'; score: 80 }>
  >
>('=');
assert.deepStrictEqual(desc, [
  { name: 'Adam', score: 90 },
  { name: 'Bob', score: 80 },
  { name: 'Eve', score: 70 },
]);
