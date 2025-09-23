// Example: src/number/branded-types/safe-int.mts (SafeInt.div)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const quotient = SafeInt.div(asSafeInt(-17), asSafeInt(5));

assert.strictEqual(quotient, -4);
assert.strictEqual(SafeInt.is(quotient), true);
