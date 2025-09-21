// Sample code extracted from src/number/branded-types/non-negative-int16.mts (asNonNegativeInt16)
import { asNonNegativeInt16 } from 'ts-data-forge';

const x = asNonNegativeInt16(1000); // NonNegativeInt16
const y = asNonNegativeInt16(0); // NonNegativeInt16
// asNonNegativeInt16(-1); // throws TypeError
// asNonNegativeInt16(32768); // throws TypeError
