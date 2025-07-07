import {
  Arr,
  IMap,
  Optional,
  Result,
  asPositiveUint32,
  asUint32,
  expectType,
  pipe,
} from '../index.mjs';

describe('size', () => {
  test('JSDoc example', () => {
    // Known non-empty arrays get positive branded type
    const tuple = [1, 2, 3] as const;
    const tupleSize = Arr.size(tuple);
    expectType<typeof tupleSize, IntersectBrand<PositiveNumber, SizeType.Arr>>(
      '=',
    );
    assert(tupleSize === 3);

    const nonEmpty: NonEmptyArray<string> = ['a', 'b'];
    const nonEmptySize = Arr.size(nonEmpty);
    expectType<
      typeof nonEmptySize,
      IntersectBrand<PositiveNumber, SizeType.Arr>
    >('=');
    assert(nonEmptySize === 2);

    // General arrays may be empty, get regular branded type
    const generalArray: number[] = [1, 2, 3];
    const generalSize = Arr.size(generalArray);
    expectType<typeof generalSize, SizeType.Arr>('=');
    assert(generalSize === 3);

    // Empty arrays
    const emptyArray = [] as const;
    const emptySize = Arr.size(emptyArray);
    expectType<typeof emptySize, SizeType.Arr>('=');
    assert(emptySize === 0);
  });
});

describe('isArray', () => {
  test('JSDoc example', () => {
    const processValue = (value: string | readonly number[] | null): number => {
      if (Arr.isArray(value)) {
        expectType<typeof value, readonly number[]>('=');
        return value.length;
      }
      return -1;
    };

    assert(Arr.isArray([1, 2, 3]) === true);
    assert(Arr.isArray('hello') === false);
    assert(Arr.isArray(null) === false);
    assert(processValue([1, 2, 3]) === 3);
  });
});

describe('isEmpty', () => {
  test('JSDoc example', () => {
    // Basic emptiness checking
    const emptyArray: number[] = [];
    const nonEmptyArray = [1, 2, 3];

    assert(Arr.isEmpty(emptyArray) === true);
    assert(Arr.isEmpty(nonEmptyArray) === false);

    // Type guard behavior
    const processArray = (arr: readonly number[]) => {
      if (Arr.isEmpty(arr)) {
        expectType<typeof arr, readonly []>('=');
        return 0;
      }
      return arr.length;
    };

    // Early returns
    const sumArray = (numbers: readonly number[]): number => {
      if (Arr.isEmpty(numbers)) {
        return 0; // Handle empty case early
      }
      return numbers.reduce((sum, n) => sum + n, 0);
    };

    assert(processArray([]) === 0);
    assert(processArray([1, 2]) === 2);
    assert(sumArray([]) === 0);
    assert(sumArray([1, 2, 3]) === 6);
  });
});

describe('isNonEmpty', () => {
  test('JSDoc example', () => {
    // Basic non-emptiness checking
    const emptyArray: number[] = [];
    const nonEmptyArray = [1, 2, 3];

    console.log(Arr.isNonEmpty(emptyArray)); // false
    console.log(Arr.isNonEmpty(nonEmptyArray)); // true

    // Type guard behavior enables safe element access
    function getFirstElement(arr: readonly number[]): number | undefined {
      if (Arr.isNonEmpty(arr)) {
        // arr is now typed as NonEmptyArray<number>
        return arr[0]; // Safe - no undefined, TypeScript knows this exists
      }
      return undefined;
    }
    assert(getFirstElement([1, 2, 3]) === 1);
    assert(getFirstElement([]) === undefined);

    // Safe operations on non-empty arrays
    function processData(data: readonly string[]): void {
      if (!Arr.isNonEmpty(data)) return; // early return pattern

      // This is now safe without undefined checks
      const first = data[0];
      assert(typeof first === 'string');

      // Can safely use non-empty array methods
      const lastElement = Arr.last(data);
      assert(lastElement !== undefined);
    }
    processData(['a', 'b', 'c']);

    // Filtering and working with arrays
    const possiblyEmptyArrays: readonly number[][] = [
      [1, 2, 3],
      [],
      [4, 5],
      [],
    ];

    // Get only non-empty arrays with proper typing
    const definitelyNonEmpty = possiblyEmptyArrays.filter(Arr.isNonEmpty);
    // Type: NonEmptyArray<number>[]
    assert(definitelyNonEmpty.length === 2);

    // Now safe to access elements
    const firstElements = definitelyNonEmpty.map((arr) => arr[0]); // [1, 4]
    assert(firstElements.length === 2);
    assert(firstElements[0] === 1);
    assert(firstElements[1] === 4);

    // Early validation
    function calculateAverage(numbers: readonly number[]): number {
      if (!Arr.isNonEmpty(numbers)) {
        throw new Error('Cannot calculate average of empty array');
      }

      // numbers is now NonEmptyArray<number>
      return Arr.sum(numbers) / Arr.size(numbers);
    }
    assert(calculateAverage([1, 2, 3]) === 2);

    // Functional composition
    const arrayGroups = [[1, 2], [], [3, 4, 5], []];

    const nonEmptyGroups = arrayGroups
      .filter(Arr.isNonEmpty) // Filter to NonEmptyArray<number>[]
      .map((group) => group[0]); // Safe access to first element: [1, 3]
    assert(nonEmptyGroups.length === 2);
    assert(nonEmptyGroups[0] === 1);
    assert(nonEmptyGroups[1] === 3);

    // Combined with other array operations
    function processArraySafely<T>(
      arr: readonly T[],
      processor: (item: T) => string,
    ): string {
      if (Arr.isNonEmpty(arr)) {
        return arr.map(processor).join(' -> ');
      }
      return 'No items to process';
    }
    assert(processArraySafely([1, 2, 3], String) === '1 -> 2 -> 3');

    // Type inference examples
    const testArray: readonly number[] = [1, 2, 3];
    const isNonEmptyResult = Arr.isNonEmpty(testArray);
    assert(isNonEmptyResult === true);

    expectType<typeof isNonEmptyResult, true>('=');
    expectType<Parameters<typeof Arr.isNonEmpty>[0], readonly unknown[]>('=');

    // Type narrowing in conditional
    if (Arr.isNonEmpty(testArray)) {
      expectType<typeof testArray, NonEmptyArray<number>>('=');
    }
  });
});

describe('isArrayOfLength', () => {
  test('JSDoc example', () => {
    const arr: readonly number[] = [1, 2, 3];
    if (Arr.isArrayOfLength(arr, 3)) {
      // arr is now typed as readonly [number, number, number]
    }
    Arr.isArrayOfLength([1, 2], 3); // false
  });
});

describe('isArrayAtLeastLength', () => {
  test('JSDoc example', () => {
    const arr: readonly number[] = [1, 2, 3];
    if (Arr.isArrayAtLeastLength(arr, 2)) {
      // arr is now typed as readonly [number, number, ...number[]]
    }
    Arr.isArrayAtLeastLength([1], 2); // false
  });
});

describe('indexIsInRange', () => {
  test('JSDoc example', () => {
    Arr.indexIsInRange([10, 20], 0); // true
    Arr.indexIsInRange([10, 20], 1); // true
    Arr.indexIsInRange([10, 20], 2); // false
    Arr.indexIsInRange([10, 20], -1); // false
    Arr.indexIsInRange([], 0); // false
  });
});

describe('zeros', () => {
  test('JSDoc example', () => {
    // Compile-time known lengths produce precise tuple types
    const exactLength = Arr.zeros(3); // readonly [0, 0, 0]
    const empty = Arr.zeros(0); // readonly []

    // Runtime positive values produce non-empty arrays
    const count = asPositiveUint32(Math.floor(Math.random() * 5) + 1);
    const nonEmpty: NonEmptyArray<0> = Arr.zeros(count);

    // General runtime values may be empty
    const maybeEmpty = Arr.zeros(asUint32(Math.floor(Math.random() * 5))); // readonly 0[]

    // Type inference examples
    expectType<typeof exactLength, readonly [0, 0, 0]>('=');
    expectType<typeof empty, readonly []>('=');
    expectType<typeof nonEmpty, NonEmptyArray<0>>('=');
    expectType<typeof maybeEmpty, readonly 0[]>('=');

    // Runtime assertions
    assert(exactLength.length === 3);
    assert(empty.length === 0);
    assert(nonEmpty.length > 0);
    assert(maybeEmpty.length >= 0);
  });
});

