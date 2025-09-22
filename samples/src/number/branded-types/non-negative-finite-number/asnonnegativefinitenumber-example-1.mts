// Sample code extracted from src/number/branded-types/non-negative-finite-number.mts (asNonNegativeFiniteNumber)
import { asNonNegativeFiniteNumber } from 'ts-data-forge';

const x = asNonNegativeFiniteNumber(5.5); // NonNegativeFiniteNumber
const y = asNonNegativeFiniteNumber(0); // NonNegativeFiniteNumber
// asNonNegativeFiniteNumber(-1); // throws TypeError
// asNonNegativeFiniteNumber(Infinity); // throws TypeError

export { x, y };
