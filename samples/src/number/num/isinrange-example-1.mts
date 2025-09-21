// Sample code extracted from src/number/num.mts (isInRange)
import { Num } from 'ts-data-forge';

const isInRange0to10 = Num.isInRange(0, 10);
isInRange0to10(5); // true
isInRange0to10(0); // true (inclusive lower bound)
isInRange0to10(10); // false (exclusive upper bound)
isInRange0to10(-1); // false
