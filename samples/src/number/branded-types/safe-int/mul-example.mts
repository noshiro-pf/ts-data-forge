// Example: src/number/branded-types/safe-int.mts (SafeInt.mul)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const product = SafeInt.mul(asSafeInt(-8), asSafeInt(7));

assert.strictEqual(product, -56);
assert.strictEqual(SafeInt.is(product), true);
