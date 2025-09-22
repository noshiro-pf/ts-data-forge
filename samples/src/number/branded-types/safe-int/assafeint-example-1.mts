// Sample code extracted from src/number/branded-types/safe-int.mts (asSafeInt)
import { asSafeInt } from 'ts-data-forge';

const x = asSafeInt(5); // SafeInt
const y = asSafeInt(-1000); // SafeInt
const z = asSafeInt(2 ** 50); // SafeInt (within range)

// These throw TypeError:
// asSafeInt(1.5);                      // Not an integer
// asSafeInt(Number.MAX_SAFE_INTEGER + 1); // Exceeds safe range
// asSafeInt(2**53);                    // Loss of precision

export { x, y, z };
