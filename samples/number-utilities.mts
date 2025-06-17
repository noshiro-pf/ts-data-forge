import { Num } from 'ts-data-forge';

// Basic conversions
console.log(Num.from('123')); // 123
console.log(Num.from('abc')); // NaN

// Range checking
const inRange = Num.isInRange(0, 10);
console.log(inRange(5)); // true
console.log(inRange(0)); // true (inclusive lower bound)
console.log(inRange(10)); // false (exclusive upper bound)

// Clamping values
const clamp = Num.clamp(0, 100);
console.log(clamp(150)); // 100
console.log(clamp(-10)); // 0

// Rounding utilities
const round2 = Num.round(2);
console.log(round2(3.14159)); // 3.14

console.log(Num.roundAt(3.14159, 3)); // 3.142
console.log(Num.roundToInt(3.7)); // 4

// Type guards
const value = 5; // example value
if (Num.isNonZero(value)) {
  // value is guaranteed to be non-zero
  const result = Num.div(10, value); // Safe division
  console.log(result); // 2
}
