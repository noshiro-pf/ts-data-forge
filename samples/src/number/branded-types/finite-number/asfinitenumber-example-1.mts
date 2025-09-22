// Sample code extracted from src/number/branded-types/finite-number.mts (asFiniteNumber)
import { asFiniteNumber } from 'ts-data-forge';

const x = asFiniteNumber(5.5); // FiniteNumber
const y = asFiniteNumber(-10); // FiniteNumber
const z = asFiniteNumber(0); // FiniteNumber

// These throw TypeError:
// asFiniteNumber(Infinity);     // Not finite
// asFiniteNumber(-Infinity);    // Not finite
// asFiniteNumber(NaN);          // Not a number
// asFiniteNumber(Math.sqrt(-1)); // Results in NaN

export { x, y, z };
