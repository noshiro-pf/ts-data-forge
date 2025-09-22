// Sample code extracted from src/number/branded-types/non-zero-int.mts (asNonZeroInt)
import { asNonZeroInt } from 'ts-data-forge';

const x = asNonZeroInt(5); // NonZeroInt
const y = asNonZeroInt(-3); // NonZeroInt
// asNonZeroInt(0); // throws TypeError
// asNonZeroInt(1.5); // throws TypeError

export { x, y };
