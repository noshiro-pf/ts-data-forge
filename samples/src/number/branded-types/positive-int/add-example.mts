// Example: src/number/branded-types/positive-int.mts (PositiveInt.add)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const sum = PositiveInt.add(asPositiveInt(4), asPositiveInt(5));

assert.strictEqual(sum, 9);
