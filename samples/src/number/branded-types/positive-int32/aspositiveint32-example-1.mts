// Sample code extracted from src/number/branded-types/positive-int32.mts (asPositiveInt32)
import { asPositiveInt32 } from 'ts-data-forge';

const x = asPositiveInt32(1000); // PositiveInt32
const y = asPositiveInt32(2147483647); // PositiveInt32
// asPositiveInt32(0); // throws TypeError
// asPositiveInt32(-1); // throws TypeError
// asPositiveInt32(2147483648); // throws TypeError
