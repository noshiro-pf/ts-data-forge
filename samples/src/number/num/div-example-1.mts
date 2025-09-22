// Sample code extracted from src/number/num.mts (div)
import { Num } from 'ts-data-forge';

const result = Num.div(10, 2); // 5
// Num.div(10, 0); // ❌ TypeScript error: Type '0' is not assignable

// With type guards
const divisor: number = getDivisor();
if (Num.isNonZero(divisor)) {
  const result = Num.div(100, divisor); // ✅ Safe
}

// With branded types
const nonZero = asNonZeroNumber(5);
const result3 = Num.div(20, nonZero); // 4

export { divisor, nonZero, result, result3 };
