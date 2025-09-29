// Example: src/number/enum/uint8.mts (Uint8.is)
import { Uint8 } from 'ts-data-forge';

Uint8.is(100); // true
Uint8.is(0); // true (minimum value)
Uint8.is(255); // true (maximum value)
Uint8.is(256); // false (exceeds max)
Uint8.is(-1); // false (negative)
Uint8.is(5.5); // false (not integer)
