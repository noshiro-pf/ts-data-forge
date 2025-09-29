// Example: src/number/branded-types/positive-finite-number.mts (asPositiveFiniteNumber)
import { asPositiveFiniteNumber } from 'ts-data-forge';

const x = asPositiveFiniteNumber(5.5); // PositiveFiniteNumber
const y = asPositiveFiniteNumber(0.001); // PositiveFiniteNumber
// asPositiveFiniteNumber(0); // throws TypeError
// asPositiveFiniteNumber(-1); // throws TypeError

export { x, y };