describe('seq', () => {
  test('JSDoc example', () => {
    // Compile-time known lengths produce precise tuple types
    const indices: readonly [0, 1, 2, 3] = Arr.seq(4);
    const empty: readonly [] = Arr.seq(0);
    const single: readonly [0] = Arr.seq(1);

    // Runtime positive values produce non-empty arrays
    const count = asPositiveUint32(Math.floor(Math.random() * 5) + 1);
    const nonEmpty: NonEmptyArray<SizeType.Arr> = Arr.seq(count);

    // General runtime values may be empty
    const maybeEmpty: readonly SizeType.Arr[] = Arr.seq(
      asUint32(Math.floor(Math.random() * 5)),
    );

    // Useful for generating array indices
    const data = ['a', 'b', 'c', 'd'] as const;
    const indexSequence: readonly [0, 1, 2, 3] = Arr.seq(data.length); // [0, 1, 2, 3]
    assert(indexSequence.length === 4);
    assert(indexSequence[0] === 0);
    assert(indexSequence[3] === 3);

    // Type inference examples
    expectType<typeof indices, readonly [0, 1, 2, 3]>('=');
    expectType<typeof empty, readonly []>('=');
    expectType<typeof nonEmpty, NonEmptyArray<SizeType.Arr>>('=');
    expectType<typeof maybeEmpty, readonly SizeType.Arr[]>('=');

    // Runtime assertions
    assert(indices.length === 4);
    assert(empty.length === 0);
    assert(nonEmpty.length > 0);
    assert(maybeEmpty.length >= 0);
    expectType<typeof single, readonly [0]>('=');
    assert(single.length === 1);
    assert(single[0] === 0);
  });
});

describe('create', () => {
  test('JSDoc example', () => {
    // Compile-time known lengths produce precise tuple types
    const strings = Arr.create(3, 'hello'); // readonly ['hello', 'hello', 'hello']
    const numbers = Arr.create(2, 42); // readonly [42, 42]
    const empty = Arr.create(0, 'unused'); // readonly []

    // Object references are shared (shallow copy behavior)
    const obj = { id: 1, name: 'test' };
    const objects = Arr.create(3, obj); // readonly [obj, obj, obj]
    assert(objects[0] === objects[1]); // true - same reference
    objects[0].id = 999; // Mutates the shared object
    assert(objects[1].id === 999); // all positions affected

    // Runtime positive values produce non-empty arrays
    const count = Math.floor(Math.random() * 5) + 1;
    const nonEmpty = Arr.create(count, 'item'); // NonEmptyArray<string>
    assert(nonEmpty.length > 0);

    // Literal type preservation with const assertion
    const literals = Arr.create(2, 'success' as const); // readonly ['success', 'success']
    assert(literals.length === 2);
    assert(literals[0] === 'success');

    // Type inference examples
    expectType<typeof strings, readonly ['hello', 'hello', 'hello']>('=');
    expectType<typeof numbers, readonly [42, 42]>('=');
    expectType<typeof empty, readonly []>('=');
    expectType<typeof nonEmpty, NonEmptyArray<string>>('=');
    expectType<typeof literals, readonly ['success', 'success']>('=');

    // Runtime assertions
    assert(strings.length === 3);
    assert(numbers.length === 2);
    assert(empty.length === 0);
  });
});

describe('generate', () => {
  test('JSDoc example', () => {
    const nums: readonly number[] = Arr.generate<number>(function* () {
      yield 1;
      yield* [2, 3];
    });

    assert.deepStrictEqual(nums, [1, 2, 3]);

    // Type safety - prevents incorrect returns:
    const nums2 = Arr.generate<number>(function* () {
      yield 1;
      const someCondition = Math.random() > 0.5;
      if (someCondition) {
        return; // OK - returning is allowed, but must be void
      }
      yield* [2, 3];
      // return 1; // NG - TypeScript error, cannot return T
    });
    assert(nums2.length >= 1);
  });
});

describe('copy', () => {
  test('JSDoc example', () => {
    // Mutable arrays remain mutable
    const mutableOriginal = [1, 2, 3];
    const mutableCopy = Arr.copy(mutableOriginal); // number[]
    mutableCopy[0] = 999; // OK - still mutable
    mutableOriginal[0]; // 1 - original unchanged

    // Readonly arrays remain readonly
    const readonlyOriginal = [1, 2, 3] as const;
    const readonlyCopy = Arr.copy(readonlyOriginal); // readonly [1, 2, 3]
    // readonlyCopy[0] = 999; // Error - readonly array

    // Tuple types are preserved
    const tupleOriginal: [string, number, boolean] = ['hello', 42, true];
    const tupleCopy = Arr.copy(tupleOriginal); // [string, number, boolean]

    // Shallow copy behavior with objects
    const objectArray = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const objectCopy = Arr.copy(objectArray);
    objectCopy[0].name = 'Charlie'; // Mutates the shared object reference
    console.log(objectArray[0].name); // 'Charlie' - original affected
    objectCopy.push({ id: 3, name: 'Dave' }); // Array structure changes don't affect original
    console.log(objectArray.length); // 2 - original array length unchanged

    // Empty arrays
    const emptyArray: number[] = [];
    const emptyCopy = Arr.copy(emptyArray); // number[]
    const emptyTuple = [] as const;
    const emptyTupleCopy = Arr.copy(emptyTuple); // readonly []

    // Type inference examples
    expectType<typeof mutableCopy, number[]>('=');
    expectType<typeof readonlyCopy, readonly [1, 2, 3]>('=');
    expectType<typeof tupleCopy, [string, number, boolean]>('=');
  });
});

describe('range', () => {
  test('JSDoc example', () => {
    // Compile-time known ranges with step=1 produce precise tuple types
    const range1to4 = Arr.range(1, 5); // readonly [1, 2, 3, 4]
    const range0to2 = Arr.range(0, 3); // readonly [0, 1, 2]
    const emptyRange = Arr.range(5, 5); // readonly []
    const reverseEmpty = Arr.range(5, 1); // readonly [] (invalid with positive step)

    // SmallUint constraint examples (0-255 for precise typing)
    const small = Arr.range(0, 10); // readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const maxSmall = Arr.range(250, 255); // readonly [250, 251, 252, 253, 254]
    const beyondSmall = Arr.range(0, 300); // readonly SafeUint[] (loses precision)

    // Custom step increments
    const evens = Arr.range(0, 10, 2); // readonly SafeUint[] -> [0, 2, 4, 6, 8]
    const odds = Arr.range(1, 10, 2); // readonly SafeUint[] -> [1, 3, 5, 7, 9]
    const countdown = Arr.range(5, 0, -1); // readonly SafeInt[] -> [5, 4, 3, 2, 1]
    const bigStep = Arr.range(0, 20, 5); // readonly SafeUint[] -> [0, 5, 10, 15]

    // Edge cases that return empty arrays
    const singleElement = Arr.range(3, 4); // readonly [3]
    const invalidRange = Arr.range(10, 5, 2); // readonly [] (start > end with positive step)
    const invalidReverse = Arr.range(1, 10, -1); // readonly [] (start < end with negative step)
    const zeroRange = Arr.range(42, 42); // readonly [] (start equals end)

    // Runtime ranges lose precise typing but maintain safety
    const dynamicStart = Math.floor(Math.random() * 10) as SafeInt;
    const dynamicEnd = (dynamicStart + 5) as SafeInt;
    const dynamicRange = Arr.range(dynamicStart, dynamicEnd); // readonly SafeInt[]

    // Negative numbers and mixed signs
    const negativeRange = Arr.range(-5, 5); // readonly SafeInt[] -> [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
    const negativeCountdown = Arr.range(0, -5, -1); // readonly SafeInt[] -> [0, -1, -2, -3, -4]

    // Useful for generating index ranges and iteration
    const indices = Arr.range(0, 10); // readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const reversedIndices = Arr.range(9, -1, -1); // readonly SafeInt[] -> [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    // Functional programming patterns
    const squares = Arr.range(1, 6).map((x) => x * x); // [1, 4, 9, 16, 25]
    const fibonacci = Arr.range(0, 10).reduce((acc, _, i) => {
      if (i <= 1) return [...acc, i];
      return [...acc, acc[i - 1] + acc[i - 2]];
    }, [] as number[]); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

    // Type inference examples showing precise vs general types
    expectType<typeof range1to4, readonly [1, 2, 3, 4]>('='); // Precise tuple
    expectType<typeof emptyRange, readonly []>('='); // Precise empty tuple
    expectType<typeof evens, readonly SafeUint[]>('='); // General positive array
    expectType<typeof countdown, readonly SafeInt[]>('='); // General integer array
    expectType<typeof negativeRange, readonly SafeInt[]>('='); // General integer array
    expectType<typeof small, readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>('='); // Precise tuple
    expectType<typeof beyondSmall, readonly SafeUint[]>('='); // General array (beyond SmallUint)
  });
});

