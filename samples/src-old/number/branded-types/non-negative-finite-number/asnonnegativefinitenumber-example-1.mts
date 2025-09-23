// Example: src/number/branded-types/non-negative-finite-number.mts (non-negative-finite-number)
import {
  NonNegativeFiniteNumber,
  asNonNegativeFiniteNumber,
} from 'ts-data-forge';

const value = asNonNegativeFiniteNumber(1.5);
const other = asNonNegativeFiniteNumber(2.5);
const added = NonNegativeFiniteNumber.add(value, other);
const isValue = NonNegativeFiniteNumber.is(value);

assert.strictEqual(added, 4);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2.5);
assert.strictEqual(value, 1.5);
