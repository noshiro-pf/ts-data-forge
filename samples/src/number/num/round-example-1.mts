// Example: src/number/num.mts (round)
import { Num } from 'ts-data-forge';

const roundTo2 = Num.round(2);
const piRounded = roundTo2(3.14159);
const eRounded = roundTo2(2.71828);

const summary = {
  eRounded,
  piRounded,
  roundTo2,
};

// embed-sample-code-ignore-below
export { summary };
