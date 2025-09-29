// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

const a = asFiniteNumber(5.5);
const b = asFiniteNumber(3.2);
const c = asFiniteNumber(7.8);

FiniteNumber.max(a, b); // FiniteNumber (7.8)
FiniteNumber.max(a, b, c); // FiniteNumber (7.8)

export { a, b, c };
