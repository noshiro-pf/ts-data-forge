// Example: src/array/array-utils.mts (sum)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3, 4] as const;
const negatives = [3, -2, 5] as const;

const total = Arr.sum(numbers);
const totalNegatives = Arr.sum(negatives);

assert.strictEqual(total, 10);
assert.strictEqual(totalNegatives, 6);
