import { Optional, Result } from '../index.mjs';

describe('ok', () => {
  test('JSDoc example', () => {
    // Basic success case
    const success = Result.ok(42);
    assert(Result.isOk(success) === true);
    assert(Result.unwrapOk(success) === 42);

    // Function that returns a Result
    function divide(a: number, b: number): Result<number, string> {
      if (b === 0) {
        return Result.err('Division by zero');
      }
      return Result.ok(a / b);
    }

    const result = divide(10, 2);
    assert(Result.unwrapOk(result) === 5);
  });
});

describe('err', () => {
  test('JSDoc example', () => {
    // Basic error case
    const failure = Result.err('Something went wrong');
    assert(Result.isErr(failure) === true);
    assert(Result.unwrapErr(failure) === 'Something went wrong');

    // Function that can fail
    function parseInteger(input: string): Result<number, string> {
      const num = parseInt(input, 10);
      if (isNaN(num)) {
        return Result.err(`Invalid number format: ${input}`);
      }
      return Result.ok(num);
    }

    const result = parseInteger('abc');
    assert(Result.unwrapErr(result) === 'Invalid number format: abc');

    // Using custom error types
    interface ValidationError {
      field: string;
      message: string;
    }

    const validationError = Result.err<ValidationError>({
      field: 'email',
      message: 'Invalid email format',
    });
    assert(Result.isErr(validationError) === true);
  });
});

describe('isOk', () => {
  test('JSDoc example', () => {
    // Basic type guard usage
    function divide(a: number, b: number): Result<number, string> {
      if (b === 0) return Result.err('Division by zero');
      return Result.ok(a / b);
    }
    const result: Result<number, string> = divide(10, 2);

    if (Result.isOk(result)) {
      // TypeScript knows result is Result.Ok<number>
      assert(result.value === 5); // Safe to access .value
      assert(Result.unwrapOk(result) === 5);
    } else {
      // TypeScript knows result is Result.Err<string>
      assert(false); // Should not reach here
    }

    // Filtering arrays of Results
    const results: Result<number, string>[] = [
      Result.ok(1),
      Result.err('error'),
      Result.ok(2),
    ];
    const successes = results.filter(Result.isOk);
    assert(successes.length === 2);
    assert(successes[0]?.value === 1);
    assert(successes[1]?.value === 2);
  });
});

describe('isErr', () => {
  test('JSDoc example', () => {
    // Basic type guard usage
    function divide(a: number, b: number): Result<number, string> {
      if (b === 0) return Result.err('Division by zero');
      return Result.ok(a / b);
    }
    const result: Result<number, string> = divide(10, 0);

    if (Result.isErr(result)) {
      // TypeScript knows result is Result.Err<string>
      assert(result.value === 'Division by zero'); // Safe to access error .value
      assert(Result.unwrapErr(result) === 'Division by zero');
    } else {
      // TypeScript knows result is Result.Ok<number>
      assert(false); // Should not reach here
    }
  });
});

describe('unwrapThrow', () => {
  test('JSDoc example', () => {
    const success = Result.ok(42);
    assert(Result.unwrapThrow(success) === 42);

    const failure = Result.err('Network error');
    try {
      Result.unwrapThrow(failure); // throws Error: "Network error"
      assert(false); // should not reach here
    } catch (error) {
      assert((error as Error).message === 'Network error');
    }
  });
});

describe('unwrapOk', () => {
  test('JSDoc example', () => {
    // With guaranteed Ok - returns the value
    const success = Result.ok(42);
    const value = Result.unwrapOk(success); // Type: number, Value: 42
    assert(value === 42);

    // Safe pattern for handling both cases
    const result = Result.ok('hello');
    const unwrapped = Result.unwrapOk(result);
    if (unwrapped !== undefined) {
      assert(unwrapped.toUpperCase() === 'HELLO');
    }

    // Useful in conditional chains
    const processResult = (r: Result<number, string>) => {
      const value = Result.unwrapOk(r);
      return value !== undefined ? value * 2 : 0;
    };
    assert(processResult(Result.ok(5)) === 10);
    assert(processResult(Result.err('error')) === 0);
  });
});

describe('unwrapOkOr', () => {
  test('JSDoc example', () => {
    const result = Result.ok(42);
    const value = Result.unwrapOkOr(result, 0);
    assert(value === 42);

    const errorResult = Result.err('error');
    const fallbackValue = Result.unwrapOkOr(errorResult, 0);
    assert(fallbackValue === 0);
  });
});

describe('unwrapErrThrow', () => {
  test('JSDoc example', () => {
    const failure = Result.err('Network timeout');
    assert(Result.unwrapErrThrow(failure) === 'Network timeout');

    const success = Result.ok(42);
    try {
      Result.unwrapErrThrow(success); // throws Error: "Expected Err but got Ok: 42"
      assert(false); // should not reach here
    } catch (error) {
      assert((error as Error).message === 'Expected Err but got Ok: 42');
    }
  });
});

describe('unwrapErr', () => {
  test('JSDoc example', () => {
    const failure = Result.err('Connection failed');
    assert(Result.unwrapErr(failure) === 'Connection failed');

    const success = Result.ok(42);
    assert(Result.unwrapErr(success) === undefined);
  });
});

