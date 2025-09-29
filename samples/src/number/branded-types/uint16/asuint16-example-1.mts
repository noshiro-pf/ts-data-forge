// Example: src/number/branded-types/uint16.mts (asUint16)
import { asUint16 } from 'ts-data-forge';

const x = asUint16(1000); // Uint16
const y = asUint16(0); // Uint16
// asUint16(-1); // throws TypeError
// asUint16(70000); // throws TypeError

export { x, y };
