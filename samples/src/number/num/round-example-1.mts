// Example: src/number/num.mts (round)
import { Num } from 'ts-data-forge';

const roundTo2 = Num.round(2);
const piRounded = roundTo2(3.141_59);
const eRounded = roundTo2(2.718_28);

const summary = {
  eRounded,
  piRounded,
  roundTo2,
};

// embed-sample-code-ignore-below
export { summary };
