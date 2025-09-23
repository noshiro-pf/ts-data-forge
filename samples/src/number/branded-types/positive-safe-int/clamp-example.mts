// Example: src/number/branded-types/positive-safe-int.mts (PositiveSafeInt.clamp)
import { PositiveSafeInt } from 'ts-data-forge';

const belowRange = PositiveSafeInt.clamp(0);
const withinRange = PositiveSafeInt.clamp(123);
const aboveRange = PositiveSafeInt.clamp(Number.MAX_SAFE_INTEGER + 10);

assert.strictEqual(belowRange, 1);
assert.strictEqual(withinRange, 123);
assert.strictEqual(aboveRange, Number.MAX_SAFE_INTEGER);
