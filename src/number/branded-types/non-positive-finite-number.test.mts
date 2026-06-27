import { expectType } from '../../expect-type.mjs';
import { range } from '../../iterator/index.mjs';
import {
  asNonPositiveFiniteNumber,
  isNonPositiveFiniteNumber,
  NonPositiveFiniteNumber,
} from './non-positive-finite-number.mjs';

describe('NonPositiveFiniteNumber test', () => {
  describe('asNonPositiveFiniteNumber', () => {
    test('accepts valid non-positive finite numbers', () => {
      expect(() => asNonPositiveFiniteNumber(0)).not.toThrow();

      expect(() => asNonPositiveFiniteNumber(-1)).not.toThrow();

      expect(() => asNonPositiveFiniteNumber(-3.14)).not.toThrow();

      expect(() => asNonPositiveFiniteNumber(-0.5)).not.toThrow();

      expect(() => asNonPositiveFiniteNumber(Number.MIN_VALUE * -1)).not.toThrow();

      expect(() => asNonPositiveFiniteNumber(Number.MAX_VALUE * -1)).not.toThrow();
    });

    test('rejects positive numbers', () => {
      expect(() => asNonPositiveFiniteNumber(1)).toThrow(TypeError);

      expect(() => asNonPositiveFiniteNumber(0.1)).toThrow(TypeError);

      expect(() => asNonPositiveFiniteNumber(Number.MAX_VALUE)).toThrow(
        TypeError,
      );
    });

    test('rejects non-finite numbers', () => {
      expect(() => asNonPositiveFiniteNumber(Number.NaN)).toThrow(TypeError);

      expect(() => asNonPositiveFiniteNumber(Number.POSITIVE_INFINITY)).toThrow(
        TypeError,
      );

      expect(() => asNonPositiveFiniteNumber(Number.NEGATIVE_INFINITY)).toThrow(
        TypeError,
      );
    });

    test('returns the same value for valid inputs', () => {
      expect(asNonPositiveFiniteNumber(0)).toBe(0);

      expect(asNonPositiveFiniteNumber(-5.5)).toBe(-5.5);

      expect(asNonPositiveFiniteNumber(-1000)).toBe(-1000);
    });
  });

  describe('isNonPositiveFiniteNumber', () => {
    test('correctly identifies non-positive finite numbers', () => {
      assert.isTrue(isNonPositiveFiniteNumber(0));

      assert.isTrue(isNonPositiveFiniteNumber(-1));

      assert.isTrue(isNonPositiveFiniteNumber(-3.14));

      assert.isTrue(isNonPositiveFiniteNumber(-0.5));

      assert.isTrue(isNonPositiveFiniteNumber(Number.MIN_VALUE * -1));
    });

    test('correctly rejects positive numbers', () => {
      assert.isFalse(isNonPositiveFiniteNumber(1));

      assert.isFalse(isNonPositiveFiniteNumber(0.1));

      assert.isFalse(isNonPositiveFiniteNumber(Number.MAX_VALUE));
    });

    test('correctly rejects non-finite numbers', () => {
      assert.isFalse(isNonPositiveFiniteNumber(Number.NaN));

      assert.isFalse(isNonPositiveFiniteNumber(Number.POSITIVE_INFINITY));

      assert.isFalse(isNonPositiveFiniteNumber(Number.NEGATIVE_INFINITY));
    });
  });

  describe('NonPositiveFiniteNumber.is', () => {
    test('works as a type guard', () => {
      const value: number = -42.5;

      if (NonPositiveFiniteNumber.is(value)) {
        expectType<
          typeof value,
          typeof value & NonPositiveFiniteNumber
        >('=');
      }
    });
  });

  describe('NonPositiveFiniteNumber.MAX_VALUE', () => {
    test('is 0', () => {
      expect(NonPositiveFiniteNumber.MAX_VALUE).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.min', () => {
    test('returns the smaller value', () => {
      expect(
        NonPositiveFiniteNumber.min(
          -5.5 as NonPositiveFiniteNumber,
          -10.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(-10.5);

      expect(
        NonPositiveFiniteNumber.min(
          0 as NonPositiveFiniteNumber,
          -1.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(-1.5);
    });

    test('clamps to range when necessary', () => {
      expect(
        NonPositiveFiniteNumber.min(
          -5 as NonPositiveFiniteNumber,
          10 as NonPositiveFiniteNumber,
        ),
      ).toBe(-5);

      expect(
        NonPositiveFiniteNumber.min(
          5 as NonPositiveFiniteNumber,
          10 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.max', () => {
    test('returns the larger value', () => {
      expect(
        NonPositiveFiniteNumber.max(
          -5.5 as NonPositiveFiniteNumber,
          -10.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(-5.5);

      expect(
        NonPositiveFiniteNumber.max(
          -1.5 as NonPositiveFiniteNumber,
          0 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });

    test('clamps to range when necessary', () => {
      expect(
        NonPositiveFiniteNumber.max(
          -5.5 as NonPositiveFiniteNumber,
          -10.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(-5.5);

      expect(
        NonPositiveFiniteNumber.max(
          -5 as NonPositiveFiniteNumber,
          10 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.clamp', () => {
    test('returns the same value if within range', () => {
      expect(NonPositiveFiniteNumber.clamp(-5.5)).toBe(-5.5);

      expect(NonPositiveFiniteNumber.clamp(0)).toBe(0);

      expect(NonPositiveFiniteNumber.clamp(-1000.5)).toBe(-1000.5);
    });

    test('clamps positive values to MAX_VALUE (0)', () => {
      expect(NonPositiveFiniteNumber.clamp(5.5)).toBe(0);

      expect(NonPositiveFiniteNumber.clamp(1000)).toBe(0);
    });

    test('clamps infinity to range', () => {
      expect(
        NonPositiveFiniteNumber.clamp(Number.POSITIVE_INFINITY),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.floor', () => {
    test('rounds down non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.floor(-5.9 as NonPositiveFiniteNumber),
      ).toBe(-6);

      expect(
        NonPositiveFiniteNumber.floor(-0.1 as NonPositiveFiniteNumber),
      ).toBe(-1);

      expect(
        NonPositiveFiniteNumber.floor(0 as NonPositiveFiniteNumber),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.ceil', () => {
    test('rounds up non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.ceil(-5.1 as NonPositiveFiniteNumber),
      ).toBe(-5);

      expect(
        NonPositiveFiniteNumber.ceil(-0.9 as NonPositiveFiniteNumber),
      ).toBe(0);

      expect(
        NonPositiveFiniteNumber.ceil(0 as NonPositiveFiniteNumber),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.round', () => {
    test('rounds non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.round(-5.5 as NonPositiveFiniteNumber),
      ).toBe(-6);

      expect(
        NonPositiveFiniteNumber.round(-0.4 as NonPositiveFiniteNumber),
      ).toBe(0);

      expect(
        NonPositiveFiniteNumber.round(-0.5 as NonPositiveFiniteNumber),
      ).toBe(-1);
    });
  });

  describe('NonPositiveFiniteNumber.add', () => {
    test('adds two non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.add(
          -5.5 as NonPositiveFiniteNumber,
          -3.2 as NonPositiveFiniteNumber,
        ),
      ).toBeCloseTo(-8.7, 5);

      expect(
        NonPositiveFiniteNumber.add(
          0 as NonPositiveFiniteNumber,
          -10.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(-10.5);
    });

    test('clamps result to MAX_VALUE (0) when sum is positive', () => {
      expect(
        NonPositiveFiniteNumber.add(
          -5.5 as NonPositiveFiniteNumber,
          10 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);

      expect(
        NonPositiveFiniteNumber.add(
          0 as NonPositiveFiniteNumber,
          0 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.sub', () => {
    test('subtracts two non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.sub(
          -10.5 as NonPositiveFiniteNumber,
          -3.2 as NonPositiveFiniteNumber,
        ),
      ).toBeCloseTo(-7.3, 5);

      expect(
        NonPositiveFiniteNumber.sub(
          0 as NonPositiveFiniteNumber,
          -5.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });

    test('clamps result to MAX_VALUE (0) when result is positive', () => {
      expect(
        NonPositiveFiniteNumber.sub(
          -5.5 as NonPositiveFiniteNumber,
          10 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.mul', () => {
    test('multiplies two non-positive finite numbers', () => {
      expect(
        NonPositiveFiniteNumber.mul(
          -5.5 as NonPositiveFiniteNumber,
          -3.2 as NonPositiveFiniteNumber,
        ),
      ).toBeCloseTo(-17.6, 5);

      expect(
        NonPositiveFiniteNumber.mul(
          -5.5 as NonPositiveFiniteNumber,
          0 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);

      expect(
        NonPositiveFiniteNumber.mul(
          0 as NonPositiveFiniteNumber,
          -5.5 as NonPositiveFiniteNumber,
        ),
      ).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.div', () => {
    test('divides non-positive dividend by non-zero divisor', () => {
      expect(asNonPositiveFiniteNumber(-10.5 / -2.1)).toBeCloseTo(-5, 5);

      expect(asNonPositiveFiniteNumber(-10.5 / -2)).toBeCloseTo(-5.25, 5);

      expect(asNonPositiveFiniteNumber(0 / -5.5)).toBe(0);
    });
  });

  describe('NonPositiveFiniteNumber.pow', () => {
    test('raises to power', () => {
      expect(
        NonPositiveFiniteNumber.pow(
          -2 as NonPositiveFiniteNumber,
          -1 as NonPositiveFiniteNumber,
        ),
      ).toBeDefined();
    });
  });

  describe('NonPositiveFiniteNumber.random', () => {
    test('generates values within range', () => {
      for (const _ of range(100)) {
        const value = NonPositiveFiniteNumber.random();

        assert.isTrue(isNonPositiveFiniteNumber(value));
      }
    });
  });
});
