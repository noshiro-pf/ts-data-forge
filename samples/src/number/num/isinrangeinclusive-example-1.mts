// Sample code extracted from src/number/num.mts (isInRangeInclusive)
import { Num } from 'ts-data-forge';

const inRange = Num.isInRangeInclusive(1, 10);
console.log(inRange(1)); // true (lower bound)
console.log(inRange(5)); // true
console.log(inRange(10)); // true (upper bound)
console.log(inRange(11)); // false
