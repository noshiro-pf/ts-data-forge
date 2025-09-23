// Example: src/number/branded-types/safe-int.mts (SafeInt.add)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const sum = SafeInt.add(asSafeInt(9), asSafeInt(4));

assert.strictEqual(sum, 13);
assert.strictEqual(SafeInt.is(sum), true);
