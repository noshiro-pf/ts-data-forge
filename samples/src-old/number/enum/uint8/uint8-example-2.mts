// Example: src/number/enum/uint8.mts (Uint8 utilities)
import { Uint8 } from 'ts-data-forge';

// Clamp raw numbers into the Uint8 range [0, 255]

const byte = Uint8.clamp(200);
assert.strictEqual(byte, 200);

const normalized = Uint8.clamp(-25);
assert.strictEqual(normalized, 0);

// Inspect boundaries via namespace helpers

const zero = Uint8.MIN_VALUE;
assert.strictEqual(zero, 0);

const max = Uint8.MAX_VALUE;
assert.strictEqual(max, 255);

// Combine Uint8 values with safe arithmetic (automatic clamping)

const doubled = Uint8.mul(byte, 2);
assert.strictEqual(doubled, 255);
