// Sample code extracted from src/number/branded-types/int32.mts (asInt32)
import { asInt32 } from 'ts-data-forge';

const x = asInt32(100000); // Int32
const y = asInt32(-500000); // Int32
// asInt32(3000000000); // throws TypeError
// asInt32(1.5); // throws TypeError

export { x, y };
