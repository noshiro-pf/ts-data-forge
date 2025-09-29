// Example: src/number/branded-types/positive-safe-int.mts (asPositiveSafeInt)
import { asPositiveSafeInt } from 'ts-data-forge';

const x = asPositiveSafeInt(5); // PositiveSafeInt
const y = asPositiveSafeInt(1000); // PositiveSafeInt
// asPositiveSafeInt(0); // throws TypeError
// asPositiveSafeInt(-1); // throws TypeError

export { x, y };
