// Example: src/number/branded-types/int.mts (Int.add)
import { Int, asInt } from 'ts-data-forge';

const sum = Int.add(asInt(12), asInt(8));

assert.strictEqual(sum, 20);
