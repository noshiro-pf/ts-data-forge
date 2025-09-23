// Example: src/number/branded-types/positive-finite-number.mts (positive-finite-number)
import { PositiveFiniteNumber, asPositiveFiniteNumber } from 'ts-data-forge';

const value = asPositiveFiniteNumber(1.5);
const other = asPositiveFiniteNumber(2.5);
const added = PositiveFiniteNumber.add(value, other);
const isValue = PositiveFiniteNumber.is(value);

assert.strictEqual(added, 4);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2.5);
assert.strictEqual(value, 1.5);
