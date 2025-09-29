// Example: src/number/branded-types/non-zero-uint16.mts (non-zero-uint16)
import { NonZeroUint16, asNonZeroUint16 } from 'ts-data-forge';

const value = asNonZeroUint16(1);
const other = asNonZeroUint16(2);
const added = NonZeroUint16.add(value, other);
const isValue = NonZeroUint16.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
