// Example: src/number/branded-types/non-zero-finite-number.mts (asNonZeroFiniteNumber)
import { asNonZeroFiniteNumber } from 'ts-data-forge';

const x = asNonZeroFiniteNumber(5.5); // NonZeroFiniteNumber
const y = asNonZeroFiniteNumber(-3.2); // NonZeroFiniteNumber
// asNonZeroFiniteNumber(0); // throws TypeError
// asNonZeroFiniteNumber(Infinity); // throws TypeError

export { x, y };
