// Example: src/number/num.mts (isPositive)
import { Num } from 'ts-data-forge';

const count = 5;
const average = Num.isPositive(count) ? 100 / count : undefined;

const value = 0 as -1 | 0 | 1 | 2;
const narrowed = Num.isPositive(value) ? value : undefined;

assert.strictEqual(average, 20);
assert.strictEqual(count, 5);
assert.strictEqual(narrowed, undefined);
assert.strictEqual(value, 0);
