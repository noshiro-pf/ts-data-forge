// Example: src/number/branded-types/uint.mts (Uint.sub)
import { Uint, asUint } from 'ts-data-forge';

const difference = Uint.sub(asUint(5), asUint(8));

assert.strictEqual(difference, 0);
