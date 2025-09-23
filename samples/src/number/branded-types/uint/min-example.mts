// Example: src/number/branded-types/uint.mts (Uint.min)
import { Uint, asUint } from 'ts-data-forge';

const smallest = Uint.min(asUint(7), asUint(3));

assert.strictEqual(smallest, 3);
