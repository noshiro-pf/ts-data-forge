import { Optional } from '../index.mjs';

describe('some', () => {
  test('JSDoc example', () => {
    const someValue = Optional.some(42);
    assert(Optional.isSome(someValue) === true);
    assert(Optional.unwrap(someValue) === 42);
  });
});

describe('none', () => {
  test('JSDoc example', () => {
    const emptyValue = Optional.none;
    assert(Optional.isNone(emptyValue) === true);
    assert(Optional.unwrapOr(emptyValue, 'default') === 'default');
  });
});

describe('unwrapThrow', () => {
  test('JSDoc example', () => {
    const userInput = Optional.some(42);
    assert(Optional.unwrapThrow(userInput) === 42);

    const empty = Optional.none;
    try {
      Optional.unwrapThrow(empty); // throws Error
      assert(false); // should not reach here
    } catch (error) {
      assert(
        (error as Error).message ===
          '`unwrapThrow()` has failed because it is `None`',
      );
    }
  });
});

describe('unwrap', () => {
  test('JSDoc example', () => {
    const some = Optional.some(42);
    const value = Optional.unwrap(some);
    assert(value === 42);

    const none = Optional.none;
    const result = Optional.unwrap(none);
    assert(result === undefined);
  });
});

describe('unwrapOr', () => {
  test('JSDoc example', () => {
    // Direct usage - most common pattern
    const some = Optional.some(42);
    const value1 = Optional.unwrapOr(some, 0);
    assert(value1 === 42);

    const none = Optional.none;
    const value2 = Optional.unwrapOr(none, 0);
    assert(value2 === 0);

    // Curried usage
    const unwrapWithDefault = Optional.unwrapOr('default');
    const result = unwrapWithDefault(Optional.some('hello'));
    assert(result === 'hello');
  });
});

describe('orElse', () => {
  test('JSDoc example', () => {
    const primary = Optional.none;
    const fallback = Optional.some('default');
    const result = Optional.orElse(primary, fallback);
    assert(Optional.unwrap(result) === 'default');
  });
});

describe('map', () => {
  test('JSDoc example', () => {
    const someNumber = Optional.some(5);
    const mapped = Optional.map(someNumber, (x) => x * 2);
    assert(Optional.unwrap(mapped) === 10);

    const noneValue = Optional.none;
    const mappedNone = Optional.map(noneValue, (x) => x * 2);
    assert(Optional.isNone(mappedNone) === true);
  });
});

describe('flatMap', () => {
  test('JSDoc example', () => {
    const parseNumber = (s: string): Optional<number> => {
      const n = Number(s);
      return isNaN(n) ? Optional.none : Optional.some(n);
    };

    const result = Optional.flatMap(Optional.some('42'), parseNumber);
    assert(Optional.unwrap(result) === 42);
  });
});

describe('filter', () => {
  test('JSDoc example', () => {
    const someEven = Optional.some(4);
    const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
    assert(Optional.unwrap(filtered) === 4);
  });
});

describe('expectToBe', () => {
  test('JSDoc example', () => {
    const some = Optional.some(42);
    const value = Optional.expectToBe(some, 'Value must exist');
    assert(value === 42);
  });
});

describe('zip', () => {
  test('JSDoc example', () => {
    const a = Optional.some(1);
    const b = Optional.some('hello');
    const zipped = Optional.zip(a, b);
    assert.deepStrictEqual(Optional.unwrap(zipped), [1, 'hello']);

    const withNone = Optional.zip(a, Optional.none);
    assert(Optional.isNone(withNone) === true);
  });
});

describe('fromNullable', () => {
  test('JSDoc example', () => {
    const value: string | null = 'hello';
    const optional = Optional.fromNullable(value);
    assert(Optional.unwrap(optional) === 'hello');

    const nullValue: string | null = null;
    const noneOptional = Optional.fromNullable(nullValue);
    assert(Optional.isNone(noneOptional) === true);
  });
});

describe('toNullable', () => {
  test('JSDoc example', () => {
    const some = Optional.some(42);
    assert(Optional.toNullable(some) === 42);

    const none = Optional.none;
    assert(Optional.toNullable(none) === undefined);
  });
});
