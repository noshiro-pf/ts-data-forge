// Example: src/number/num.mts (roundToInt)
import { Num } from 'ts-data-forge';

const three = Num.roundToInt(3.2);
const four = Num.roundToInt(3.5);

const summary = {
  four,
  three,
};

// embed-sample-code-ignore-below
export { summary };
