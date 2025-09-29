// Example: src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.floor(asFiniteNumber(5.8)); // Int (5)
FiniteNumber.floor(asFiniteNumber(-5.2)); // Int (-6)
