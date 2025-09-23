// Example: src/number/branded-types/uint.mts (Uint.mul)
import { Uint, asUint } from 'ts-data-forge';

const product = Uint.mul(asUint(7), asUint(6));

assert.strictEqual(product, 42);
