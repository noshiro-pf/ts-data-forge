// Sample code extracted from src/number/branded-types/non-negative-int32.mts (asNonNegativeInt32)
import { asNonNegativeInt32 } from 'ts-data-forge';

const x = asNonNegativeInt32(1000); // NonNegativeInt32
const y = asNonNegativeInt32(0); // NonNegativeInt32
// asNonNegativeInt32(-1); // throws TypeError
// asNonNegativeInt32(2147483648); // throws TypeError

export { x, y };
