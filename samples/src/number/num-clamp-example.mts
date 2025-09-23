// Example: src/number/num.mts (Num.clamp)
import { Num } from 'ts-data-forge';

assert.strictEqual(Num.clamp(150, 0, 100), 100);
assert.strictEqual(Num.clamp(-50, 0, 100), 0);

const clampToPercentage = Num.clamp(0, 100);

assert.strictEqual(clampToPercentage(75), 75);
assert.strictEqual(clampToPercentage(150), 100);
