// Example: src/number/branded-types/positive-int.mts (PositiveInt.clamp)
import { PositiveInt } from 'ts-data-forge';

const belowRange = PositiveInt.clamp(0);
const withinRange = PositiveInt.clamp(10);

assert.strictEqual(belowRange, 1);
assert.strictEqual(withinRange, 10);
