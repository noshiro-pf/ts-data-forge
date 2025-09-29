// Example: src/number/branded-types/non-zero-int.mts (non-zero-int)
import { NonZeroInt, asNonZeroInt } from 'ts-data-forge';

const value = asNonZeroInt(1);
const other = asNonZeroInt(2);
const added = NonZeroInt.add(value, other);
const isValue = NonZeroInt.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
