// Sample code extracted from src/number/num.mts (round)
import { Num } from 'ts-data-forge';

const roundTo2 = Num.round(2);
roundTo2(3.14159); // 3.14
roundTo2(2.71828); // 2.72
