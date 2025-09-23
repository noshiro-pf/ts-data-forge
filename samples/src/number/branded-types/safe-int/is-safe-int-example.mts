// Example: src/number/branded-types/safe-int.mts (isSafeInt)
import { SafeInt, isSafeInt } from 'ts-data-forge';

assert.strictEqual(isSafeInt(Number.MAX_SAFE_INTEGER), true);
assert.strictEqual(isSafeInt(Number.MAX_SAFE_INTEGER + 0.5), false);
assert.strictEqual(SafeInt.is(Number.MIN_SAFE_INTEGER), true);
