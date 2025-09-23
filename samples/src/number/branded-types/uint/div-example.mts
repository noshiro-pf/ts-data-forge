// Example: src/number/branded-types/uint.mts (Uint.div)
import { Uint, asUint } from 'ts-data-forge';

const quotient = Uint.div(asUint(10), asUint(4));

assert.strictEqual(quotient, 2);
