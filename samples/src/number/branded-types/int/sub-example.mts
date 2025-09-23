// Example: src/number/branded-types/int.mts (Int.sub)
import { Int, asInt } from 'ts-data-forge';

const difference = Int.sub(asInt(12), asInt(8));

assert.strictEqual(difference, 4);
