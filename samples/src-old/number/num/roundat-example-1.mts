// Example: src/number/num.mts (roundAt)
import { Num } from 'ts-data-forge';

const piRounded = Num.roundAt(3.141_59, 2);
const eRounded = Num.roundAt(2.718_28, 3);

assert.strictEqual(eRounded, 2.718);
assert.strictEqual(piRounded, 3.14);
