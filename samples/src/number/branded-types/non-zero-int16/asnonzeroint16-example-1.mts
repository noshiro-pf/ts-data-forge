// Sample code extracted from src/number/branded-types/non-zero-int16.mts (asNonZeroInt16)
import { asNonZeroInt16 } from 'ts-data-forge';

const x = asNonZeroInt16(1000); // NonZeroInt16
const y = asNonZeroInt16(-1000); // NonZeroInt16
// asNonZeroInt16(0); // throws TypeError
// asNonZeroInt16(32768); // throws TypeError

export { x, y };
