// Sample code extracted from src/number/branded-types/finite-number.mts (finite-number)
import { FiniteNumber, asFiniteNumber } from 'ts-data-forge';

// Random percentage (0-100)
const pct = FiniteNumber.random(asFiniteNumber(0), asFiniteNumber(100));

// Random coordinate (-1 to 1)
const coord = FiniteNumber.random(asFiniteNumber(-1), asFiniteNumber(1));

export { coord, pct };
