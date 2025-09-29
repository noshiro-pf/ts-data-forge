// Example: src/number/branded-types/int.mts (isInt)
import { isInt } from 'ts-data-forge';

isInt(5); // true
isInt(-10); // true
isInt(0); // true
isInt(5.5); // false
isInt(NaN); // false
isInt(Infinity); // false
