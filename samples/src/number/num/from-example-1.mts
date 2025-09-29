// Example: src/number/num.mts (from)
import { Num } from 'ts-data-forge';

const parsed = Num.from('123.45');
const invalid = Num.from('abc');

const withinRange = Num.isInRange(0, 100);
const isScoreValid = withinRange(76);

const clamped = Num.clamp(150, 0, 100);
const clampToPercent = Num.clamp(0, 100);
const clampedPercent = clampToPercent(150);

const summary = {
  clamped,
  clampedPercent,
  clampToPercent,
  invalid,
  isScoreValid,
  parsed,
};

// embed-sample-code-ignore-below
export { summary };
