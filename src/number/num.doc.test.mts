import { expectType } from '../index.mjs';

describe('from', () => {
  test('JSDoc example 1', () => {
    // Type conversion
    const num = Num.from('123.45');
    assert(num === 123.45);
    const invalid = Num.from('abc');
    assert(isNaN(invalid));

    // Type guards
    const value = 5;
    if (Num.isPositive(value)) {
      expectType<typeof value, PositiveNumber & 5>('=');
    }

    // Range checking
    const isValid = Num.isInRange(0, 100)(50);
    assert(isValid === true);

    // Clamping
    const clamped = Num.clamp(150, 0, 100);
    assert(clamped === 100);
    const clampFn = Num.clamp(0, 100);
    const result = clampFn(150);
    assert(result === 100);
  });

  test('JSDoc example 2', () => {
    assert(Num.from('123.45') === 123.45);
    assert(isNaN(Num.from('hello')));
  });
});

describe('isNonZero', () => {
  test('JSDoc example', () => {
    const value = 5;
    if (Num.isNonZero(value)) {
      expectType<typeof value, NonZeroNumber & 5>('=');
      const result = 10 / value; // Safe division
      assert(result === 2);
    }

    // Works with numeric literals
    const literal = 0 as 0 | 1 | 2;
    if (Num.isNonZero(literal)) {
      expectType<typeof literal, 1 | 2>('=');
    }

    assert(Num.isNonZero(5) === true);
    assert(Num.isNonZero(0) === false);
  });
});

describe('isNonNegative', () => {
  test('JSDoc example', () => {
    const value = 10;
    if (Num.isNonNegative(value)) {
      expectType<typeof value, NonNegativeNumber & 10>('=');
      const arr = new Array(value); // Safe array creation
      assert(arr.length === 10);
    }

    // Type narrowing with unions
    const index = -1 as -1 | 0 | 1;
    if (Num.isNonNegative(index)) {
      expectType<typeof index, 0 | 1>('=');
    }

    assert(Num.isNonNegative(10) === true);
    assert(Num.isNonNegative(0) === true);
    assert(Num.isNonNegative(-5) === false);
  });
});

describe('isPositive', () => {
  test('JSDoc example', () => {
    const count = 5;
    const total = 25;
    if (Num.isPositive(count)) {
      expectType<typeof count, PositiveNumber & 5>('=');
      const average = total / count; // Safe division
      assert(average === 5);
    }

    // Type narrowing with numeric literals
    const testValue = 0 as -1 | 0 | 1 | 2;
    if (Num.isPositive(testValue)) {
      expectType<typeof testValue, 1 | 2>('=');
    }

    assert(Num.isPositive(5) === true);
    assert(Num.isPositive(0) === false);
    assert(Num.isPositive(-3) === false);
  });
});

describe('isInRange', () => {
  test('JSDoc example', () => {
    const isInRange0to10 = Num.isInRange(0, 10);
    assert(isInRange0to10(5) === true);
    assert(isInRange0to10(0) === true); // inclusive lower bound
    assert(isInRange0to10(10) === false); // exclusive upper bound
    assert(isInRange0to10(-1) === false);
  });
});

describe('isInRangeInclusive', () => {
  test('JSDoc example', () => {
    const inRange = Num.isInRangeInclusive(1, 10);
    console.log(inRange(1)); // true (lower bound)
    console.log(inRange(5)); // true
    console.log(inRange(10)); // true (upper bound)
    console.log(inRange(11)); // false
  });
});

describe('isUintInRange', () => {
  test('JSDoc example', () => {
    // Custom range validation
    const isValidPercentage = Num.isUintInRange(0, 101);
    const percentValue = 85;
    if (isValidPercentage(percentValue)) {
      // percentValue is typed as 0 | 1 | ... | 100
      assert(percentValue >= 0 && percentValue <= 100);
    }
  });
});

describe('isUintInRangeInclusive', () => {
  test('JSDoc example', () => {
    const isValidScore = Num.isUintInRangeInclusive(0, 100);
    const score: number = 85;
    if (isValidScore(score)) {
      // score is typed as 0 | 1 | 2 | ... | 100
      assert(score >= 0 && score <= 100);
    }
  });
});

describe('clamp', () => {
  test('JSDoc example', () => {
    // Direct usage
    Num.clamp(15, 0, 10); // 10 (clamped to upper bound)
    Num.clamp(5, 0, 10); // 5 (within bounds)

    // Curried usage
    const clampToPercent = Num.clamp(0, 100);
    clampToPercent(150); // 100
  });
});

describe('div', () => {
  test('JSDoc example', () => {
    const result = Num.div(10, 2); // 5
    // Num.div(10, 0); // ❌ TypeScript error: Type '0' is not assignable

    // With type guards
    const divisor: number = 5;
    if (Num.isNonZero(divisor)) {
      const result = Num.div(100, divisor); // ✅ Safe
      assert(result === 20);
    }

    // With branded types
    const nonZero = 5 as NonZeroNumber;
    const result3 = Num.div(20, nonZero); // 4
    assert(result3 === 4);
  });
});

describe('divInt', () => {
  test('JSDoc example', () => {
    Num.divInt(10, 3); // 3
    Num.divInt(10, -3); // -4 (floor division)
  });
});

describe('roundAt', () => {
  test('JSDoc example', () => {
    Num.roundAt(3.14159, 2); // 3.14
    Num.roundAt(10.5, 0); // 11
  });
});

describe('roundToInt', () => {
  test('JSDoc example', () => {
    Num.roundToInt(3.2); // 3
    Num.roundToInt(3.5); // 4
  });
});

describe('round', () => {
  test('JSDoc example', () => {
    const roundTo2 = Num.round(2);
    roundTo2(3.14159); // 3.14
    roundTo2(2.71828); // 2.72
  });
});

describe('mapNaN2Undefined', () => {
  test('JSDoc example', () => {
    Num.mapNaN2Undefined(42); // 42
    Num.mapNaN2Undefined(NaN); // undefined
  });
});

describe('increment', () => {
  test('JSDoc example', () => {
    const zero = 0 as 0;
    const one = Num.increment(zero); // type is 1, value is 1
  });
});

describe('decrement', () => {
  test('JSDoc example', () => {
    const three = 3 as 3;
    const two = Num.decrement(three); // type is 2, value is 2
  });
});