describe('at', () => {
  test('JSDoc example', () => {
    // Direct usage with positive indices
    const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const first = Arr.at(fruits, 0); // Optional.Some('apple')
    const third = Arr.at(fruits, 2); // Optional.Some('cherry')
    const outOfBounds = Arr.at(fruits, 10); // Optional.None

    // Negative indexing (accessing from the end)
    const last = Arr.at(fruits, -1); // Optional.Some('elderberry')
    const secondLast = Arr.at(fruits, -2); // Optional.Some('date')
    const negativeOutOfBounds = Arr.at(fruits, -10); // Optional.None

    // Edge cases
    const emptyResult = Arr.at([], 0); // Optional.None
    const negativeOnEmpty = Arr.at([], -1); // Optional.None
    const singleElement = Arr.at(['only'], 0); // Optional.Some('only')
    const singleNegative = Arr.at(['only'], -1); // Optional.Some('only')

    // Safe access pattern with type-safe unwrapping
    const maybeElement = Arr.at(fruits, 2);
    if (Optional.isSome(maybeElement)) {
      console.log(`Found: ${maybeElement.value}`); // Type-safe access, no undefined
    } else {
      console.log('Index out of bounds');
    }

    // Alternative unwrapping with default
    const elementOrDefault = Optional.unwrapOr(
      Arr.at(fruits, 100),
      'not found',
    );
    console.log(elementOrDefault); // 'not found'

    // Curried usage for functional composition
    const getSecondElement = Arr.at(1);
    const getLastElement = Arr.at(-1);
    const getMiddleElement = Arr.at(2);

    const nestedArrays = [[10, 20, 30, 40], [50, 60], [70]];
    const secondElements = nestedArrays.map(getSecondElement);
    // [Optional.Some(20), Optional.None, Optional.None]

    const lastElements = nestedArrays.map(getLastElement);
    // [Optional.Some(40), Optional.Some(60), Optional.Some(70)]

    // Pipe composition for data processing
    const processArray = (arr: readonly string[]) =>
      pipe(arr)
        .map(getSecondElement)
        .map((opt) => Optional.map(opt, (s) => s.toUpperCase()))
        .map((opt) => Optional.unwrapOr(opt, 'MISSING')).value;

    console.log(processArray(['a', 'b', 'c'])); // 'B'
    console.log(processArray(['x'])); // 'MISSING'

    // Advanced curried usage with transformation pipelines
    const extractAndProcess = pipe([
      ['hello', 'world', 'typescript'],
      ['functional', 'programming'],
      ['type', 'safety', 'matters', 'most'],
    ])
      .map((arr) => arr.map(getSecondElement))
      .map((opts) =>
        opts.map((opt) => Optional.unwrapOr(opt, '[missing]')),
      ).value;
    // [['world'], ['[missing]'], ['safety']]

    // Type inference examples
    expectType<typeof first, Optional<string>>('=');
    expectType<
      typeof getSecondElement,
      <T>(array: readonly T[]) => Optional<T>
    >('=');
    expectType<typeof negativeOutOfBounds, Optional<string>>('=');
  });
});

describe('head', () => {
  test('JSDoc example', () => {
    // Empty array - precise None type
    const emptyResult = Arr.head([]); // Optional.None
    console.log(Optional.isNone(emptyResult)); // true

    // Tuple with known structure - precise Some type
    const tupleResult = Arr.head(['first', 'second', 'third'] as const);
    // Type: Optional.Some<'first'>
    if (Optional.isSome(tupleResult)) {
      console.log(tupleResult.value); // 'first' - TypeScript knows exact type
    }

    // Non-empty array - guaranteed Some type
    const nonEmpty: NonEmptyArray<number> = [
      10, 20, 30,
    ] as NonEmptyArray<number>;
    const guaranteedResult = Arr.head(nonEmpty); // Optional.Some<number>
    // No need to check - always Some for NonEmptyArray

    // General array - may be Some or None
    const generalArray: number[] = [1, 2, 3];
    const maybeResult = Arr.head(generalArray); // Optional<number>
    if (Optional.isSome(maybeResult)) {
      console.log(`First element: ${maybeResult.value}`);
    } else {
      console.log('Array is empty');
    }

    // Working with different types
    const strings = ['hello', 'world'];
    const firstString = Arr.head(strings); // Optional<string>

    const objects = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const firstObject = Arr.head(objects); // Optional<{id: number, name: string}>

    // Functional composition
    const getFirstElements = (arrays: readonly number[][]) =>
      arrays.map(Arr.head).filter(Optional.isSome);

    const nestedArrays = [[1, 2], [3, 4], [], [5]];
    const firstElements = getFirstElements(nestedArrays);
    // [Optional.Some(1), Optional.Some(3), Optional.Some(5)]

    // Type inference examples
    expectType<typeof emptyResult, Optional.None>('=');
    expectType<typeof tupleResult, Optional.Some<'first'>>('=');
    expectType<typeof guaranteedResult, Optional.Some<number>>('=');
    expectType<typeof maybeResult, Optional<number>>('=');
  });
});

describe('last', () => {
  test('JSDoc example', () => {
    // Empty array - precise None type
    const emptyResult = Arr.last([]); // Optional.None
    console.log(Optional.isNone(emptyResult)); // true

    // Tuple with known structure - precise Some type
    const tupleResult = Arr.last(['first', 'middle', 'last'] as const);
    // Type: Optional.Some<'last'>
    if (Optional.isSome(tupleResult)) {
      console.log(tupleResult.value); // 'last' - TypeScript knows exact type
    }

    // Non-empty array - guaranteed Some type
    const nonEmpty: NonEmptyArray<number> = [
      10, 20, 30,
    ] as NonEmptyArray<number>;
    const guaranteedResult = Arr.last(nonEmpty); // Optional.Some<number>
    // No need to check - always Some for NonEmptyArray

    // General array - may be Some or None
    const generalArray: number[] = [1, 2, 3];
    const maybeResult = Arr.last(generalArray); // Optional<number>
    if (Optional.isSome(maybeResult)) {
      console.log(`Last element: ${maybeResult.value}`);
    } else {
      console.log('Array is empty');
    }

    // Working with different types
    const strings = ['hello', 'world', 'example'];
    const lastString = Arr.last(strings); // Optional<string>

    const coordinates = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const lastCoordinate = Arr.last(coordinates); // Optional<{x: number, y: number}>

    // Single element arrays
    const single = [42];
    const singleResult = Arr.last(single); // Optional<number> containing 42

    // Functional composition with arrays of arrays
    const getLastElements = (arrays: readonly string[][]) =>
      arrays.map(Arr.last).filter(Optional.isSome);

    const nestedArrays = [['a', 'b'], ['c'], [], ['d', 'e', 'f']];
    const lastElements = getLastElements(nestedArrays);
    // [Optional.Some('b'), Optional.Some('c'), Optional.Some('f')]

    // Common pattern: get last element or default
    const data = [10, 20, 30];
    const lastOrDefault = Optional.unwrapOr(Arr.last(data), 0); // 30
    const emptyLastOrDefault = Optional.unwrapOr(Arr.last([]), 0); // 0

    // Type inference examples
    expectType<typeof emptyResult, Optional.None>('=');
    expectType<typeof tupleResult, Optional.Some<'last'>>('=');
    expectType<typeof guaranteedResult, Optional.Some<number>>('=');
    expectType<typeof maybeResult, Optional<number>>('=');
  });
});

