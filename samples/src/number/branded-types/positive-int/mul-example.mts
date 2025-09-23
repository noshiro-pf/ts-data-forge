// Example: src/number/branded-types/positive-int.mts (PositiveInt.mul)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const product = PositiveInt.mul(asPositiveInt(3), asPositiveInt(7));

assert.strictEqual(product, 21);
