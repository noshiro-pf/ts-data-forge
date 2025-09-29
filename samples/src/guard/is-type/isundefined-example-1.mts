// Example: src/guard/is-type.mts (isUndefined)
import { isUndefined } from 'ts-data-forge';

const value: string | undefined = getValue();

if (isUndefined(value)) {
  // value is now typed as undefined
  console.log('Value is undefined');
} else {
  // value is now typed as string
  console.log('Value length:', value.length);
}

export { value };
