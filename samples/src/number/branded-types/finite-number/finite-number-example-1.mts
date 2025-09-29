// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

const a = asFiniteNumber(5.5);
const b = asFiniteNumber(3.2);
const c = asFiniteNumber(7.8);

FiniteNumber.min(a, b); // FiniteNumber (3.2)
FiniteNumber.min(a, b, c); // FiniteNumber (3.2)

export { a, b, c };