describe('sliceClamped', () => {
  test('JSDoc example', () => {
    const data = [10, 20, 30, 40, 50];

    // Normal slicing
    const middle = Arr.sliceClamped(data, 1, 4); // [20, 30, 40]
    const beginning = Arr.sliceClamped(data, 0, 2); // [10, 20]
    const end = Arr.sliceClamped(data, 3, 5); // [40, 50]

    // Automatic clamping for out-of-bounds indices
    const clampedStart = Arr.sliceClamped(data, -10, 3); // [10, 20, 30] (start clamped to 0)
    const clampedEnd = Arr.sliceClamped(data, 2, 100); // [30, 40, 50] (end clamped to length)
    const bothClamped = Arr.sliceClamped(data, -5, 100); // [10, 20, 30, 40, 50] (entire array)

    // Invalid ranges become empty arrays
    const emptyReversed = Arr.sliceClamped(data, 4, 1); // [] (start > end after clamping)
    const emptyAtEnd = Arr.sliceClamped(data, 5, 10); // [] (start at end of array)

    // Edge cases
    const emptyArray = Arr.sliceClamped([], 0, 5); // [] (empty input)
    const singleElement = Arr.sliceClamped([42], 0, 1); // [42]
    const fullCopy = Arr.sliceClamped(data, 0, data.length); // [10, 20, 30, 40, 50]

    // Curried usage for functional composition
    const takeFirst3 = Arr.sliceClamped(0, 3);
    const getMiddle2 = Arr.sliceClamped(1, 3);

    const arrays = [
      [1, 2, 3, 4, 5],
      [10, 20],
      [100, 200, 300, 400, 500, 600],
    ];

    const first3Elements = arrays.map(takeFirst3);
    // [[1, 2, 3], [10, 20], [100, 200, 300]]

    const middle2Elements = arrays.map(getMiddle2);
    // [[2, 3], [20], [200, 300]]

    // Pipe composition
    const result = pipe([1, 2, 3, 4, 5, 6]).map(takeFirst3).map(Arr.sum).value; // 6 (sum of [1, 2, 3])

    // Comparison with regular Array.slice (which can throw or behave unexpectedly)
    try {
      // Regular slice with out-of-bounds - works but may be unintuitive
      const regularSlice = data.slice(-10, 100); // [10, 20, 30, 40, 50]
      // sliceClamped provides same safe behavior explicitly
      const clampedSlice = Arr.sliceClamped(data, -10, 100); // [10, 20, 30, 40, 50]
    } catch (error) {
      // sliceClamped never throws
    }
  });
});

describe('tail', () => {
  test('JSDoc example', () => {
    Arr.tail([1, 2, 3] as const); // [2, 3]
    Arr.tail([1] as const); // []
    Arr.tail([]); // []
  });
});

describe('butLast', () => {
  test('JSDoc example', () => {
    Arr.butLast([1, 2, 3] as const); // [1, 2]
    Arr.butLast([1] as const); // []
    Arr.butLast([]); // []
  });
});

describe('take', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]

    // Curried usage for pipe composition
    const takeFirst3 = Arr.take(3);
    const result = pipe([1, 2, 3, 4, 5]).map(takeFirst3).value;
    console.log(result); // [1, 2, 3]
  });
});

describe('takeLast', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]

    // Curried usage for pipe composition
    const takeLast2 = Arr.takeLast(2);
    const result = pipe([1, 2, 3, 4, 5]).map(takeLast2).value;
    console.log(result); // [4, 5]
  });
});

describe('skip', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]

    // Curried usage for pipe composition
    const skipFirst2 = Arr.skip(2);
    const result = pipe([1, 2, 3, 4, 5]).map(skipFirst2).value;
    console.log(result); // [3, 4, 5]
  });
});

describe('skipLast', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]

    // Curried usage for pipe composition
    const skipLast2 = Arr.skipLast(2);
    const result = pipe([1, 2, 3, 4, 5]).map(skipLast2).value;
    console.log(result); // [1, 2, 3]
  });
});

describe('set', () => {
  test('JSDoc example', () => {
    // Basic usage
    const tpl = ['a', 'b', 'c'] as const;
    const updated = Arr.set(tpl, 1, 'B'); // readonly ['a', 'B', 'c']

    // Type changes are reflected
    const mixed = [1, 'hello', true] as const;
    const withNumber = Arr.set(mixed, 1, 42);
    // readonly [1, 42 | 'hello', true]

    // Compile-time index validation
    const short = [1, 2] as const;
    // Arr.set(short, 2, 3); // Error: index 2 is out of bounds

    // Different value types
    const nums = [1, 2, 3] as const;
    const withString = Arr.set(nums, 0, 'first');
    // readonly ['first' | 1, 2, 3]
  });
});

describe('toUpdated', () => {
  test('JSDoc example', () => {
    // Basic usage with same type transformation
    const numbers = [1, 2, 3, 4, 5];
    const doubled = Arr.toUpdated(numbers, 2, (x) => x * 2);
    // readonly number[] -> [1, 2, 6, 4, 5]

    // Type union when updater returns different type
    const mixed = Arr.toUpdated(numbers, 1, (x) => `value: ${x}`);
    // readonly (number | string)[] -> [1, 'value: 2', 3, 4, 5]

    // Complex object updates
    const users = [
      { id: 1, name: 'Alice', active: true },
      { id: 2, name: 'Bob', active: false },
      { id: 3, name: 'Charlie', active: true },
    ];

    const activatedUser = Arr.toUpdated(users, 1, (user) => ({
      ...user,
      active: true,
      lastUpdated: new Date(),
    }));
    // Bob is now active with lastUpdated field

    // Bounds checking behavior
    const safe1 = Arr.toUpdated([1, 2, 3], 10, (x) => x * 2); // [1, 2, 3] (index out of bounds)
    const safe2 = Arr.toUpdated([1, 2, 3], 0, (x) => x * 2); // [2, 2, 3] (valid index)
    const safe3 = Arr.toUpdated([], 0, (x) => x); // [] (empty array, index out of bounds)

    // Functional transformations
    const products = [
      { name: 'laptop', price: 1000 },
      { name: 'mouse', price: 25 },
      { name: 'keyboard', price: 75 },
    ];

    const discounted = Arr.toUpdated(products, 0, (product) => ({
      ...product,
      price: Math.round(product.price * 0.8), // 20% discount
      onSale: true,
    }));
    // First product now has discounted price and onSale flag

    // Curried usage for reusable updates
    const doubleAtIndex2 = Arr.toUpdated(2, (x: number) => x * 2);
    const capitalizeAtIndex0 = Arr.toUpdated(0, (s: string) => s.toUpperCase());
    const markCompleteAtIndex = (index: number) =>
      Arr.toUpdated(index, (task: { done: boolean }) => ({
        ...task,
        done: true,
      }));

    const numberArrays = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const allDoubled = numberArrays.map(doubleAtIndex2);
    // [[1, 2, 6], [4, 5, 12], [7, 8, 18]]

    const words = [
      ['hello', 'world'],
      ['foo', 'bar'],
      ['type', 'script'],
    ];
    const capitalized = words.map(capitalizeAtIndex0);
    // [['HELLO', 'world'], ['FOO', 'bar'], ['TYPE', 'script']]

    // Pipe composition for data processing
    const processArray = (arr: readonly number[]) =>
      pipe(arr)
        .map(Arr.toUpdated(0, (x) => x * 10)) // Scale first element
        .map(Arr.toUpdated(1, (x) => (typeof x === 'number' ? x + 100 : x))) // Add to second if number
        .value;

    console.log(processArray([1, 2, 3])); // [10, 102, 3]

    // Multiple sequential updates
    const pipeline = (data: readonly number[]) =>
      pipe(data)
        .map(Arr.toUpdated(0, (x) => x * 2))
        .map(Arr.toUpdated(1, (x) => (typeof x === 'number' ? x + 10 : x)))
        .map(
          Arr.toUpdated(2, (x) => (typeof x === 'number' ? x.toString() : x)),
        ).value;

    console.log(pipeline([1, 2, 3])); // [2, 12, '3'] - readonly (number | string)[]

    // Error-safe updates in data processing
    const safeUpdate = <T, U>(
      array: readonly T[],
      index: number,
      updater: (value: T) => U,
    ) => {
      if (index < 0 || index >= array.length) {
        console.warn(
          `Index ${index} out of bounds for array of length ${array.length}`,
        );
        return array;
      }
      return Arr.toUpdated(array, index as SizeType.ArgArrNonNegative, updater);
    };

    // Advanced: State management pattern
    type AppState = {
      users: Array<{ id: number; name: string }>;
      currentUserId: number;
    };

    const updateUserName = (
      state: AppState,
      userId: number,
      newName: string,
    ): AppState => {
      const userIndex = state.users.findIndex((u) => u.id === userId);
      if (userIndex === -1) return state;

      return {
        ...state,
        users: Arr.toUpdated(
          state.users,
          userIndex as SizeType.ArgArrNonNegative,
          (user) => ({
            ...user,
            name: newName,
          }),
        ),
      };
    };

    // Type inference examples showing union types
    expectType<typeof doubled, readonly number[]>('='); // Same type
    expectType<typeof mixed, readonly (number | string)[]>('='); // Union type
    expectType<
      typeof doubleAtIndex2,
      <T extends readonly number[]>(array: T) => readonly (number | number)[]
    >('=');
    expectType<typeof safe1, readonly number[]>('='); // Bounds check preserves type
  });
});

