// Sample code extracted from src/number/branded-types/positive-int.mts (asPositiveInt)
import { asPositiveInt } from 'ts-data-forge';

const count = asPositiveInt(5); // PositiveInt
const length = asPositiveInt(100); // PositiveInt
const one = asPositiveInt(1); // PositiveInt (minimum valid)

// These throw TypeError:
// asPositiveInt(0);                 // Zero is not positive
// asPositiveInt(-1);                // Negative numbers not allowed
// asPositiveInt(5.5);               // Not an integer
// asPositiveInt(Infinity);          // Not finite
