// Sample code extracted from src/number/branded-types/non-zero-int32.mts (asNonZeroInt32)
import { asNonZeroInt32 } from 'ts-data-forge';

const x = asNonZeroInt32(1000); // NonZeroInt32
const y = asNonZeroInt32(-1000); // NonZeroInt32
// asNonZeroInt32(0); // throws TypeError
// asNonZeroInt32(2147483648); // throws TypeError

export { x, y };
