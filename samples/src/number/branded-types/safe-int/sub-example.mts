// Example: src/number/branded-types/safe-int.mts (SafeInt.sub)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const difference = SafeInt.sub(asSafeInt(9), asSafeInt(14));

assert.strictEqual(difference, -5);
assert.strictEqual(SafeInt.is(difference), true);
