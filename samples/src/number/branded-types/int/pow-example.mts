// Example: src/number/branded-types/int.mts (Int.pow)
import { Int, asInt } from 'ts-data-forge';

const base = asInt(2);
const exponent = asInt(5);
const power = Int.pow(base, exponent);

assert.strictEqual(power, 32);
