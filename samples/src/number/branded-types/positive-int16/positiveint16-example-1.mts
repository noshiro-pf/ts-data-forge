// Example: src/number/branded-types/positive-int16.mts (positive-int16)
import { PositiveInt16, asPositiveInt16 } from 'ts-data-forge';

const value = asPositiveInt16(1);
const other = asPositiveInt16(2);
const added = PositiveInt16.add(value, other);
const isValue = PositiveInt16.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
