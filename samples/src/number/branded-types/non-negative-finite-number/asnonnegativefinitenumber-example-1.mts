// Example: src/number/branded-types/non-negative-finite-number.mts (non-negative-finite-number)
import { NonNegativeFiniteNumber, asNonNegativeFiniteNumber } from 'ts-data-forge';

const value = asNonNegativeFiniteNumber(1.5);
const other = asNonNegativeFiniteNumber(2.5);
const added = NonNegativeFiniteNumber.add(value, other);
const isValue = NonNegativeFiniteNumber.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
