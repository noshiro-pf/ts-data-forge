// Sample code extracted from src/number/branded-types/int.mts (asInt)
import { asInt } from 'ts-data-forge';

const x = asInt(5); // Int
const y = asInt(-10); // Int
const z = asInt(0); // Int

// These throw TypeError:
// asInt(5.5);         // Not an integer
// asInt(NaN);         // Not a number
// asInt(Infinity);    // Not finite

export { x, y, z };
