// Example: src/number/branded-types/non-zero-int16.mts (non-zero-int16)
import { NonZeroInt16, asNonZeroInt16 } from 'ts-data-forge';

const value = asNonZeroInt16(1);
const other = asNonZeroInt16(2);
const added = NonZeroInt16.add(value, other);
const isValue = NonZeroInt16.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
