// Example: src/number/branded-types/non-zero-int32.mts (non-zero-int32)
import { NonZeroInt32, asNonZeroInt32 } from 'ts-data-forge';

const value = asNonZeroInt32(1);
const other = asNonZeroInt32(2);
const added = NonZeroInt32.add(value, other);
const isValue = NonZeroInt32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