describe('toInserted', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.toInserted([1, 2, 3], 1, 10); // [1, 10, 2, 3]

    // Curried usage for pipe composition
    const insertAtStart = Arr.toInserted(0, 99);
    const result = pipe([1, 2, 3]).map(insertAtStart).value;
    console.log(result); // [99, 1, 2, 3]
  });
});

describe('toRemoved', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.toRemoved([1, 2, 3], 1); // [1, 3]

    // Curried usage for pipe composition
    const removeFirst = Arr.toRemoved(0);
    const result = pipe([10, 20, 30]).map(removeFirst).value;
    console.log(result); // [20, 30]
  });
});

describe('toPushed', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]

    // Curried usage for pipe composition
    const addZero = Arr.toPushed(0);
    const result = pipe([1, 2, 3]).map(addZero).value;
    console.log(result); // [1, 2, 3, 0]
  });
});

describe('toUnshifted', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]

    // Curried usage for pipe composition
    const prependZero = Arr.toUnshifted(0);
    const result = pipe([1, 2, 3]).map(prependZero).value;
    console.log(result); // [0, 1, 2, 3]
  });
});

describe('toFilled', () => {
  test('JSDoc example', () => {
    // Regular usage
    const numbers = [1, 2, 3, 4, 5];
    const zeros = Arr.toFilled(numbers, 0); // [0, 0, 0, 0, 0]

    // Curried usage for pipe composition
    const fillWithX = Arr.toFilled('X');
    const result = pipe(['a', 'b', 'c']).map(fillWithX).value; // ['X', 'X', 'X']
  });
});

describe('toRangeFilled', () => {
  test('JSDoc example', () => {
    // Regular usage
    const numbers = [1, 2, 3, 4, 5];
    const result = Arr.toRangeFilled(numbers, 0, [1, 4]); // [1, 0, 0, 0, 5]

    // Curried usage for pipe composition
    const fillMiddleWithX = Arr.toRangeFilled('X', [1, 3]);
    const result2 = pipe(['a', 'b', 'c', 'd']).map(fillMiddleWithX).value; // ['a', 'X', 'X', 'd']
  });
});

describe('find', () => {
  test('JSDoc example', () => {
    const numbers = [1, 2, 3, 4, 5];
    const firstEven = Arr.find(numbers, (x) => x % 2 === 0);
    if (Optional.isSome(firstEven)) {
      console.log(firstEven.value); // 2
    }

    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];
    const adult = Arr.find(users, (user) => user.age >= 30);
    // Optional.Some({ id: 2, name: 'Bob', age: 30 })
  });
});

describe('findLast', () => {
  test('JSDoc example', () => {
    // Direct usage
    const numbers = [1, 2, 3, 4, 5];
    const lastEven = Arr.findLast(numbers, (n) => n % 2 === 0); // Optional.some(4)

    // Curried usage
    const isPositive = (n: number) => n > 0;
    const findLastPositive = Arr.findLast(isPositive);
    const result = findLastPositive([-1, 2, -3, 4]); // Optional.some(4)

    // No match
    const noMatch = Arr.findLast([1, 3, 5], (n) => n % 2 === 0); // Optional.none
  });
});

describe('findIndex', () => {
  test('JSDoc example', () => {
    // Basic index finding
    const fruits = ['apple', 'banana', 'cherry', 'banana'];
    const bananaIndex = Arr.findIndex(fruits, (fruit) => fruit === 'banana');
    if (Optional.isSome(bananaIndex)) {
      console.log(bananaIndex.value); // 1 - index of first 'banana'
    }

    // Finding with complex conditions
    const numbers = [1, 5, 10, 15, 20];
    const firstLargeIndex = Arr.findIndex(
      numbers,
      (value, index) => value > 10 && index > 1,
    );
    // Optional.Some(3) - index of 15 (first value > 10 after index 1)

    // Finding objects by property
    const users = [
      { id: 1, active: false },
      { id: 2, active: true },
      { id: 3, active: true },
    ];

    const firstActiveIndex = Arr.findIndex(users, (user) => user.active);
    // Optional.Some(1) - index of first active user

    const inactiveAdminIndex = Arr.findIndex(
      users,
      (user) => !user.active && user.id > 5,
    );
    // Optional.None - no inactive user with id > 5

    // Empty array handling
    const emptyResult = Arr.findIndex([], (x) => x > 0); // Optional.None

    // Curried usage for functional composition
    const findNegativeIndex = Arr.findIndex((x: number) => x < 0);
    const findLongStringIndex = Arr.findIndex((s: string) => s.length > 5);

    const datasets = [
      [1, 2, -3, 4], // index 2 has negative
      [5, 6, 7, 8], // no negative
      [-1, 0, 1], // index 0 has negative
    ];

    const negativeIndices = datasets.map(findNegativeIndex);
    // [Optional.Some(2), Optional.None, Optional.Some(0)]

    // Using found indices for further operations
    const data = ['short', 'medium', 'very long string', 'tiny'];
    const longStringIndex = Arr.findIndex(data, (s) => s.length > 8);

    if (Optional.isSome(longStringIndex)) {
      const index = longStringIndex.value;
      console.log(`Found at position ${index}: ${data[index]}`);
      // "Found at position 2: very long string"
    }

    // Pipe composition
    const result = pipe(['a', 'bb', 'ccc'])
      .map(findLongStringIndex)
      .map((opt) => Optional.unwrapOr(opt, -1)).value; // 2 (index of 'ccc')

    // Comparing with native findIndex (which returns -1)
    const nativeResult = fruits.findIndex((fruit) => fruit === 'grape'); // -1
    const safeResult = Arr.findIndex(fruits, (fruit) => fruit === 'grape'); // Optional.None

    // Safe index usage patterns
    const maybeIndex = Arr.findIndex(numbers, (x) => x > 100);
    const indexOrDefault = Optional.unwrapOr(maybeIndex, 0); // 0 (not found)

    // Using index for array access
    const foundIndex = Arr.findIndex(fruits, (f) => f.startsWith('c'));
    const foundElement = Optional.isSome(foundIndex)
      ? fruits[foundIndex.value]
      : 'not found';
    // 'cherry'

    // Type inference examples
    expectType<typeof bananaIndex, Optional<SizeType.Arr>>('=');
    expectType<
      typeof findNegativeIndex,
      (array: readonly number[]) => Optional<SizeType.Arr>
    >('=');
  });
});

