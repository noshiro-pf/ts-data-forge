// Example: src/number/branded-types/uint.mts (Uint.clamp)
import { Uint } from 'ts-data-forge';

const clampedNegative = Uint.clamp(-5);
const clampedPositive = Uint.clamp(42);

assert.strictEqual(clampedNegative, 0);
assert.strictEqual(clampedPositive, 42);
