// Example: src/number/num.mts (divInt)
import { Num } from 'ts-data-forge';

const quotient = Num.divInt(10, 3);
const negative = Num.divInt(10, -3 as const);

assert.strictEqual(negative, -4);
assert.strictEqual(quotient, 3);
