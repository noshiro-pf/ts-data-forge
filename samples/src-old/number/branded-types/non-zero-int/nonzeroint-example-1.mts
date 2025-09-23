// Example: src/number/branded-types/non-zero-int.mts (non-zero-int)
import { NonZeroInt, asNonZeroInt } from 'ts-data-forge';

const value = asNonZeroInt(1);
const other = asNonZeroInt(2);
const added = NonZeroInt.add(value, other);
const isValue = NonZeroInt.is(value);

assert.strictEqual(added, 3);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2);
assert.strictEqual(value, 1);
