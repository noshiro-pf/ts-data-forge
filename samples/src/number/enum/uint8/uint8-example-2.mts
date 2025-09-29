// Example: src/number/enum/uint8.mts (Uint8 utilities)
import { Uint8 } from 'ts-data-forge';

// Clamp raw numbers into the Uint8 range [0, 255]
const byte = Uint8.clamp(200); // 200 -> Uint8
const normalized = Uint8.clamp(-25); // Clamped to 0

// Inspect boundaries via namespace helpers
const zero = Uint8.MIN_VALUE;
const max = Uint8.MAX_VALUE;

// Combine Uint8 values with safe arithmetic (automatic clamping)
const doubled = Uint8.mul(byte, 2);

// embed-sample-code-ignore-below
export { byte, doubled, max, normalized, zero };
