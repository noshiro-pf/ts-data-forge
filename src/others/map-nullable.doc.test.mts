import { mapNullable } from './map-nullable.mjs';

describe('mapNullable', () => {
  test('Basic usage with nullable values', () => {
    // Safe string transformation
    mapNullable('hello', (s) => s.toUpperCase()); // "HELLO"
    mapNullable(null, (s) => s.toUpperCase()); // undefined
    mapNullable(undefined, (s) => s.toUpperCase()); // undefined

    // Number operations
    mapNullable(5, (n) => n * 2); // 10
    mapNullable(0, (n) => n * 2); // 0 (note: 0 is not null/undefined)
    mapNullable(null as number | null, (n) => n * 2); // undefined
  });

  test('Working with optional object properties', () => {
    type User = Readonly<{
      id: number;
      name?: string;
      email?: string;
    }>;

    function formatUserDisplay(user: Readonly<User>): string {
      const displayName =
        mapNullable(user.name, (name) => name.toUpperCase()) ?? 'Anonymous';
      const emailDomain = mapNullable(
        user.email,
        (email) => email.split('@')[1],
      );

      return `${displayName} ${emailDomain !== undefined ? `(${emailDomain})` : ''}`;
    }

    const result1 = formatUserDisplay({
      id: 1,
      name: 'John',
      email: 'john@example.com',
    }); // "JOHN (example.com)"
    const result2 = formatUserDisplay({ id: 2 }); // "Anonymous "
    assert(result1 === 'JOHN (example.com)');
    assert(result2 === 'Anonymous ');
  });

  test('Curried usage for functional composition', () => {
    // Create reusable transformers
    const toUpperCase = mapNullable((s: string) => s.toUpperCase());
    const addPrefix = mapNullable((s: string) => `PREFIX_${s}`);

    // Use in different contexts
    const result1 = toUpperCase('hello'); // "HELLO"
    const result2 = toUpperCase(null); // undefined
    assert(result1 === 'HELLO');
    assert(result2 === undefined);

    // Compose transformations
    const processString = (s: string | null): string | undefined => {
      const upper = toUpperCase(s);
      return addPrefix(upper);
    };

    const result3 = processString('test'); // "PREFIX_TEST"
    const result4 = processString(null); // undefined
    assert(result3 === 'PREFIX_TEST');
    assert(result4 === undefined);
  });

  test('Chaining nullable operations', () => {
    // API response handling
    type ApiResponse = DeepReadonly<{
      data?: {
        user?: {
          profile?: {
            displayName?: string;
          };
        };
      };
    }>;

    function getDisplayName(
      response: Readonly<ApiResponse>,
    ): string | undefined {
      return mapNullable(response.data?.user?.profile?.displayName, (name) =>
        name.trim().toUpperCase(),
      );
    }

    // Chain multiple transformations
    function processNullableChain(value: string | null): string | undefined {
      const step1 = mapNullable(value, (v) => v.trim());
      const step2 = mapNullable(step1, (v) => (v.length > 0 ? v : null));
      const step3 = mapNullable(step2, (v) => v.toUpperCase());
      return step3;
    }

    const response: ApiResponse = {
      data: { user: { profile: { displayName: '  test  ' } } },
    };
    const result = getDisplayName(response);
    assert(result === 'TEST');

    const chainResult = processNullableChain('  hello  ');
    assert(chainResult === 'HELLO');
  });

  test('Integration with array methods', () => {
    const nullableNumbers: (number | null | undefined)[] = [
      1,
      null,
      3,
      undefined,
      5,
    ];

    // Transform and filter in one step
    const doubled = nullableNumbers
      .map((n) => mapNullable(n, (x) => x * 2))
      .filter((n): n is number => n !== undefined);
    // Result: [2, 6, 10]
    assert(doubled.length === 3);
    assert(doubled[0] === 2);

    // Process optional array elements
    const users: DeepReadonly<{ name?: string }[]> = [
      { name: 'Alice' },
      { name: undefined },
      { name: 'Bob' },
    ];

    const upperNames = users
      .map((u) => mapNullable(u.name, (n) => n.toUpperCase()))
      .filter((n): n is string => n !== undefined);
    // Result: ['ALICE', 'BOB']
    assert(upperNames.length === 2);
    assert(upperNames[0] === 'ALICE');
  });

  test('Error handling patterns', () => {
    // Safe JSON parsing
    function parseJsonSafe<T>(json: string | null): T | undefined {
      return (
        mapNullable(json, (j) => {
          try {
            return JSON.parse(j) as T;
          } catch {
            return null;
          }
        }) ?? undefined
      );
    }

    // Safe property access with computation
    function calculateAge(birthYear: number | null): string | undefined {
      return (
        mapNullable(birthYear, (year) => {
          const age = new Date().getFullYear() - year;
          return age >= 0 ? `${age} years old` : null;
        }) ?? undefined
      );
    }

    // Test the functions
    const validJson = parseJsonSafe<{ id: number }>('{"id": 42}');
    const invalidJson = parseJsonSafe<{ id: number }>('invalid');
    const nullJson = parseJsonSafe<{ id: number }>(null);
    assert(validJson?.id === 42);
    assert(invalidJson === undefined);
    assert(nullJson === undefined);

    const currentYear = new Date().getFullYear();
    const ageResult = calculateAge(currentYear - 25);
    const invalidAge = calculateAge(null);
    assert(ageResult === '25 years old');
    assert(invalidAge === undefined);
  });
});
