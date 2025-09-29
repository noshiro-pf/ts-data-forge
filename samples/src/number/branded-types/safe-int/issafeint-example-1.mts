// Example: src/number/branded-types/safe-int.mts (isSafeInt)
import { isSafeInt } from 'ts-data-forge';

isSafeInt(42); // true
isSafeInt(Number.MAX_SAFE_INTEGER); // true
isSafeInt(Number.MAX_SAFE_INTEGER + 1); // false
isSafeInt(3.14); // false
isSafeInt(NaN); // false
