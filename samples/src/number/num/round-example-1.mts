// Example: src/number/num.mts (round)
import { Num } from 'ts-data-forge';

const roundTo2 = Num.round(2);
roundTo2(3.141_59); // 3.14
roundTo2(2.718_28); // 2.72

export { roundTo2 };
