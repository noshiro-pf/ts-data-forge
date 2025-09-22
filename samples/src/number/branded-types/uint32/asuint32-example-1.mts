// Sample code extracted from src/number/branded-types/uint32.mts (asUint32)
import { asUint32 } from 'ts-data-forge';

const x = asUint32(1000000); // Uint32
const y = asUint32(0); // Uint32
// asUint32(-1); // throws TypeError
// asUint32(5000000000); // throws TypeError

export { x, y };
