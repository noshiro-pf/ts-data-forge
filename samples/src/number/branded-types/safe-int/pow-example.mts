// Example: src/number/branded-types/safe-int.mts (SafeInt.pow)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const base = asSafeInt(3);
const exponent = asSafeInt(5);
const power = SafeInt.pow(base, exponent);

assert.strictEqual(power, 243);
assert.strictEqual(SafeInt.is(power), true);
