// Example: src/number/branded-types/non-zero-finite-number.mts (non-zero-finite-number)
import { NonZeroFiniteNumber, asNonZeroFiniteNumber } from 'ts-data-forge';

const value = asNonZeroFiniteNumber(1.5);
const other = asNonZeroFiniteNumber(2.5);
const added = NonZeroFiniteNumber.add(value, other);
const isValue = NonZeroFiniteNumber.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
