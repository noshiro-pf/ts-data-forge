// Example: src/number/branded-types/int.mts (Int.div)
import { Int, asInt } from 'ts-data-forge';

const dividend = asInt(17);
const divisor = asInt(5);
const quotient = Int.div(dividend, divisor);

assert.strictEqual(quotient, 3);
