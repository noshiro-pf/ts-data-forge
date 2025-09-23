// Example: src/number/branded-types/safe-int.mts (SafeInt.abs)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const negative = asSafeInt(-900);
const absolute = SafeInt.abs(negative);

assert.strictEqual(absolute, 900);
assert.strictEqual(SafeInt.is(absolute), true);
