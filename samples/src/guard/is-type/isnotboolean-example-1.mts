// Sample code extracted from src/guard/is-type.mts (isNotBoolean)
import { isNotBoolean } from 'ts-data-forge';

type MixedValue = string | number | boolean;
const value: MixedValue = getValue();

if (isNotBoolean(value)) {
  // value is now string | number
  console.log('Non-boolean value:', value);
}

export { value };
export type { MixedValue };
