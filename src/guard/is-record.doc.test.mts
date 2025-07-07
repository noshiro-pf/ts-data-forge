import { Arr, expectType } from '../index.mjs';
import { isRecord } from './is-record.mjs';

describe('isRecord', () => {
  test('Basic usage with different value types:', () => {
    assert(isRecord({}) === true); // empty object
    assert(isRecord({ name: 'John' }) === true); // object literal
    assert(isRecord(Object.create(null)) === true); // object created with Object.create
    assert(isRecord(new Object()) === true); // object constructor

    assert(isRecord([]) === false); // array
    assert(isRecord([1, 2, 3]) === false); // array with elements
    assert(isRecord(null) === false); // null
    assert(isRecord(undefined) === false); // undefined
    assert(isRecord('string') === false); // primitive
    assert(isRecord(42) === false); // primitive
    assert(isRecord(() => {}) === false); // function
    assert(isRecord(new Date()) === true); // Date object - is an object but not a plain record
    assert(isRecord(/regex/) === true); // RegExp object - is an object but not a plain record
  });

  test('Type guard usage for safe property access:', () => {
    const obj = { id: 'user123', name: 'John' };

    if (isRecord(obj)) {
      // obj is now typed as UnknownRecord
      expectType<typeof obj, UnknownRecord>('=');
      assert(Object.keys(obj).length === 2);
    }

    assert(isRecord({ a: 1, b: 2 }) === true);
    assert(isRecord([1, 2, 3]) === false);
  });

  test('Filtering mixed arrays to find plain objects:', () => {
    const mixedData: unknown[] = [
      { type: 'user', name: 'Alice' },
      [1, 2, 3],
      'string',
      { type: 'admin', permissions: ['read', 'write'] },
      new Date(),
      null,
      { id: 123 },
    ];

    const records = mixedData.filter(isRecord);
    expectType<typeof records, UnknownRecord[]>('=');
    assert(records.length === 4); // Objects: user, admin, Date, and id objects

    // Verify the records are valid
    assert(
      records.every((record) => typeof record === 'object' && record !== null),
    );
  });

  test('Progressive validation of nested structures:', () => {
    const userData: unknown = {
      id: 'user123',
      profile: {
        name: 'John',
        email: 'john@example.com',
      },
    };

    // First check if it's a record
    if (isRecord(userData)) {
      expectType<typeof userData, UnknownRecord>('=');
      assert('id' in userData);
      assert('profile' in userData);

      // Check nested structure
      if (isRecord(userData.profile)) {
        expectType<typeof userData.profile, UnknownRecord>('=');
        assert('name' in userData.profile);
        assert('email' in userData.profile);
      }
    }

    // Test with invalid data
    const invalidData: unknown = [1, 2, 3];
    assert(isRecord(invalidData) === false);
  });

  test('Object transformation and mapping:', () => {
    function transformRecords(
      data: readonly unknown[],
    ): Record<string, unknown>[] {
      return data
        .filter(isRecord) // Keep only plain objects
        .map((record) => {
          // Transform each record
          const transformed: Record<string, unknown> = {};

          for (const [key, value] of Object.entries(record)) {
            // Apply some transformation logic
            transformed[key.toLowerCase()] = value;
          }

          return transformed;
        });
    }

    const testData = [{ Name: 'John', AGE: 30 }, 'string', { TYPE: 'user' }];
    const result = transformRecords(testData);
    assert(Arr.isArrayOfLength(result, 2));
    assert(result[0]['name'] === 'John');
    assert(result[0]['age'] === 30);
  });
});
