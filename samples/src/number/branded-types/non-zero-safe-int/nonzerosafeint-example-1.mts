// Example: src/number/branded-types/non-zero-safe-int.mts (non-zero-safe-int)
import { NonZeroSafeInt, asNonZeroSafeInt } from 'ts-data-forge';

const value = asNonZeroSafeInt(1);
const other = asNonZeroSafeInt(2);
const added = NonZeroSafeInt.add(value, other);
const isValue = NonZeroSafeInt.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
