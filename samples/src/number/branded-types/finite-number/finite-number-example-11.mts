// Sample code extracted from src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, Num, asFiniteNumber } from 'ts-data-forge';

const a = asFiniteNumber(11);
const b = asFiniteNumber(2);

FiniteNumber.div(a, b); // FiniteNumber (5.5)

// With non-zero type guard
const divisor = asFiniteNumber(userInput);
if (Num.isNonZero(divisor)) {
  const result = FiniteNumber.div(a, divisor);
}

export { a, b, divisor };
