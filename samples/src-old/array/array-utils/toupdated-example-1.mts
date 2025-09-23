// Example: src/array/array-utils.mts (toUpdated)
import { Arr } from 'ts-data-forge';

const numbers = [10, 20, 30] as const;
const doubled = Arr.toUpdated(numbers, 1, (value) => value * 2);
const labels = Arr.toUpdated(numbers, 2, (value) => `value: ${value}`);

const users = [
  { id: 1, active: false },
  { id: 2, active: false },
] as const;

const activated = Arr.toUpdated(users, 1, (user) => ({
  ...user,
  active: true,
}));

assert.deepStrictEqual(activated, [
  {
    id: 1,
    active: false,
  },
  {
    id: 2,
    active: true,
  },
]);
assert.deepStrictEqual(doubled, [10, 40, 30]);
assert.deepStrictEqual(labels, [10, 20, 'value: 30']);
assert.deepStrictEqual(numbers, [10, 20, 30]);
assert.deepStrictEqual(users, [
  {
    id: 1,
    active: false,
  },
  {
    id: 2,
    active: false,
  },
]);
