// Example: src/number/refined-number-utils.mts (operatorsForFloat)
import { TsDataForgeInternals } from 'ts-data-forge';

// embed-sample-code-ignore-above
const floatOps = TsDataForgeInternals.RefinedNumberUtils.operatorsForFloat<
  PositiveFiniteNumber,
  number,
  number
>({
  nonZero: true,
  MIN_VALUE: Number.MIN_VALUE,
  MAX_VALUE: Number.MAX_VALUE,
  typeNameInMessage: 'PositiveFiniteNumber',
} as const);

const fortyTwo = floatOps.castType(42.5);
const seven = floatOps.castType(7.5);
const sum = floatOps.add(fortyTwo, seven);
const ratio = floatOps.div(sum, floatOps.castType(10));
const clamped = floatOps.clamp(0);
const boundedRandom = floatOps.random(
  floatOps.castType(10),
  floatOps.castType(20),
);
const nonZeroRandom = floatOps.randomNonZero();

assert(sum === 50);
assert(ratio === 5);
assert.ok(clamped >= Number.MIN_VALUE);
assert.ok(boundedRandom >= 10 && boundedRandom <= 20);
assert.ok(nonZeroRandom > 0);
