// Example: src/number/branded-types/safe-int.mts (SafeInt.clamp)
import { SafeInt } from 'ts-data-forge';

const aboveRange = SafeInt.clamp(1e20);
const withinRange = SafeInt.clamp(123);
const belowRange = SafeInt.clamp(-1e20);

assert.strictEqual(aboveRange, Number.MAX_SAFE_INTEGER);
assert.strictEqual(withinRange, 123);
assert.strictEqual(belowRange, Number.MIN_SAFE_INTEGER);
