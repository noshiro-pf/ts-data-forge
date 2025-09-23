// Example: src/array/array-utils.mts (some)
import { Arr } from 'ts-data-forge';

// Direct usage
const numbers = [1, 3, 5, 8];
const hasEven = Arr.some(numbers, (n) => n % 2 === 0);
assert.strictEqual(hasEven, true);

// Curried usage
const isNegative = (n: number) => n < 0;
const hasNegative = Arr.some(isNegative);
const result = hasNegative([1, 2, -3]);
assert.strictEqual(result, true);

// Empty array
const empty: number[] = [];
const result2 = Arr.some(empty, (n) => n > 0);
assert.strictEqual(result2, false);
