// Example: src/array/array-utils.mts (reduce)
import { Arr } from 'ts-data-forge';

const points = [5, 10, 15] as const;

const total = Arr.reduce(points, (acc, value) => acc + value, 0);
const totalFromCurried = Arr.reduce(
  (acc: number, value: number) => acc + value,
  10,
)([1, 2]);

assert.strictEqual(total, 30);
assert.strictEqual(totalFromCurried, 13);
