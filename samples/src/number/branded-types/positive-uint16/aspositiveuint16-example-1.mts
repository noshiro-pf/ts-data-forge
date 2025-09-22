// Sample code extracted from src/number/branded-types/positive-uint16.mts (asPositiveUint16)
import { asPositiveUint16 } from 'ts-data-forge';

const x = asPositiveUint16(1000); // PositiveUint16
const y = asPositiveUint16(65535); // PositiveUint16
// asPositiveUint16(0); // throws TypeError
// asPositiveUint16(-1); // throws TypeError
// asPositiveUint16(65536); // throws TypeError

export { x, y };
