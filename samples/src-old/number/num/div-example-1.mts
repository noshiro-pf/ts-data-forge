// Example: src/number/num.mts (div)
import { Num } from 'ts-data-forge';

const basic = Num.div(10, 2);
const divisor: number = 5;
const guarded = Num.isNonZero(divisor) ? Num.div(100, divisor) : undefined;

assert.strictEqual(basic, 5);
assert.strictEqual(guarded, 20);
