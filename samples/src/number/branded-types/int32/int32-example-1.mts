// Example: src/number/branded-types/int32.mts (int32)
import { Int32, asInt32 } from 'ts-data-forge';

const value = asInt32(1);
const other = asInt32(2);
const added = Int32.add(value, other);
const isValue = Int32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
