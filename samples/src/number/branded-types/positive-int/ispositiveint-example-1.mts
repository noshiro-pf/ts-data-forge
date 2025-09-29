// Example: src/number/branded-types/positive-int.mts (isPositiveInt)
import { isPositiveInt } from 'ts-data-forge';

isPositiveInt(5); // true
isPositiveInt(1); // true
isPositiveInt(0); // false (zero is not positive)
isPositiveInt(-1); // false (negative)
isPositiveInt(5.5); // false (not an integer)
isPositiveInt(Number.NaN); // false
