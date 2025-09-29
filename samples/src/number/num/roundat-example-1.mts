// Example: src/number/num.mts (roundAt)
import { Num } from 'ts-data-forge';

const piRounded = Num.roundAt(3.14159, 2);
const eRounded = Num.roundAt(2.71828, 3);

const summary = {
  eRounded,
  piRounded,
};

// embed-sample-code-ignore-below
export { summary };
