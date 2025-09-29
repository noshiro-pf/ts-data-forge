// Example: src/number/branded-types/positive-int16.mts (asPositiveInt16)
import { asPositiveInt16 } from 'ts-data-forge';

const x = asPositiveInt16(1000); // PositiveInt16
const y = asPositiveInt16(32767); // PositiveInt16
// asPositiveInt16(0); // throws TypeError
// asPositiveInt16(-1); // throws TypeError
// asPositiveInt16(32768); // throws TypeError

export { x, y };
