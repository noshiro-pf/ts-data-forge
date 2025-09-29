// Example: src/number/branded-types/positive-uint32.mts (asPositiveUint32)
import { asPositiveUint32 } from 'ts-data-forge';

const x = asPositiveUint32(1000); // PositiveUint32
const y = asPositiveUint32(4294967295); // PositiveUint32
// asPositiveUint32(0); // throws TypeError
// asPositiveUint32(-1); // throws TypeError
// asPositiveUint32(4294967296); // throws TypeError

export { x, y };
