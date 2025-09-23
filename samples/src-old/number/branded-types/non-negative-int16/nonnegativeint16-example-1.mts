// Example: src/number/branded-types/non-negative-int16.mts (non-negative-int16)
import { NonNegativeInt16, asNonNegativeInt16 } from 'ts-data-forge';

const value = asNonNegativeInt16(0);
const other = asNonNegativeInt16(2);
const added = NonNegativeInt16.add(value, other);
const isValue = NonNegativeInt16.is(value);

assert.strictEqual(added, 2);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 0);
