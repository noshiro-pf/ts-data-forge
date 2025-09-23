// Example: src/number/branded-types/uint.mts (Uint.add)
import { Uint, asUint } from 'ts-data-forge';

const sum = Uint.add(asUint(5), asUint(8));

assert.strictEqual(sum, 13);
