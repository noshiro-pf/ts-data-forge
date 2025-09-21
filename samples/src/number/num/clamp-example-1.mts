// Sample code extracted from src/number/num.mts (clamp)
import { Num } from 'ts-data-forge';

// Direct usage
Num.clamp(15, 0, 10); // 10 (clamped to upper bound)
Num.clamp(5, 0, 10); // 5 (within bounds)

// Curried usage
const clampToPercent = Num.clamp(0, 100);
clampToPercent(150); // 100
