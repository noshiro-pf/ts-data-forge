// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

const value = asPositiveInt(1);
const other = asPositiveInt(2);
const added = PositiveInt.add(value, other);
const isValue = PositiveInt.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
