// Example: src/number/branded-types/positive-finite-number.mts (positive-finite-number)
import { PositiveFiniteNumber, asPositiveFiniteNumber } from 'ts-data-forge';

const value = asPositiveFiniteNumber(1.5);
const other = asPositiveFiniteNumber(2.5);
const added = PositiveFiniteNumber.add(value, other);
const isValue = PositiveFiniteNumber.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
