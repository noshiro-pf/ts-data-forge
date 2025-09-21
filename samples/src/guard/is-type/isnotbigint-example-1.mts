// Sample code extracted from src/guard/is-type.mts (isNotBigint)
import { isNotBigint } from 'ts-data-forge';

type NumericValue = number | bigint;
const value: NumericValue = getValue();

if (isNotBigint(value)) {
  // value is now number
  console.log('Regular number:', value.toFixed(2));
}
