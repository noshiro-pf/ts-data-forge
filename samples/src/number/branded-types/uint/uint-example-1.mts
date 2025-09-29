// Example: src/number/branded-types/uint.mts (uint)
import { Uint, asUint } from 'ts-data-forge';

const value = asUint(1);
const other = asUint(2);
const added = Uint.add(value, other);
const isValue = Uint.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
