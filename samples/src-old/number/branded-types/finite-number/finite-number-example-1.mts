// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

const value = asFiniteNumber(1.5);
const other = asFiniteNumber(2.5);
const added = FiniteNumber.add(value, other);
const isValue = FiniteNumber.is(value);

assert.strictEqual(added, 4);
assert.strictEqual(isValue, true);
assert.strictEqual(other, 2.5);
assert.strictEqual(value, 1.5);
