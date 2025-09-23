// Example: src/number/branded-types/int.mts (Int.min)
import { Int, asInt } from 'ts-data-forge';

const smallest = Int.min(asInt(7), asInt(-3), asInt(2));

assert.strictEqual(smallest, -3);
