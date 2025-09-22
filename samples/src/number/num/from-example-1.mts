// Sample code extracted from src/number/num.mts (from)
import { Num } from 'ts-data-forge';

// Type conversion
const num = Num.from('123.45'); // 123.45
const invalid = Num.from('abc'); // NaN

// Type guards
const value = 5;
if (Num.isPositive(value)) {
  // value is typed as PositiveNumber & 5
}

// Range checking
const isValid = Num.isInRange(0, 100)(50); // true

// Clamping
const clamped = Num.clamp(150, 0, 100); // 100
const clampFn = Num.clamp(0, 100);
const result = clampFn(150); // 100

export { clampFn, clamped, invalid, isValid, num, result, value };
