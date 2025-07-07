import { Result } from '../index.mjs';
import { memoizeFunction } from './memoize-function.mjs';

describe('memoizeFunction', () => {
  test('Basic memoization for expensive calculations', () => {
    // Fibonacci calculation (exponential time complexity)
    const fibonacci = (n: number): number => {
      console.log(`Computing fib(${n})`);
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    const memoizedFib = memoizeFunction(
      fibonacci,
      (n) => n, // Number itself as key
    );

    const result1 = memoizedFib(40); // Much faster than unmemoized version
    const result2 = memoizedFib(40); // Returns instantly from cache
    assert(result1 === result2);
  });

  test('Multi-argument functions with composite keys', () => {
    // Grid calculation with x,y coordinates
    const calculateGridValue = (
      x: number,
      y: number,
      scale: number,
    ): number => {
      console.log(`Computing grid(${x},${y},${scale})`);
      // Expensive computation...
      return Math.sin(x * scale) * Math.cos(y * scale);
    };

    const memoizedGrid = memoizeFunction(
      calculateGridValue,
      (x, y, scale) => `${x},${y},${scale}`, // String concatenation for composite key
    );

    // Alternative: Using bit manipulation for integer coordinates
    const memoizedGrid2 = memoizeFunction(
      calculateGridValue,
      (x, y, scale) => (x << 20) | (y << 10) | scale, // Assuming small positive integers
    );

    const result = memoizedGrid(1, 2, 0.5);
    const result2 = memoizedGrid2(1, 2, 1);
    assert(typeof result === 'number');
    assert(typeof result2 === 'number');
  });

  test('Object arguments with selective memoization', () => {
    type User = Readonly<{
      id: number;
      name: string;
      email: string;
      metadata?: UnknownRecord;
    }>;

    type ProcessedData = Readonly<{ processed: boolean }>;

    const fetchUserPermissions = (user: User): Promise<readonly string[]> => {
      console.log(`Fetching permissions for user ${user.id}`);
      // Mock implementation
      return Promise.resolve(['read', 'write']);
    };

    // Memoize based only on user ID, ignoring other fields
    const memoizedFetchPermissions = memoizeFunction(
      fetchUserPermissions,
      (user) => user.id, // Only cache by ID
    );

    // For multiple identifying fields
    const processUserData = (user: User, orgId: number): ProcessedData => {
      // Complex processing...
      return { processed: true };
    };

    const memoizedProcess = memoizeFunction(
      processUserData,
      (user, orgId) => `${user.id}:${orgId}`, // Composite key with separator
    );

    const user: User = { id: 1, name: 'John', email: 'john@example.com' };
    const permissions = memoizedFetchPermissions(user);
    const processed = memoizedProcess(user, 123);
    assert(processed.processed === true);
  });

  test('Memoizing recursive functions', () => {
    // Recursive path finding
    const findPaths = (
      start: string,
      end: string,
      visited: ReadonlySet<string> = new Set(),
    ): string[][] => {
      if (start === end) return [[end]];
      // ... complex recursive logic
      return [[start, end]];
    };

    // Use sorted, serialized visited set for consistent keys
    const memoizedFindPaths = memoizeFunction(
      findPaths,
      (start, end, visited = new Set()) =>
        `${start}->${end}:[${[...visited].sort().join(',')}]`,
    );

    const paths = memoizedFindPaths('A', 'B');
    assert(paths.length > 0);
  });

  test('Cache key strategies', () => {
    // Mock function for examples
    const mockFn = (x: unknown): string => String(x);

    // 1. Simple primitive argument
    const memoized1 = memoizeFunction(mockFn, (x: number) => x);

    // 2. Multiple arguments with separator
    const mockFn2 = (a: string, b: number): string => `${a}-${b}`;
    const memoized2 = memoizeFunction(
      mockFn2,
      (a: string, b: number) => `${a}|${b}`,
    );

    // 3. Object with specific fields
    const mockFn3 = (obj: {
      readonly id: number;
      readonly version: number;
    }): string => `${obj.id}:${obj.version}`;
    const memoized3 = memoizeFunction(
      mockFn3,
      (obj: Readonly<{ id: number; version: number }>) =>
        `${obj.id}:v${obj.version}`,
    );

    // 4. Array argument with JSON serialization
    const mockFn4 = (arr: readonly number[]): string => arr.join(',');
    const memoized4 = memoizeFunction(mockFn4, (arr: readonly number[]) =>
      JSON.stringify(arr),
    );

    // 5. Boolean flags as bit field
    const mockFn5 = (a: boolean, b: boolean, c: boolean): number =>
      (a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0);
    const memoized5 = memoizeFunction(
      mockFn5,
      (a: boolean, b: boolean, c: boolean) =>
        (a ? 4 : 0) | (b ? 2 : 0) | (c ? 1 : 0),
    );

    const result1 = memoized1(42);
    const result2 = memoized2('test', 123);
    assert(typeof result1 === 'string');
    assert(typeof result2 === 'string');
  });

  test('Memory-conscious memoization with weak references', () => {
    // For object keys, consider using WeakMap externally
    const cache = new WeakMap<UnknownRecord, Result<unknown, unknown>>();

    function memoizeWithWeakMap<T extends UnknownRecord, R>(
      fn: (obj: T) => R,
    ): (obj: T) => R {
      return (obj: T): R => {
        if (cache.has(obj)) {
          const cached = cache.get(obj);
          if (cached !== undefined) {
            return cached as R;
          }
        }
        const result = fn(obj);
        cache.set(obj, result as Result<unknown, unknown>);
        return result;
      };
    }

    const testFn = (obj: { readonly value: number }): number => obj.value * 2;
    const memoized = memoizeWithWeakMap(testFn);
    const result = memoized({ value: 5 });
    assert(result === 10);
  });

  test('Anti-patterns to avoid', () => {
    // ❌ Bad: Memoizing impure functions
    const memoizedRandom = memoizeFunction(
      () => Math.random(),
      () => 'key', // Always returns cached random value!
    );

    // ❌ Bad: Memoizing functions with side effects
    const memoizedLog = memoizeFunction(
      (msg: string): string => {
        console.log(msg);
        return msg;
      },
      (msg) => msg, // Logs only on first call!
    );

    // ❌ Bad: Non-unique cache keys
    type User = Readonly<{ id: number; name: string }>;
    const processUser = (user: Readonly<User>): string =>
      `Processed: ${user.name}`;
    const memoizedProcess = memoizeFunction(
      processUser,
      (user) => user.name, // Multiple users can have same name!
    );

    // Test anti-patterns (to show they exist, even though they're bad)
    const firstRandom = memoizedRandom();
    const secondRandom = memoizedRandom();
    assert(firstRandom === secondRandom); // Shows the problem with memoizing impure functions

    const logResult1 = memoizedLog('test message');
    const logResult2 = memoizedLog('test message');
    assert(logResult1 === 'test message');
    assert(logResult2 === 'test message');

    // Test the problematic memoization (same name, different users)
    const user1: User = { id: 1, name: 'John' };
    const user2: User = { id: 2, name: 'John' };
    const result1 = memoizedProcess(user1);
    const result2 = memoizedProcess(user2); // Returns cached result from user1!
    assert(result1 === result2); // Shows the cache collision problem
  });
});
