// Example: src/number/num.mts (clamp)
import { Num } from 'ts-data-forge';

const direct = Num.clamp(15, 0, 10);
const clampToPercent = Num.clamp(0, 100);
const clampedPercent = clampToPercent(150);

const summary = {
  clampToPercent,
  clampedPercent,
  direct,
};

// embed-sample-code-ignore-below
export { summary };
