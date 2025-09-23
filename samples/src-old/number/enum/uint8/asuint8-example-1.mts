// Example: src/number/enum/uint8.mts (asUint8)
import { asUint8 } from 'ts-data-forge';

const x = asUint8(255);
assert.strictEqual(x, 255);
const y = asUint8(0);
assert.strictEqual(y, 0);

assert.throws(() => asUint8(-1));
assert.throws(() => asUint8(256));
assert.throws(() => asUint8(1.5));
