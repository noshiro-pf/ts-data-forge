// Example: src/number/branded-types/uint.mts (Uint.random)
import { Uint, asUint } from 'ts-data-forge';

const min = asUint(0);
const max = asUint(3);
const randomValue = Uint.random(min, max);

assert.strictEqual(Uint.is(randomValue), true);
assert.ok(randomValue >= 0 && randomValue <= 3);
