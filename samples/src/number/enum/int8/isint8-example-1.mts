// Example: src/number/enum/int8.mts (isInt8)
import { isInt8 } from 'ts-data-forge';

isInt8(100); // true
isInt8(-50); // true
isInt8(127); // true (max value)
isInt8(-128); // true (min value)
isInt8(128); // false (exceeds max)
isInt8(-129); // false (below min)
isInt8(5.5); // false (not integer)
