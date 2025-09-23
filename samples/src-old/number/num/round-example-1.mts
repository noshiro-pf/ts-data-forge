// Example: src/number/num.mts (round)
import { Num } from 'ts-data-forge';

const roundTo2 = Num.round(2);
const piRounded = roundTo2(3.141_59);
const eRounded = roundTo2(2.718_28);

assert.strictEqual(eRounded, 2.72);
assert.strictEqual(piRounded, 3.14);
assert.strictEqual(typeof roundTo2, 'function');
