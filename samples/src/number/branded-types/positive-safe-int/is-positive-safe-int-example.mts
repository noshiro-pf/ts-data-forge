// Example: src/number/branded-types/positive-safe-int.mts (isPositiveSafeInt)
import { PositiveSafeInt, isPositiveSafeInt } from 'ts-data-forge';

assert.strictEqual(isPositiveSafeInt(1), true);
assert.strictEqual(isPositiveSafeInt(Number.MAX_SAFE_INTEGER), true);
assert.strictEqual(isPositiveSafeInt(0), false);
assert.strictEqual(PositiveSafeInt.is(42), true);
