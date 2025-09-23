// Example: src/number/branded-types/non-zero-safe-int.mts (non-zero-safe-int)
import { NonZeroSafeInt, asNonZeroSafeInt } from 'ts-data-forge';

const value = asNonZeroSafeInt(1);
const other = asNonZeroSafeInt(2);
const added = NonZeroSafeInt.add(value, other);
const isValue = NonZeroSafeInt.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
