// Example: src/number/num.mts (increment)
import { Num } from 'ts-data-forge';

const zero = 0;
const one = Num.increment(zero); // type is 1, value is 1

export { one, zero };
