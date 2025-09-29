// Example: src/number/branded-types/safe-uint.mts (safe-uint)
import { SafeUint, asSafeUint } from 'ts-data-forge';

const value = asSafeUint(1);
const other = asSafeUint(2);
const added = SafeUint.add(value, other);
const isValue = SafeUint.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
