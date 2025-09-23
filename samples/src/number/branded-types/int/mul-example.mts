// Example: src/number/branded-types/int.mts (Int.mul)
import { Int, asInt } from 'ts-data-forge';

const product = Int.mul(asInt(-4), asInt(6));

assert.strictEqual(product, -24);
