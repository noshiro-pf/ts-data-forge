// Example: src/number/enum/int8.mts (asInt8)
import { asInt8 } from 'ts-data-forge';

const byte = asInt8(100); // Int8
const max = asInt8(127); // Int8 (maximum value)
const min = asInt8(-128); // Int8 (minimum value)
const zero = asInt8(0); // Int8

// These throw TypeError:
// asInt8(128);               // Exceeds maximum (127)
// asInt8(-129);              // Below minimum (-128)
// asInt8(1.5);               // Not an integer
// asInt8(NaN);               // Not a number

export { byte, max, min, zero };
