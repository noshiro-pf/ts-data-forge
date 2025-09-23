// Example: src/number/branded-types/positive-safe-int.mts (asPositiveSafeInt)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const branded = asPositiveSafeInt(128);

assert.strictEqual(branded, 128);
assert.strictEqual(PositiveSafeInt.is(branded), true);
