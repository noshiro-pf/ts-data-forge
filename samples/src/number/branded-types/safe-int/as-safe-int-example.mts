// Example: src/number/branded-types/safe-int.mts (asSafeInt)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const branded = asSafeInt(123);

assert.strictEqual(branded, 123);
assert.strictEqual(SafeInt.is(branded), true);
