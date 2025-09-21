// Sample code extracted from src/number/branded-types/finite-number.mts (isFiniteNumber)
import { isFiniteNumber } from 'ts-data-forge';

isFiniteNumber(42); // true
isFiniteNumber(3.14); // true
isFiniteNumber(-0); // true
isFiniteNumber(Infinity); // false
isFiniteNumber(-Infinity); // false
isFiniteNumber(NaN); // false
isFiniteNumber(1 / 0); // false (Infinity)
