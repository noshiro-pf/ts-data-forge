// Example: src/number/branded-types/non-zero-uint32.mts (asNonZeroUint32)
import { asNonZeroUint32 } from 'ts-data-forge';

const x = asNonZeroUint32(1000); // NonZeroUint32
const y = asNonZeroUint32(4_294_967_295); // NonZeroUint32
// asNonZeroUint32(0); // throws TypeError
// asNonZeroUint32(-1); // throws TypeError
// asNonZeroUint32(4294967296); // throws TypeError

export { x, y };
