// Sample code extracted from src/guard/is-type.mts (isNullish)
import { isNullish } from 'ts-data-forge';

const value: string | null | undefined = getValue();

if (isNullish(value)) {
  // value is now typed as null | undefined
  console.log('Value is nullish');
} else {
  // value is now typed as string
  console.log('Value length:', value.length);
}

export { value };
