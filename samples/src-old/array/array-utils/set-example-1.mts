// Example: src/array/array-utils.mts (set)
import { Arr } from 'ts-data-forge';

// Basic usage
const tpl = ['a', 'b', 'c'] as const;
const updated = Arr.set(tpl, 1, 'B');
assert.deepStrictEqual(updated satisfies readonly unknown[], ['a', 'B', 'c']);
// Type changes are reflected
const mixed = [1, 'hello', true] as const;
const withNumber = Arr.set(mixed, 1, 42);
assert.deepStrictEqual(withNumber satisfies readonly unknown[], [1, 42, true]);
// Compile-time index validation
const short = [1, 2] as const;

// @ts-expect-error index 2 is out of bounds
assert.throws(() => Arr.set(short, 2, 3));

// Different value types
const nums = [1, 2, 3] as const;
const withString = Arr.set(nums, 0, 'first');
assert.deepStrictEqual(withString satisfies readonly unknown[], [
  'first',
  2,
  3,
]);
