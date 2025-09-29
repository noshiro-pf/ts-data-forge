// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.pow(asFiniteNumber(2.5), asFiniteNumber(3)); // FiniteNumber (15.625)
