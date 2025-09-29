// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.round(asFiniteNumber(5.4)); // Int (5)
FiniteNumber.round(asFiniteNumber(5.6)); // Int (6)
FiniteNumber.round(asFiniteNumber(5.5)); // Int (6)