describe('unwrapErrOr', () => {
  test('JSDoc example', () => {
    const result = Result.err('failed');
    const error = Result.unwrapErrOr(result, 'default');
    assert(error === 'failed');

    const okResult = Result.ok(42);
    const defaultError = Result.unwrapErrOr(okResult, 'default');
    assert(defaultError === 'default');
  });
});

describe('map', () => {
  test('JSDoc example', () => {
    // Regular usage
    const result = Result.ok(5);
    const mapped = Result.map(result, (x) => x * 2);
    assert(Result.unwrapOk(mapped) === 10);

    // Curried version
    const doubler = Result.map((x: number) => x * 2);
    const result2 = doubler(Result.ok(5));
    assert(Result.unwrapOk(result2) === 10);

    // Error case stays error
    const errorResult = Result.err('error');
    const mappedError = Result.map(errorResult, (x) => x * 2);
    assert(Result.isErr(mappedError) === true);
  });
});

describe('mapErr', () => {
  test('JSDoc example', () => {
    const result = Result.err('error');
    const mapped = Result.mapErr(result, (e) => e.toUpperCase());
    assert(Result.unwrapErr(mapped) === 'ERROR');

    // Ok case stays Ok
    const okResult = Result.ok(42);
    const mappedOk = Result.mapErr(okResult, (e: string) => e.toUpperCase());
    assert(Result.isOk(mappedOk) === true);
    assert(Result.unwrapOk(mappedOk) === 42);
  });
});

describe('fold', () => {
  test('JSDoc example', () => {
    const result = Result.ok(42);
    const folded = Result.fold(
      result,
      (x) => x * 2,
      () => 0,
    );
    assert(Result.unwrapOk(folded) === 84);

    const errorResult = Result.err('error');
    const foldedError = Result.fold(
      errorResult,
      (x) => x * 2,
      () => 0,
    );
    assert(Result.unwrapErr(foldedError) === 0);
  });
});

describe('flatMap', () => {
  test('JSDoc example', () => {
    const divide = (a: number, b: number): Result<number, string> =>
      b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

    const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
    assert(Result.unwrapOk(result) === 5);

    const errorResult = Result.flatMap(Result.ok(10), (x) => divide(x, 0));
    assert(Result.unwrapErr(errorResult) === 'Division by zero');
  });
});

describe('expectToBe', () => {
  test('JSDoc example', () => {
    const result = Result.ok(42);
    const value = Result.expectToBe(result, 'Operation must succeed');
    assert(value === 42);

    const errorResult = Result.err('failed');
    try {
      Result.expectToBe(errorResult, 'Operation must succeed');
      assert(false); // should not reach here
    } catch (error) {
      assert((error as Error).message === 'Operation must succeed');
    }
  });
});

describe('fromThrowable', () => {
  test('JSDoc example', () => {
    // Wrapping JSON.parse which can throw
    const parseJson = <T,>(text: string): Result<T, Error> =>
      Result.fromThrowable(() => JSON.parse(text) as T);

    const validJson = parseJson<{ valid: boolean }>('{"valid": true}');
    if (Result.isOk(validJson)) {
      assert(validJson.value.valid === true);
    }

    const invalidJson = parseJson('invalid json');
    assert(Result.isErr(invalidJson) === true);
  });
});

describe('swap', () => {
  test('JSDoc example', () => {
    const okResult = Result.ok(42);
    const swapped = Result.swap(okResult);
    assert(Result.isErr(swapped) === true);
    assert(Result.unwrapErr(swapped) === 42);

    const errResult = Result.err('error');
    const swappedErr = Result.swap(errResult);
    assert(Result.isOk(swappedErr) === true);
    assert(Result.unwrapOk(swappedErr) === 'error');
  });
});

describe('toOptional', () => {
  test('JSDoc example', () => {
    // Basic conversion
    const okResult = Result.ok(42);
    const optional = Result.toOptional(okResult);
    assert(Optional.isSome(optional) === true);
    assert(Optional.unwrap(optional) === 42);

    const errResult = Result.err('Network error');
    const none = Result.toOptional(errResult);
    assert(Optional.isNone(none) === true);
  });
});

describe('orElse', () => {
  test('JSDoc example', () => {
    const primary = Result.err('error');
    const fallback = Result.ok('default');
    const result = Result.orElse(primary, fallback);
    assert(Result.unwrapOk(result) === 'default');

    const okPrimary = Result.ok('success');
    const notUsed = Result.ok('fallback');
    const resultOk = Result.orElse(okPrimary, notUsed);
    assert(Result.unwrapOk(resultOk) === 'success');
  });
});

describe('zip', () => {
  test('JSDoc example', () => {
    const a = Result.ok(1);
    const b = Result.ok('hello');
    const zipped = Result.zip(a, b);
    assert.deepStrictEqual(Result.unwrapOk(zipped), [1, 'hello']);

    const withErr = Result.zip(a, Result.err('error'));
    assert(Result.unwrapErr(withErr) === 'error');
  });
});