describe('findLastIndex', () => {
  test('JSDoc example', () => {
    // Basic last index finding
    const fruits = ['apple', 'banana', 'cherry', 'banana'];
    const lastBananaIndex = Arr.findLastIndex(
      fruits,
      (fruit) => fruit === 'banana',
    );
    console.log(lastBananaIndex); // 3 - index of last 'banana'

    // Finding with complex conditions
    const numbers = [1, 5, 10, 15, 20, 10, 5];
    const lastLargeIndex = Arr.findLastIndex(
      numbers,
      (value, index) => value > 8 && index < 5,
    );
    console.log(lastLargeIndex); // 3 - index of last value > 8 before index 5 (15)

    // Finding objects by property
    const users = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true },
      { id: 4, active: false },
    ];

    const lastActiveIndex = Arr.findLastIndex(users, (user) => user.active);
    console.log(lastActiveIndex); // 2 - index of last active user

    const lastInactiveIndex = Arr.findLastIndex(users, (user) => !user.active);
    console.log(lastInactiveIndex); // 3 - index of last inactive user

    // Empty array handling
    const emptyResult = Arr.findLastIndex([], (x: number) => x > 0); // -1

    // Curried usage for functional composition
    const findLastNegativeIndex = Arr.findLastIndex((x: number) => x < 0);
    const findLastLongStringIndex = Arr.findLastIndex(
      (s: string) => s.length > 5,
    );

    const datasets = [
      [1, 2, -3, 4, -5], // last negative at index 4
      [5, 6, 7, 8], // no negative
      [-1, 0, 1, -2], // last negative at index 3
    ];

    const lastNegativeIndices = datasets.map(findLastNegativeIndex);
    // [4, -1, 3]

    // Functional composition
    const data = [
      'short',
      'medium',
      'very long string',
      'tiny',
      'another long one',
    ];
    const lastLongIndex = Arr.findLastIndex(data, (s) => s.length > 8);
    console.log(lastLongIndex); // 4 - index of 'another long one'

    // Using with pipe
    const result = pipe(['a', 'bb', 'ccc', 'bb']).map(
      Arr.findLastIndex((s: string) => s.length === 2),
    ).value; // 3 (last occurrence of 'bb')

    // Comparing with findIndex
    const values = [1, 2, 3, 2, 4];
    const firstTwo = Arr.findIndex(values, (x) => x === 2); // 1
    const lastTwo = Arr.findLastIndex(values, (x) => x === 2); // 3

    // Type safety with tuples
    const tuple = [10, 20, 30, 20] as const;
    const lastTwentyIndex = Arr.findLastIndex(tuple, (x) => x === 20);
    // Type: ArrayIndex<readonly [10, 20, 30, 20]> | -1
    // Value: 3
  });
});

describe('indexOf', () => {
  test('JSDoc example', () => {
    // Regular usage
    const arr = ['a', 'b', 'c', 'b'];
    const result = Arr.indexOf(arr, 'b');
    if (Optional.isSome(result)) {
      console.log(result.value); // 1 (branded as SizeType.Arr)
    }

    // Curried usage for pipe composition
    const findB = Arr.indexOf('b');
    const result2 = pipe(['a', 'b', 'c']).map(findB).value;
    console.log(Optional.unwrapOr(result2, -1)); // 1
  });
});

describe('lastIndexOf', () => {
  test('JSDoc example', () => {
    // Regular usage
    const arr = ['a', 'b', 'c', 'b'];
    const result = Arr.lastIndexOf(arr, 'b');
    if (Optional.isSome(result)) {
      console.log(result.value); // 3 (branded as SizeType.Arr)
    }

    // Curried usage for pipe composition
    const findLastB = Arr.lastIndexOf('b');
    const result2 = pipe(['a', 'b', 'c', 'b']).map(findLastB).value;
    console.log(Optional.unwrapOr(result2, -1)); // 3
  });
});

describe('every', () => {
  test('JSDoc example', () => {
    // Direct usage
    const numbers = [2, 4, 6, 8];
    const allEven = Arr.every(numbers, (n) => n % 2 === 0); // true

    // Type guard usage - narrows entire array type
    const mixed: (string | number)[] = ['hello', 'world'];
    if (Arr.every(mixed, (x): x is string => typeof x === 'string')) {
      // TypeScript knows mixed is string[] here
      console.log(mixed.map((s) => s.toUpperCase()));
    }

    // Curried usage with type guards
    const isString = (x: unknown): x is string => typeof x === 'string';
    const allStrings = Arr.every(isString);
    const data: unknown[] = ['a', 'b', 'c'];
    if (allStrings(data)) {
      // TypeScript knows data is string[] here
      console.log(data.join(''));
    }

    // Empty array
    const empty: number[] = [];
    const result2 = Arr.every(empty, (n) => n > 0); // true
  });
});

describe('some', () => {
  test('JSDoc example', () => {
    // Direct usage
    const numbers = [1, 3, 5, 8];
    const hasEven = Arr.some(numbers, (n) => n % 2 === 0); // true

    // Curried usage
    const isNegative = (n: number) => n < 0;
    const hasNegative = Arr.some(isNegative);
    const result = hasNegative([1, 2, -3]); // true

    // Empty array
    const empty: number[] = [];
    const result2 = Arr.some(empty, (n) => n > 0); // false
  });
});

describe('foldl', () => {
  test('JSDoc example', () => {
    Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
    Arr.foldl(['a', 'b', 'c'], (acc, str) => acc + str.toUpperCase(), ''); // 'ABC'
  });
});

describe('foldr', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6

    // Curried usage for pipe composition
    const concatRight = Arr.foldr(
      (acc: string, curr: string) => curr + acc,
      '',
    );
    const result = pipe(['a', 'b', 'c']).map(concatRight).value;
    console.log(result); // "abc"
  });
});

describe('min', () => {
  test('JSDoc example', () => {
    Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
    Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
    Arr.min([]); // Optional.none
  });
});

describe('max', () => {
  test('JSDoc example', () => {
    Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
    Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
    Arr.max([]); // Optional.none
  });
});

describe('minBy', () => {
  test('JSDoc example', () => {
    const people = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
    ] as const;
    Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
    Arr.minBy([], (p) => p.age); // Optional.none
  });
});

describe('maxBy', () => {
  test('JSDoc example', () => {
    const people = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
    ] as const;
    Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
    Arr.maxBy([], (p) => p.age); // Optional.none
  });
});

describe('count', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.count([1, 2, 3, 4], (x) => x > 2); // 2

    // Curried usage for pipe composition
    const countEvens = Arr.count((x: number) => x % 2 === 0);
    const result = pipe([1, 2, 3, 4, 5, 6]).map(countEvens).value;
    console.log(result); // 3
  });
});

describe('countBy', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.countBy([1, 2, 2, 3, 1, 1], (x) => x);
    // IMap { 1 => 3, 2 => 2, 3 => 1 }

    // Curried usage for pipe composition
    const countByType = Arr.countBy((x: { type: string }) => x.type);
    const data = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
    const result = pipe(data).map(countByType).value;
    // IMap { 'a' => 2, 'b' => 1 }
  });
});

describe('sum', () => {
  test('JSDoc example', () => {
    Arr.sum([1, 2, 3]); // 6
    Arr.sum([]); // 0
    Arr.sum([-1, 0, 1]); // 0
  });
});

describe('join', () => {
  test('JSDoc example', () => {
    // Regular usage
    const arr = ['Hello', 'World'];
    const result = Arr.join(arr, ' ');
    if (Result.isOk(result)) {
      console.log(result.value); // "Hello World"
    }

    // Curried usage for pipe composition
    const joinWithComma = Arr.join(',');
    const result2 = pipe(['a', 'b', 'c']).map(joinWithComma).value;
    console.log(Result.unwrapOr(result2, '')); // "a,b,c"
  });
});

describe('zip', () => {
  test('JSDoc example', () => {
    Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
    Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
    Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
    Arr.zip([], ['a']); // []
  });
});

describe('map', () => {
  test('JSDoc example', () => {
    // Basic transformation
    const nums = [1, 2, 3] as const;
    const doubled = Arr.map(nums, (x) => x * 2); // readonly [2, 4, 6]
    const strings = Arr.map(nums, (x) => String(x)); // readonly ['1', '2', '3']

    // With index
    const indexed = Arr.map(nums, (x, i) => `${i}:${x}`);
    // readonly ['0:1', '1:2', '2:3']

    // Mixed type tuples
    const mixed = [1, 'hello', true] as const;
    const descriptions = Arr.map(mixed, (x) => `Value: ${x}`);
    // readonly ['Value: 1', 'Value: hello', 'Value: true']
  });
});

describe('filter', () => {
  test('JSDoc example', () => {
    // Direct usage
    const numbers = [1, 2, 3, 4, 5];
    const evens = Arr.filter(numbers, (n) => n % 2 === 0); // [2, 4]

    // Type guard usage
    const mixed: (string | number | null)[] = ['hello', 42, null, 'world'];
    const strings = Arr.filter(
      mixed,
      (x): x is string => typeof x === 'string',
    ); // string[]
    const notNull = Arr.filter(
      mixed,
      (x): x is NonNullable<typeof x> => x != null,
    ); // (string | number)[]

    // Curried usage with type guards
    const isString = (x: unknown): x is string => typeof x === 'string';
    const filterStrings = Arr.filter(isString);
    const result = filterStrings(['a', 1, 'b', 2]); // string[]

    // Functional composition
    const processNumbers = pipe(
      Arr.filter((n: number) => n > 0),
      Arr.map((n) => n * 2),
    );
  });
});

