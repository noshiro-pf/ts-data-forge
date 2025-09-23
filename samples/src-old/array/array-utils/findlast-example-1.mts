// Example: src/array/array-utils.mts (findLast)
import { Arr, Optional } from 'ts-data-forge';

// Direct usage
const numbers = [1, 2, 3, 4, 5];
const lastEven = Arr.findLast(numbers, (n) => n % 2 === 0);
assert.ok(Optional.isSome(lastEven));
if (Optional.isSome(lastEven)) {
  assert.strictEqual(lastEven.value, 4);
}

// Curried usage
const isPositive = (n: number) => n > 0;
const findLastPositive = Arr.findLast(isPositive);
const result = findLastPositive([-1, 2, -3, 4]);
assert.ok(Optional.isSome(result));
if (Optional.isSome(result)) {
  assert.strictEqual(result.value, 4);
}

// No match
const noMatch = Arr.findLast([1, 3, 5], (n) => n % 2 === 0);
assert.ok(Optional.isNone(noMatch));
