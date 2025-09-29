// Example: src/number/branded-types/positive-int32.mts (positive-int32)
import { PositiveInt32, asPositiveInt32 } from 'ts-data-forge';

const value = asPositiveInt32(1);
const other = asPositiveInt32(2);
const added = PositiveInt32.add(value, other);
const isValue = PositiveInt32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
