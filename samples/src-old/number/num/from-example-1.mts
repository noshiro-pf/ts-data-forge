// Example: src/number/num.mts (from)
import { Num } from 'ts-data-forge';

const parsed = Num.from('123.45');
const invalid = Num.from('abc');

const withinRange = Num.isInRange(0, 100);
const isScoreValid = withinRange(76);

const clamped = Num.clamp(150, 0, 100);
const clampToPercent = Num.clamp(0, 100);
const clampedPercent = clampToPercent(150);

assert.strictEqual(clamped, 100);
assert.strictEqual(clampedPercent, 100);
assert.strictEqual(typeof clampToPercent, 'function');
assert.ok(Number.isNaN(invalid));
assert.strictEqual(isScoreValid, true);
assert.strictEqual(parsed, 123.45);
