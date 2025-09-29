// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

const value = asUint32(1);
const other = asUint32(2);
const added = Uint32.add(value, other);
const isValue = Uint32.is(value);

const summary = {
  added,
  isValue,
  other,
  value,
};

// embed-sample-code-ignore-below
export { summary };
