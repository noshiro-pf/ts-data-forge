// Sample code extracted from src/number/num.mts (mapNaN2Undefined)
import { Num } from 'ts-data-forge';

Num.mapNaN2Undefined(42); // 42
Num.mapNaN2Undefined(NaN); // undefined
