// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.pow)
import { PositiveSafeInt, asPositiveSafeInt } from 'ts-data-forge';

const base = asPositiveSafeInt(3);
const exponent = asPositiveSafeInt(3);
const power = PositiveSafeInt.pow(base, exponent);

assert.strictEqual(power, 27);
