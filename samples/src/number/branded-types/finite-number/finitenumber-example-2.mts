// Example: src/number/branded-types/finite-number.mts (FiniteNumber)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.abs(asFiniteNumber(-5.5)); // FiniteNumber (5.5)
FiniteNumber.abs(asFiniteNumber(3.2)); // FiniteNumber (3.2)
