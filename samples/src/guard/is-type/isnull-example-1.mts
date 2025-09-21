// Sample code extracted from src/guard/is-type.mts (isNull)
import { isNull } from 'ts-data-forge';

const value: string | null = getValue();

if (isNull(value)) {
  // value is now typed as null
  console.log('Value is null');
} else {
  // value is now typed as string
  console.log('Value length:', value.length);
}
