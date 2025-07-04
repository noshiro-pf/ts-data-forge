import { Result } from './result.mjs';
import { Optional } from './optional.mjs';
import { pipe } from './pipe.mjs';

describe('Result JSDoc examples', () => {
  test('Result.unwrapThrow example', () => {
    // Basic usage with default string conversion
    const success = Result.ok(42);
    console.log(Result.unwrapThrow(success)); // 42

    const failure = Result.err("Network error");
    try {
      Result.unwrapThrow(failure); // throws Error: "Network error"
    } catch (error) {
      console.log(error.message); // "Network error"
    }

    // Custom error string conversion
    interface ApiError {
      code: number;
      message: string;
    }

    const apiResult = Result.err<any, ApiError>({ code: 404, message: "Not found" });
    try {
      Result.unwrapThrow(apiResult, err => `API Error ${err.code}: ${err.message}`);
    } catch (error) {
      console.log(error.message); // "API Error 404: Not found"
    }
  });

  test('Result.unwrapOkOr example', () => {
    // Regular usage
    const result = Result.ok(42);
    const value = Result.unwrapOkOr(result, 0);
    console.log(value); // 42

    // Curried usage for pipe composition
    const unwrapWithDefault = Result.unwrapOkOr(0);
    const value2 = pipe(Result.err("error")).map(unwrapWithDefault).value;
    console.log(value2); // 0
  });

  test('Result.unwrapErrThrow example', () => {
    // Basic usage - extracting error from known failure
    const failure = Result.err("Network timeout");
    console.log(Result.unwrapErrThrow(failure)); // "Network timeout"

    // Throws when Result is unexpectedly Ok
    const success = Result.ok(42);
    try {
      Result.unwrapErrThrow(success); // throws Error: "Expected Err but got Ok: 42"
    } catch (error) {
      console.log(error.message); // "Expected Err but got Ok: 42"
    }

    // Custom success value string conversion
    interface User { name: string; id: number; }
    const userResult = Result.ok<User, any>({ name: "John", id: 123 });
    try {
      Result.unwrapErrThrow(userResult, user => `User(${user.name}:${user.id})`);
    } catch (error) {
      console.log(error.message); // "Expected Err but got Ok: User(John:123)"
    }
  });

  test('Result.unwrapErr example', () => {
    // Basic error extraction
    const failure = Result.err("Connection failed");
    console.log(Result.unwrapErr(failure)); // "Connection failed"

    const success = Result.ok(42);
    console.log(Result.unwrapErr(success)); // undefined
  });

  test('Result.unwrapErrOr example', () => {
    // Regular usage
    const result = Result.err("failed");
    const error = Result.unwrapErrOr(result, "default");
    console.log(error); // "failed"

    // Curried usage for pipe composition
    const unwrapErrorWithDefault = Result.unwrapErrOr("unknown error");
    const error2 = pipe(Result.ok(42)).map(unwrapErrorWithDefault).value;
    console.log(error2); // "unknown error"
  });

  test('Result.mapErr example', () => {
    // Regular usage
    const result = Result.err("error");
    const mapped = Result.mapErr(result, e => e.toUpperCase());
    console.log(Result.unwrapErr(mapped)); // "ERROR"

    // Curried usage for pipe composition
    const errorUppercase = Result.mapErr((e: string) => e.toUpperCase());
    const result2 = pipe(Result.err("error")).map(errorUppercase).value;
    console.log(Result.unwrapErr(result2)); // "ERROR"
  });

  test('Result.fold example', () => {
    // Regular usage
    const result = Result.ok(42);
    const folded = Result.fold(result, x => x * 2, () => 0);
    console.log(Result.unwrapOk(folded)); // 84

    // Curried usage for pipe composition
    const folder = Result.fold((x: number) => x * 2, () => 0);
    const result2 = pipe(Result.ok(42)).map(folder).value;
    console.log(Result.unwrapOk(result2)); // 84
  });

  test('Result.flatMap example', () => {
    // Regular usage
    const divide = (a: number, b: number): Result<number, string> =>
      b === 0 ? Result.err("Division by zero") : Result.ok(a / b);

    const result = Result.flatMap(Result.ok(10), x => divide(x, 2));
    console.log(Result.unwrapOk(result)); // 5

    // Curried usage for pipe composition
    const divideBy2 = Result.flatMap((x: number) => divide(x, 2));
    const result2 = pipe(Result.ok(10)).map(divideBy2).value;
    console.log(Result.unwrapOk(result2)); // 5
  });

  test('Result.expectToBe example', () => {
    // Regular usage
    const result = Result.ok(42);
    const value = Result.expectToBe(result, "Operation must succeed");
    console.log(value); // 42

    // Curried usage for pipe composition
    const mustBeOk = Result.expectToBe("Operation must succeed");
    const value2 = pipe(Result.ok(42)).map(mustBeOk).value;
    console.log(value2); // 42
  });

  test('Result.fromThrowable example', () => {
    const parseJson = <T>(text: string): Result<T, Error> =>
      Result.fromThrowable(() => JSON.parse(text) as T);

    const validJson = parseJson<{valid: boolean}>('{"valid": true}');
    if (Result.isOk(validJson)) {
      console.log(validJson.value.valid); // true
    }

    const invalidJson = parseJson('{invalid json}');
    if (Result.isErr(invalidJson)) {
      console.log(invalidJson.value.message); // SyntaxError message
    }

    // Using with custom validation
    const parsePositiveNumber = (str: string): Result<number, Error> =>
      Result.fromThrowable(() => {
        const num = Number(str);
        if (Number.isNaN(num)) throw new Error(`Not a number: ${str}`);
        if (num <= 0) throw new Error(`Must be positive: ${num}`);
        return num;
      });

    const success = parsePositiveNumber('42');
    console.log(Result.unwrapOkOr(success, 0)); // 42

    const failure = parsePositiveNumber('abc');
    console.log(Result.unwrapOkOr(failure, 0)); // 0
  });

  test('Result.toOptional example', () => {
    const okResult = Result.ok(42);
    const optional = Result.toOptional(okResult);
    console.log(Optional.isSome(optional)); // true
    console.log(Optional.unwrap(optional)); // 42

    const errResult = Result.err("Network error");
    const none = Result.toOptional(errResult);
    console.log(Optional.isNone(none)); // true
  });

  test('Result.orElse example', () => {
    // Regular usage
    const primary = Result.err("error");
    const fallback = Result.ok("default");
    const result = Result.orElse(primary, fallback);
    console.log(Result.unwrapOk(result)); // "default"

    // Curried usage for pipe composition
    const fallbackTo = Result.orElse(Result.ok("fallback"));
    const result2 = pipe(Result.err("error")).map(fallbackTo).value;
    console.log(Result.unwrapOk(result2)); // "fallback"
  });
});