// Example: src/number/num.mts (isNonNegative)
import { Num } from 'ts-data-forge';

const value = 10;
const isValueNonNegative = Num.isNonNegative(value);

const candidate = -1 as -1 | 0 | 1;
const narrowed = Num.isNonNegative(candidate) ? candidate : undefined;

assert.strictEqual(candidate, -1);
assert.strictEqual(isValueNonNegative, true);
assert.strictEqual(narrowed, undefined);
assert.strictEqual(value, 10);
