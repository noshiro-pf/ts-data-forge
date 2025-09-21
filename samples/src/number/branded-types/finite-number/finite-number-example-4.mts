// Sample code extracted from src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

FiniteNumber.ceil(asFiniteNumber(5.2)); // Int (6)
FiniteNumber.ceil(asFiniteNumber(-5.8)); // Int (-5)
