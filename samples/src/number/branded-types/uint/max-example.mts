// Example: src/number/branded-types/uint.mts (Uint.max)
import { Uint, asUint } from 'ts-data-forge';

const largest = Uint.max(asUint(7), asUint(3));

assert.strictEqual(largest, 7);
