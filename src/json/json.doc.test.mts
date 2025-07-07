import { isRecord, Json, Result } from '../index.mjs';

describe('parse', () => {
  test('Basic usage', () => {
    // Parse JSON safely
    const parseResult = Json.parse('{"name": "Alice", "age": 30}');
    assert(Result.isOk(parseResult));
    assert(isRecord(parseResult.value));
    assert(parseResult.value?.['name'] === 'Alice');
    assert(parseResult.value?.['age'] === 30);

    // Stringify with error handling
    const stringifyResult = Json.stringify({ name: 'Bob', age: 25 });
    assert(Result.isOk(stringifyResult));
    assert(Result.unwrapOk(stringifyResult) === '{"name":"Bob","age":25}');
  });

  test('JSDoc example 2', () => {
    const result = Json.parse('{"name": "John", "age": 30}');
    assert(Result.isOk(result));
    assert(isRecord(result.value));
    assert(result.value?.['name'] === 'John');
    assert(result.value?.['age'] === 30);
  });

  test('JSDoc example 3', () => {
    const invalid = Json.parse('invalid json');
    assert(Result.isErr(invalid));
    assert(Result.unwrapErr(invalid)?.includes('JSON') === true);
  });
});

describe('stringify', () => {
  test('JSDoc example 1', () => {
    const obj = { name: 'John', age: 30 };
    const result = Json.stringify(obj);
    if (Result.isOk(result)) {
      console.log(result.value); // '{"name":"John","age":30}'
    }
  });

  test('JSDoc example 2 ', () => {
    // Error handling
    const circular: any = { name: 'test' };
    circular.self = circular;
    const error = Json.stringify(circular);
    if (Result.isErr(error)) {
      console.log('Stringify failed:', error.value);
    }
  });
});

describe('stringifySelected', () => {
  test('JSDoc example', () => {
    const user = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
    };

    const publicFields = Json.stringifySelected(user, ['id', 'name', 'email']);
    if (Result.isOk(publicFields)) {
      console.log(publicFields.value);
      // '{"id":1,"name":"Alice","email":"alice@example.com"}'
    }
  });
});

describe('stringifySortedKey', () => {
  test('JSDoc example', () => {
    const unsortedObj = {
      zebra: 'animal',
      apple: 'fruit',
      banana: 'fruit',
    };

    const sorted = Json.stringifySortedKey(unsortedObj);
    if (Result.isOk(sorted)) {
      console.log(sorted.value);
      // '{"apple":"fruit","banana":"fruit","zebra":"animal"}'
    }
  });
});
