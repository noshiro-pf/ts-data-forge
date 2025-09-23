// Example: src/number/branded-types/int.mts (Int.abs)
import { Int, asInt } from 'ts-data-forge';

const negative = asInt(-12);
const absolute = Int.abs(negative);

assert.strictEqual(absolute, 12);
assert.strictEqual(Int.is(absolute), true);
