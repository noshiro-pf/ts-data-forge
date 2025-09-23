// Example: src/number/branded-types/int.mts (Int.max)
import { Int, asInt } from 'ts-data-forge';

const largest = Int.max(asInt(7), asInt(-3), asInt(2));

assert.strictEqual(largest, 7);
