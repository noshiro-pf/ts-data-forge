import { expectType } from '../index.mjs';
import {
  isBigint,
  isBoolean,
  isNonNullish,
  isNotBigint,
  isNotBoolean,
  isNotNull,
  isNotNumber,
  isNotString,
  isNotSymbol,
  isNotUndefined,
  isNull,
  isNullish,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
} from './is-type.mjs';

describe('isUndefined', () => {
  test('JSDoc example', () => {
    const value = undefined as string | undefined;

    if (isUndefined(value)) {
      expectType<typeof value, undefined>('=');
      assert(value === undefined);
    } else {
      expectType<typeof value, string>('=');
      assert(value.length > 0);
    }

    const definedValue: string | undefined = 'hello';
    assert(!isUndefined(definedValue));
    assert(isUndefined(undefined));
  });
});

describe('isNotUndefined', () => {
  test('JSDoc example', () => {
    const items: readonly (string | undefined)[] = [
      'a',
      undefined,
      'b',
      undefined,
      'c',
    ];

    const definedItems = items.filter(isNotUndefined);
    expectType<typeof definedItems, string[]>('=');
    assert(definedItems.length === 3);
    assert(definedItems.every((item) => typeof item === 'string'));

    definedItems.forEach((item) => {
      expectType<typeof item, string>('=');
      assert(item.toUpperCase().length > 0);
    });
  });
});

describe('isBoolean', () => {
  test('JSDoc example', () => {
    const userInput: unknown = true;

    if (isBoolean(userInput)) {
      expectType<typeof userInput, boolean>('=');
      assert(typeof userInput === 'boolean');
    }

    assert(isBoolean(true));
    assert(isBoolean(false));
    assert(!isBoolean('true'));
    assert(!isBoolean(1));
  });
});

describe('isNotBoolean', () => {
  test('JSDoc example', () => {
    type MixedValue = string | number | boolean;
    const value = 'hello' as MixedValue;

    if (isNotBoolean(value)) {
      expectType<typeof value, string | number>('=');
      assert(typeof value === 'string' || typeof value === 'number');
    }

    assert(isNotBoolean('hello'));
    assert(isNotBoolean(42));
    assert(!isNotBoolean(true));
  });
});

describe('isNumber', () => {
  test('JSDoc example', () => {
    const userInput: unknown = 42;

    if (isNumber(userInput)) {
      expectType<typeof userInput, number>('=');
      assert(userInput.toFixed(2) === '42.00');

      // Note: this includes NaN and Infinity
      if (Number.isFinite(userInput)) {
        assert(userInput === 42);
      }
    }

    assert(isNumber(42));
    assert(isNumber(Number.NaN));
    assert(isNumber(Number.POSITIVE_INFINITY));
    assert(!isNumber('42'));
  });
});

describe('isNotNumber', () => {
  test('JSDoc example', () => {
    type Value = string | number | boolean;
    const values: readonly Value[] = ['hello', 42, true, 3.14, false];

    const nonNumbers = values.filter(isNotNumber);
    expectType<typeof nonNumbers, (string | boolean)[]>('=');
    assert(nonNumbers.length === 3);
    assert(nonNumbers.every((val) => typeof val !== 'number'));
  });
});

describe('isBigint', () => {
  test('JSDoc example', () => {
    const userInput: unknown = 123n;

    if (isBigint(userInput)) {
      expectType<typeof userInput, bigint>('=');
      assert(userInput.toString() === '123');
      const doubled = userInput * 2n; // Safe bigint operations
      assert(doubled === 246n);
    }

    assert(isBigint(123n));
    assert(!isBigint(123));
    assert(!isBigint('123'));
  });
});

describe('isNotBigint', () => {
  test('JSDoc example', () => {
    type NumericValue = number | bigint;
    const value: NumericValue = 42;

    if (isNotBigint(value)) {
      expectType<typeof value, number>('=');
      assert(value.toFixed(2) === '42.00');
    }

    assert(isNotBigint(42));
    assert(!isNotBigint(42n));
  });
});

describe('isString', () => {
  test('JSDoc example', () => {
    const userInput: unknown = 'hello';

    if (isString(userInput)) {
      expectType<typeof userInput, string>('=');
      assert(userInput.length === 5);
      assert(userInput.toUpperCase() === 'HELLO');

      // You can further check for non-empty strings
      if (userInput.length > 0) {
        assert(userInput === 'hello');
      }
    }

    assert(isString('hello'));
    assert(isString(''));
    assert(!isString(123));
  });
});

