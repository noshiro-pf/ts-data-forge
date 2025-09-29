// Example: src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const value = asSafeInt(1);
const other = asSafeInt(2);
const added = SafeInt.add(value, other);
const isValue = SafeInt.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
