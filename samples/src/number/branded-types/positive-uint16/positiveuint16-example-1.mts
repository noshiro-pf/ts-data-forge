// Example: src/number/branded-types/positive-uint16.mts (positive-uint16)
import { PositiveUint16, asPositiveUint16 } from 'ts-data-forge';

const value = asPositiveUint16(1);
const other = asPositiveUint16(2);
const added = PositiveUint16.add(value, other);
const isValue = PositiveUint16.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