describe('isNotString', () => {
  test('JSDoc example', () => {
    type Value = string | number | boolean;
    const mixedValues: readonly Value[] = ['hello', 42, true, 'world', 3.14];

    const nonStrings = mixedValues.filter(isNotString);
    expectType<typeof nonStrings, (number | boolean)[]>('=');
    assert(nonStrings.length === 3);
    assert(nonStrings.every((val) => typeof val !== 'string'));
  });
});

describe('isSymbol', () => {
  test('JSDoc example', () => {
    const userInput: unknown = Symbol('test');

    if (isSymbol(userInput)) {
      expectType<typeof userInput, symbol>('=');
      assert(userInput.description === 'test');
      assert(userInput.toString() === 'Symbol(test)');
    }

    assert(isSymbol(Symbol()));
    assert(isSymbol(Symbol('key')));
    assert(!isSymbol('string'));
    assert(!isSymbol(42));
  });
});

describe('isNotSymbol', () => {
  test('JSDoc example', () => {
    type PropertyKey = string | number | symbol;
    const key = 'name' as PropertyKey;

    if (isNotSymbol(key)) {
      expectType<typeof key, string | number>('=');
      assert(typeof key === 'string' || typeof key === 'number');
    }

    assert(isNotSymbol('key'));
    assert(isNotSymbol(42));
    assert(!isNotSymbol(Symbol('test')));
  });
});

describe('isNull', () => {
  test('JSDoc example', () => {
    const value = null as string | null;

    if (isNull(value)) {
      expectType<typeof value, null>('=');
      assert(value === null);
    } else {
      expectType<typeof value, string>('=');
      assert(value.length >= 0);
    }

    const stringValue: string | null = 'hello';
    if (isNull(stringValue)) {
      assert(false); // should not reach here
    } else {
      expectType<typeof stringValue, string>('=');
      assert(stringValue.length === 5);
    }

    assert(isNull(null));
    assert(!isNull(undefined));
    assert(!isNull('string'));
  });
});

describe('isNotNull', () => {
  test('JSDoc example', () => {
    const items: readonly (string | null)[] = ['a', null, 'b', null, 'c'];

    const nonNullItems = items.filter(isNotNull);
    expectType<typeof nonNullItems, string[]>('=');
    assert(nonNullItems.length === 3);
    assert(nonNullItems.every((item) => typeof item === 'string'));

    nonNullItems.forEach((item) => {
      expectType<typeof item, string>('=');
      assert(item.toUpperCase().length > 0);
    });
  });
});

describe('isNullish', () => {
  test('JSDoc example', () => {
    const value = null as string | null | undefined;

    if (isNullish(value)) {
      expectType<typeof value, null | undefined>('=');
      assert(value === null || value === undefined);
    } else {
      expectType<typeof value, string>('=');
      assert(value.length >= 0);
    }

    const undefinedValue: string | null | undefined = undefined;
    assert(isNullish(undefinedValue));
    assert(isNullish(null));
    assert(!isNullish('hello'));
  });
});

describe('isNonNullish', () => {
  test('JSDoc example 1', () => {
    const items: readonly (string | null | undefined)[] = [
      'hello',
      null,
      'world',
      undefined,
      'test',
    ];

    const definedItems = items.filter(isNonNullish);
    expectType<typeof definedItems, string[]>('=');
    assert(definedItems.length === 3);
    assert(definedItems.every((item) => typeof item === 'string'));

    definedItems.forEach((item) => {
      expectType<typeof item, string>('=');
      assert(item.toUpperCase().length > 0);
    });
  });

  test('JSDoc example 2', () => {
    // Progressive validation with optional chaining alternative
    type User = DeepReadonly<{
      profile?: {
        name?: string;
        email?: string;
      };
    }>;

    const user: User = { profile: { name: 'John', email: 'john@example.com' } };

    // Instead of optional chaining: user.profile?.name
    if (isNonNullish(user.profile) && isNonNullish(user.profile.name)) {
      expectType<typeof user.profile.name, string>('=');
      assert(user.profile.name.toUpperCase() === 'JOHN');
    }

    assert(isNonNullish('hello'));
    assert(isNonNullish(42));
    assert(!isNonNullish(null));
    assert(!isNonNullish(undefined));
  });
});
