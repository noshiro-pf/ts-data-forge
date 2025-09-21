// Sample code extracted from src/number/branded-types/non-zero-uint16.mts (asNonZeroUint16)
import { asNonZeroUint16 } from 'ts-data-forge';

const x = asNonZeroUint16(1000); // NonZeroUint16
const y = asNonZeroUint16(65535); // NonZeroUint16
// asNonZeroUint16(0); // throws TypeError
// asNonZeroUint16(-1); // throws TypeError
// asNonZeroUint16(65536); // throws TypeError
