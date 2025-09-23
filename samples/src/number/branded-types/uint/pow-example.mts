// Example: src/number/branded-types/uint.mts (Uint.pow)
import { Uint, asUint } from 'ts-data-forge';

const base = asUint(2);
const exponent = asUint(5);
const power = Uint.pow(base, exponent);

assert.strictEqual(power, 32);
