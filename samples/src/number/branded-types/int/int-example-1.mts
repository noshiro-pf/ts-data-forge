// Example: src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

const value = asInt(1);
const other = asInt(2);
const added = Int.add(value, other);
const isValue = Int.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
