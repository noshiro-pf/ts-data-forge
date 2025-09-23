// Example: src/number/num.mts (clamp)
import { Num } from 'ts-data-forge';

const direct = Num.clamp(15, 0, 10);
const clampToPercent = Num.clamp(0, 100);
const clampedPercent = clampToPercent(150);

assert.strictEqual(typeof clampToPercent, 'function');
assert.strictEqual(clampedPercent, 100);
assert.strictEqual(direct, 10);
