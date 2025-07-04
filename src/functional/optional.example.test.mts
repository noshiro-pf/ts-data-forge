import { Optional } from './optional.mjs';

describe('Optional JSDoc examples', () => {
  test('Optional.some example', () => {
    const someValue = Optional.some(42);
    console.log(Optional.isSome(someValue)); // true
    console.log(Optional.unwrap(someValue)); // 42
  });

  test('Optional.none example', () => {
    const emptyValue = Optional.none;
    console.log(Optional.isNone(emptyValue)); // true
    console.log(Optional.unwrapOr(emptyValue, "default")); // "default"
  });

  test('Optional.unwrapThrow example', () => {
    const userInput = Optional.some(42);
    console.log(Optional.unwrapThrow(userInput)); // 42

    const empty = Optional.none;
    try {
      Optional.unwrapThrow(empty); // throws Error
    } catch (error) {
      console.log(error.message); // "`unwrapThrow()` has failed because it is `None`"
    }
  });

  test('Optional.unwrap example', () => {
    const some = Optional.some(42);
    const value = Optional.unwrap(some); // 42

    const none = Optional.none;
    const result = Optional.unwrap(none); // undefined
  });

  test('Optional.unwrapOr example', () => {
    // Direct usage - most common pattern
    const some = Optional.some(42);
    const value1 = Optional.unwrapOr(some, 0);
    console.log(value1); // 42

    const none = Optional.none;
    const value2 = Optional.unwrapOr(none, 0);
    console.log(value2); // 0

    // Curried usage
    const unwrapWithDefault = Optional.unwrapOr("default");
    const result = unwrapWithDefault(Optional.some("hello"));
    console.log(result); // "hello"
  });

  test('Optional.orElse example', () => {
    const primary = Optional.none;
    const fallback = Optional.some("default");
    const result = Optional.orElse(primary, fallback);
    console.log(Optional.unwrap(result)); // "default"
  });

  test('Optional.map example', () => {
    const someNumber = Optional.some(5);
    const mapped = Optional.map(someNumber, x => x * 2);
    console.log(Optional.unwrap(mapped)); // 10

    const noneValue = Optional.none;
    const mappedNone = Optional.map(noneValue, x => x * 2);
    console.log(Optional.isNone(mappedNone)); // true
  });

  test('Optional.flatMap example', () => {
    const parseNumber = (s: string): Optional<number> => {
      const n = Number(s);
      return isNaN(n) ? Optional.none : Optional.some(n);
    };

    const result = Optional.flatMap(Optional.some("42"), parseNumber);
    console.log(Optional.unwrap(result)); // 42
  });

  test('Optional.filter example', () => {
    const someEven = Optional.some(4);
    const filtered = Optional.filter(someEven, x => x % 2 === 0);
    console.log(Optional.unwrap(filtered)); // 4
  });

  test('Optional.expectToBe example', () => {
    const some = Optional.some(42);
    const value = Optional.expectToBe(some, "Value must exist");
    console.log(value); // 42
  });

  test('Optional.fromNullable example', () => {
    const value: string | null = "hello";
    const optional = Optional.fromNullable(value);
    console.log(Optional.unwrap(optional)); // "hello"

    const nullValue: string | null = null;
    const noneOptional = Optional.fromNullable(nullValue);
    console.log(Optional.isNone(noneOptional)); // true
  });

  test('Optional.toNullable example', () => {
    const some = Optional.some(42);
    console.log(Optional.toNullable(some)); // 42

    const none = Optional.none;
    console.log(Optional.toNullable(none)); // undefined
  });
});