describe('filterNot', () => {
  test('JSDoc example', () => {
    // Regular usage
    Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)

    // Curried usage for pipe composition
    const excludeEvens = Arr.filterNot((x: number) => x % 2 === 0);
    const result = pipe([1, 2, 3, 4, 5, 6]).map(excludeEvens).value;
    console.log(result); // [1, 3, 5]
  });
});

describe('flat', () => {
  test('JSDoc example', () => {
    // Direct usage
    const nested = [1, [2, [3, 4]], 5];
    const flat1 = Arr.flat(nested, 1); // [1, 2, [3, 4], 5]
    const flat2 = Arr.flat(nested, 2); // [1, 2, 3, 4, 5]

    // Curried usage
    const flattenOnceLevel = Arr.flat(1);
    const result = flattenOnceLevel([
      [1, 2],
      [3, 4],
    ]); // [1, 2, 3, 4]

    // Flatten all levels
    const deepNested = [1, [2, [3, [4, 5]]]];
    const allFlat = Arr.flat(deepNested, SafeUint.MAX_VALUE); // [1, 2, 3, 4, 5]
  });
});

describe('flatMap', () => {
  test('JSDoc example', () => {
    // Direct usage
    const words = ['hello', 'world'];
    const chars = Arr.flatMap(words, (word) => word.split('')); // ['h','e','l','l','o','w','o','r','l','d']

    // Curried usage
    const splitWords = Arr.flatMap((word: string) => word.split(''));
    const result = splitWords(['foo', 'bar']); // ['f','o','o','b','a','r']

    // With numbers
    const numbers = [1, 2, 3];
    const doubled = Arr.flatMap(numbers, (n) => [n, n * 2]); // [1, 2, 2, 4, 3, 6]
  });
});

describe('concat', () => {
  test('JSDoc example', () => {
    Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
    Arr.concat([], [1, 2]); // [1, 2]
    Arr.concat([1, 2], []); // [1, 2]
  });
});

describe('partition', () => {
  test('JSDoc example', () => {
    Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
    Arr.partition([1, 2, 3, 4, 5, 6, 7], 3); // [[1, 2, 3], [4, 5, 6], [7]]
  });
});

describe('toReversed', () => {
  test('JSDoc example', () => {
    // Basic reversal
    const nums = [1, 2, 3] as const;
    const reversed = Arr.toReversed(nums); // readonly [3, 2, 1]

    // Mixed types preserved in reverse positions
    const mixed = [1, 'hello', true, null] as const;
    const revMixed = Arr.toReversed(mixed);
    // readonly [null, true, 'hello', 1]

    // Empty and single-element tuples
    const empty = [] as const;
    const revEmpty = Arr.toReversed(empty); // readonly []
    const single = [42] as const;
    const revSingle = Arr.toReversed(single); // readonly [42]
  });
});

describe('toSorted', () => {
  test('JSDoc example', () => {
    const items = [
      { name: 'Eve', score: 70 },
      { name: 'Adam', score: 90 },
      { name: 'Bob', score: 80 },
    ];
    Arr.toSortedBy(items, (item) => item.score);
    // [{ name: 'Eve', score: 70 }, { name: 'Bob', score: 80 }, { name: 'Adam', score: 90 }]
    Arr.toSortedBy(
      items,
      (item) => item.score,
      (a, b) => b - a,
    ); // Sort descending
    // [{ name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }, { name: 'Eve', score: 70 }]
  });
});

describe('toSortedBy', () => {
  test('JSDoc example', () => {
    const items = [
      { name: 'Eve', score: 70 },
      { name: 'Adam', score: 90 },
      { name: 'Bob', score: 80 },
    ];
    Arr.toSortedBy(items, (item) => item.score);
    // [{ name: 'Eve', score: 70 }, { name: 'Bob', score: 80 }, { name: 'Adam', score: 90 }]
    Arr.toSortedBy(
      items,
      (item) => item.score,
      (a, b) => b - a,
    ); // Sort descending
    // [{ name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }, { name: 'Eve', score: 70 }]
  });
});

describe('scan', () => {
  test('JSDoc example', () => {
    // Basic running sum example
    const numbers = [1, 2, 3, 4];
    const runningSum = Arr.scan(numbers, (acc, curr) => acc + curr, 0);
    // NonEmptyArray<number> -> [0, 1, 3, 6, 10]
    //                           ^  ^  ^  ^  ^
    //                           |  |  |  |  └─ 0+1+2+3+4 = 10
    //                           |  |  |  └─ 0+1+2+3 = 6
    //                           |  |  └─ 0+1+2 = 3
    //                           |  └─ 0+1 = 1
    //                           └─ init = 0

    // Difference from reduce
    const reduced = numbers.reduce((acc, curr) => acc + curr, 0); // 10 (final only)
    const scanned = Arr.scan(numbers, (acc, curr) => acc + curr, 0); // [0, 1, 3, 6, 10] (all steps)

    // Running product
    const factorial = Arr.scan([1, 2, 3, 4, 5], (acc, curr) => acc * curr, 1);
    // [1, 1, 2, 6, 24, 120] - factorial sequence

    // Running maximum
    const temperatures = [20, 25, 18, 30, 22];
    const runningMax = Arr.scan(
      temperatures,
      (max, temp) => Math.max(max, temp),
      Number.NEGATIVE_INFINITY,
    );
    // [Number.NEGATIVE_INFINITY, 20, 25, 25, 30, 30]

    // Building strings incrementally
    const words = ['Hello', 'beautiful', 'world'];
    const sentences = Arr.scan(
      words,
      (sentence, word) => sentence + ' ' + word,
      '',
    );
    // ['', ' Hello', ' Hello beautiful', ' Hello beautiful world']

    // Array accumulation (collecting elements)
    const items = ['a', 'b', 'c'];
    const growing = Arr.scan(
      items,
      (acc, item) => [...acc, item],
      [] as string[],
    );
    // [[], ['a'], ['a', 'b'], ['a', 'b', 'c']]

    // Financial running balance
    const transactions = [100, -20, 50, -30];
    const balances = Arr.scan(
      transactions,
      (balance, transaction) => balance + transaction,
      1000,
    );
    // [1000, 1100, 1080, 1130, 1100] - account balance after each transaction

    // Using index information
    const letters = ['a', 'b', 'c'];
    const indexed = Arr.scan(
      letters,
      (acc, letter, index) => acc + `${index}:${letter} `,
      '',
    );
    // ['', '0:a ', '0:a 1:b ', '0:a 1:b 2:c ']

    // Edge cases
    const emptyArray: number[] = [];
    const emptyResult = Arr.scan(emptyArray, (acc, curr) => acc + curr, 42);
    // [42] - NonEmptyArray even for empty input

    const singleElement = Arr.scan([5], (acc, curr) => acc * curr, 2);
    // [2, 10] - init value plus one result

    // Complex object accumulation
    const sales = [
      { product: 'A', amount: 100 },
      { product: 'B', amount: 200 },
      { product: 'A', amount: 150 },
    ];

    const runningSales = Arr.scan(
      sales,
      (totals, sale) => ({
        ...totals,
        [sale.product]: (totals[sale.product] || 0) + sale.amount,
      }),
      {} as Record<string, number>,
    );
    // [
    //   {},
    //   { A: 100 },
    //   { A: 100, B: 200 },
    //   { A: 250, B: 200 }
    // ]

    // Curried usage for functional composition
    const runningSumFn = Arr.scan((acc: number, curr: number) => acc + curr, 0);
    const runningProductFn = Arr.scan(
      (acc: number, curr: number) => acc * curr,
      1,
    );
    const collectingFn = Arr.scan(
      (acc: string[], curr: string) => [...acc, curr],
      [] as string[],
    );

    const datasets = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8, 9],
    ];
    const allSums = datasets.map(runningSumFn);
    // [
    //   [0, 1, 3, 6],
    //   [0, 4, 9],
    //   [0, 6, 13, 21, 30]
    // ]

    // Pipe composition for data analysis
    const analysisResult = pipe([10, 20, 30, 40])
      .map(runningSumFn)
      .map((sums) => sums.slice(1)) // Remove initial value to get pure running sums
      .map((sums) => sums.map((sum, i) => ({ step: i + 1, total: sum }))).value;
    // [{ step: 1, total: 10 }, { step: 2, total: 30 }, { step: 3, total: 60 }, { step: 4, total: 100 }]

    // Advanced: State machine simulation
    type State = 'idle' | 'loading' | 'success' | 'error';
    type Event = 'start' | 'complete' | 'fail' | 'reset';

    const events: Event[] = ['start', 'complete', 'reset', 'start', 'fail'];
    const stateTransition = (state: State, event: Event): State => {
      switch (state) {
        case 'idle':
          return event === 'start' ? 'loading' : state;
        case 'loading':
          return event === 'complete'
            ? 'success'
            : event === 'fail'
              ? 'error'
              : state;
        case 'success':
          return event === 'reset' ? 'idle' : state;
        case 'error':
          return event === 'reset' ? 'idle' : state;
      }
    };

    const stateHistory = Arr.scan(events, stateTransition, 'idle' as State);
    // ['idle', 'loading', 'success', 'idle', 'loading', 'error']

    // Type inference examples
    expectType<typeof runningSum, NonEmptyArray<number>>('=');
    expectType<typeof emptyResult, NonEmptyArray<number>>('=');
    expectType<
      typeof runningSumFn,
      <T extends readonly number[]>(array: T) => NonEmptyArray<number>
    >('=');
    expectType<typeof stateHistory, NonEmptyArray<State>>('=');
  });
});

