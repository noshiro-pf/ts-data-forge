// Sample code extracted from src/array/array-utils.mts (groupBy)
import { Arr, IMap, Optional, pipe } from 'ts-data-forge';

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
const byParity = Arr.groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
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
expectType<typeof byType, IMap<string, readonly (typeof products)[number][]>>(
  '=',
);
expectType<typeof byParity, IMap<string, readonly number[]>>('=');
expectType<
  typeof groupByType,
  <T extends { type: string }>(
    array: readonly T[],
  ) => IMap<string, readonly T[]>
>('=');
expectType<typeof emptyGroup, IMap<never, readonly never[]>>('=');

export { aStudents, allGrouped, averageAGrade, byBooleanKey, byGradeLevel, byNumberKey, byParity, byPriceRange, byStringKey, bySymbolKey, byType, datasets, emptyGroup, fruitCount, fruitNames, fruits, groupByFirstChar, groupByLength, groupByType, numbers, processedGroups, products, singleGroup, students, uniqueGroups, words };
