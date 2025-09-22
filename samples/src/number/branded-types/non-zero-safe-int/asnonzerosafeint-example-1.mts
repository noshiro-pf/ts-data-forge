// Sample code extracted from src/number/branded-types/non-zero-safe-int.mts (asNonZeroSafeInt)
import { asNonZeroSafeInt } from 'ts-data-forge';

const x = asNonZeroSafeInt(5); // NonZeroSafeInt
const y = asNonZeroSafeInt(-1000); // NonZeroSafeInt
// asNonZeroSafeInt(0); // throws TypeError
// asNonZeroSafeInt(1.5); // throws TypeError

export { x, y };