describe('groupBy', () => {
  test('JSDoc example', () => {
    // Basic grouping by object property
    const products = [
      { type: 'fruit', name: 'apple', price: 1.2 },
      { type: 'vegetable', name: 'carrot', price: 0.8 },
      { type: 'fruit', name: 'banana', price: 0.9 },
      { type: 'vegetable', name: 'broccoli', price: 2.1 },
      { type: 'fruit', name: 'orange', price: 1.5 },
    ];

    const byType = Arr.groupBy(products, (item) => item.type);
    // IMap<string, readonly Product[]> {
    //   'fruit' => [
    //     { type: 'fruit', name: 'apple', price: 1.2 },
    //     { type: 'fruit', name: 'banana', price: 0.9 },
    //     { type: 'fruit', name: 'orange', price: 1.5 }
    //   ],
    //   'vegetable' => [
    //     { type: 'vegetable', name: 'carrot', price: 0.8 },
    //     { type: 'vegetable', name: 'broccoli', price: 2.1 }
    //   ]
    // }

    // Access grouped results with IMap methods
    const fruits = IMap.get(byType, 'fruit'); // Optional<readonly Product[]>
    const fruitCount = Optional.map(fruits, (arr) => arr.length); // Optional<number>
    const fruitNames = Optional.map(fruits, (arr) => arr.map((p) => p.name)); // Optional<string[]>

    // Grouping by computed values
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const byParity = Arr.groupBy(numbers, (n) =>
      n % 2 === 0 ? 'even' : 'odd',
    );
    // IMap<string, readonly number[]> {
    //   'odd' => [1, 3, 5, 7, 9],
    //   'even' => [2, 4, 6, 8, 10]
    // }

    // Grouping by price ranges using index information
    const byPriceRange = Arr.groupBy(products, (product, index) => {
      const category =
        product.price < 1.0
          ? 'cheap'
          : product.price < 2.0
            ? 'moderate'
            : 'expensive';
      return `${category}_${index < 2 ? 'early' : 'late'}`;
    });

    // MapSetKeyType constraint examples (valid key types)
    const byStringKey = Arr.groupBy([1, 2, 3], (n) => `group_${n}`); // string keys
    const byNumberKey = Arr.groupBy(['a', 'b', 'c'], (_, i) => i); // number keys
    const byBooleanKey = Arr.groupBy([1, 2, 3, 4], (n) => n > 2); // boolean keys
    const bySymbolKey = Arr.groupBy([1, 2], (n) => Symbol(n.toString())); // symbol keys

    // Edge cases
    const emptyGroup = Arr.groupBy([], (x) => x); // IMap<never, readonly never[]> (empty)
    const singleGroup = Arr.groupBy([1, 2, 3], () => 'all'); // All elements in one group
    const uniqueGroups = Arr.groupBy([1, 2, 3], (x) => x); // Each element in its own group

    // Curried usage for functional composition
    const groupByType = Arr.groupBy((item: { type: string }) => item.type);
    const groupByLength = Arr.groupBy((str: string) => str.length);
    const groupByFirstChar = Arr.groupBy((str: string) =>
      str.charAt(0).toLowerCase(),
    );

    const datasets = [
      [{ type: 'A' }, { type: 'B' }, { type: 'A' }],
      [{ type: 'C' }, { type: 'A' }],
      [{ type: 'B' }, { type: 'B' }, { type: 'C' }],
    ];
    const allGrouped = datasets.map(groupByType);
    // Array of IMap instances, each grouped by type

    // Pipe composition for complex data processing
    const words = [
      'apple',
      'banana',
      'apricot',
      'blueberry',
      'avocado',
      'blackberry',
    ];
    const processedGroups = pipe(words)
      .map(groupByFirstChar)
      .map((groupMap) =>
        IMap.map(groupMap, (wordsInGroup, firstLetter) => ({
          letter: firstLetter,
          count: wordsInGroup.length,
          longest: wordsInGroup.reduce((longest, word) =>
            word.length > longest.length ? word : longest,
          ),
        })),
      ).value;
    // IMap<string, {letter: string, count: number, longest: string}>

    // Advanced: Grouping with complex transformations
    const students = [
      { name: 'Alice', grade: 85, subject: 'Math' },
      { name: 'Bob', grade: 92, subject: 'Science' },
      { name: 'Charlie', grade: 78, subject: 'Math' },
      { name: 'Diana', grade: 96, subject: 'Science' },
    ];

    const byGradeLevel = Arr.groupBy(students, (student) => {
      if (student.grade >= 90) return 'A';
      if (student.grade >= 80) return 'B';
      return 'C';
    });

    // Working with the grouped results
    const aStudents = Optional.unwrapOr(IMap.get(byGradeLevel, 'A'), []);
    const averageAGrade =
      aStudents.length > 0
        ? aStudents.reduce((sum, s) => sum + s.grade, 0) / aStudents.length
        : 0;

    // Type inference examples
    expectType<
      typeof byType,
      IMap<string, readonly (typeof products)[number][]>
    >('=');
    expectType<typeof byParity, IMap<string, readonly number[]>>('=');
    expectType<
      typeof groupByType,
      <T extends { type: string }>(
        array: readonly T[],
      ) => IMap<string, readonly T[]>
    >('=');
    expectType<typeof emptyGroup, IMap<never, readonly never[]>>('=');
  });
});

describe('uniq', () => {
  test('JSDoc example', () => {
    Arr.uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
  });
});

describe('uniqBy', () => {
  test('JSDoc example', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alicia' }, // Duplicate id
    ];
    Arr.uniqBy(users, (user) => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
  });
});

describe('eq', () => {
  test('JSDoc example', () => {
    Arr.eq([1, 2, 3], [1, 2, 3]); // true
    Arr.eq([1, 2, 3], [1, 2, 4]); // false
    Arr.eq([1, 2], [1, 2, 3]); // false
    Arr.eq([{ a: 1 }], [{ a: 1 }]); // false (different object references)
    Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a); // true
  });
});

describe('isSubset', () => {
  test('JSDoc example', () => {
    Arr.isSubset([1, 2], [1, 2, 3]); // true
    Arr.isSubset([1, 2, 3], [1, 2]); // false
    Arr.isSubset([], [1, 2, 3]); // true
    Arr.isSubset([1, 5], [1, 2, 3]); // false
  });
});

describe('isSuperset', () => {
  test('JSDoc example', () => {
    Arr.isSuperset([1, 2, 3], [1, 2]); // true
    Arr.isSuperset([1, 2], [1, 2, 3]); // false
    Arr.isSuperset([1, 2, 3], []); // true
  });
});

describe('setIntersection', () => {
  test('JSDoc example', () => {
    Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
    Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
    Arr.setIntersection([1, 2], [3, 4]); // []
  });
});

describe('setDifference', () => {
  test('JSDoc example', () => {
    Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
    Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
    Arr.setDifference([1, 2], [3, 4]); // [1, 2]
  });
});

describe('sortedNumSetDifference', () => {
  test('JSDoc example', () => {
    Arr.sortedNumSetDifference([1, 2, 3, 5], [2, 4, 5]); // [1, 3]
    Arr.sortedNumSetDifference([1, 2, 3], [1, 2, 3]); // []
    Arr.sortedNumSetDifference([1, 2], [3, 4]); // [1, 2]
  });
});
