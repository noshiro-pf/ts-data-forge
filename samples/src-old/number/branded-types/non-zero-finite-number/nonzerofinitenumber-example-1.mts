// Example: src/number/branded-types/non-zero-finite-number.mts (non-zero-finite-number)
import { NonZeroFiniteNumber, asNonZeroFiniteNumber } from 'ts-data-forge';

const value = asNonZeroFiniteNumber(1.5);
const other = asNonZeroFiniteNumber(2.5);
const added = NonZeroFiniteNumber.add(value, other);
const isValue = NonZeroFiniteNumber.is(value);

assert.strictEqual(added, 4);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2.5);
assert.strictEqual(value, 1.5);
