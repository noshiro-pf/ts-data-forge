// Example: src/number/branded-types/int16.mts (int16)
import { Int16, asInt16 } from 'ts-data-forge';

const value = asInt16(1);
const other = asInt16(2);
const added = Int16.add(value, other);
const isValue = Int16.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
