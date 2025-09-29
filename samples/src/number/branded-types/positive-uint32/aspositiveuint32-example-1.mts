// Example: src/number/branded-types/positive-uint32.mts (positive-uint32)
import { PositiveUint32, asPositiveUint32 } from 'ts-data-forge';

const value = asPositiveUint32(1);
const other = asPositiveUint32(2);
const added = PositiveUint32.add(value, other);
const isValue = PositiveUint32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
