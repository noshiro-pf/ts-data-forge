// Example: src/array/array-utils.mts (countBy)
import { Arr, IMap } from 'ts-data-forge';

const values = [
  { type: 'fruit' },
  { type: 'fruit' },
  { type: 'vegetable' },
] as const;

const counted = Arr.countBy(values, ({ type }) => type);

assert.deepStrictEqual(
  counted,
  IMap.create<'fruit' | 'vegetable', 0 | 1 | 2>([
    ['fruit', 2],
    ['vegetable', 1],
  ]),
);
