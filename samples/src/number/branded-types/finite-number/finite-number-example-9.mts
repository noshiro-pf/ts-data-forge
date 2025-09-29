// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.sub(asFiniteNumber(8.7), asFiniteNumber(3.2)); // FiniteNumber (5.5)
