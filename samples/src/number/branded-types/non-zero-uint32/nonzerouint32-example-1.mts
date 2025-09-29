// Example: src/number/branded-types/non-zero-uint32.mts (non-zero-uint32)
import { NonZeroUint32, asNonZeroUint32 } from 'ts-data-forge';

const value = asNonZeroUint32(1);
const other = asNonZeroUint32(2);
const added = NonZeroUint32.add(value, other);
const isValue = NonZeroUint32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
