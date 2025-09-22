// Sample code extracted from src/number/branded-types/int16.mts (asInt16)
import { asInt16 } from 'ts-data-forge';

const x = asInt16(1000); // Int16
const y = asInt16(-5000); // Int16
// asInt16(50000); // throws TypeError
// asInt16(1.5); // throws TypeError

export { x, y };
