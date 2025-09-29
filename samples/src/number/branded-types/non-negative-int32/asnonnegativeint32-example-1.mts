// Example: src/number/branded-types/non-negative-int32.mts (non-negative-int32)
import { NonNegativeInt32, asNonNegativeInt32 } from 'ts-data-forge';

const value = asNonNegativeInt32(0);
const other = asNonNegativeInt32(2);
const added = NonNegativeInt32.add(value, other);
const isValue = NonNegativeInt32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
