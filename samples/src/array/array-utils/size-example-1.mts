// Sample code extracted from src/array/array-utils.mts (size)
import { Arr, Uint32 } from 'ts-data-forge';

// Known non-empty arrays get positive branded type
const tuple = [1, 2, 3] as const;
const tupleSize = Arr.size(tuple);
// Type: IntersectBrand<PositiveNumber, SizeType.Arr>
// Value: 3 (branded, guaranteed positive)

const nonEmpty: NonEmptyArray<string> = ['a', 'b'];
const nonEmptySize = Arr.size(nonEmpty);
// Type: IntersectBrand<PositiveNumber, SizeType.Arr>
// Guaranteed to be > 0

// General arrays may be empty, get regular branded type
const generalArray: number[] = [1, 2, 3];
const generalSize = Arr.size(generalArray);
// Type: SizeType.Arr (branded Uint32)
// May be 0 or positive

// Empty arrays
const emptyArray = [] as const;
const emptySize = Arr.size(emptyArray);
// Type: SizeType.Arr
// Value: 0 (branded)

// Runtime arrays with unknown content
const dynamicArray = Array.from({ length: Math.random() * 10 }, (_, i) => i);
const dynamicSize = Arr.size(dynamicArray);
// Type: SizeType.Arr (may be 0)

// Using size for safe operations
const data = [10, 20, 30];
const dataSize = Arr.size(data);

// Safe for array creation
const indices = Arr.seq(dataSize); // Creates [0, 1, 2]
const zeros = Arr.zeros(dataSize); // Creates [0, 0, 0]

// Functional composition
const arrays = [[1, 2], [3, 4, 5], [], [6]];
const sizes = arrays.map(Arr.size); // [2, 3, 0, 1] (all branded)
const totalElements = sizes.reduce(Uint32.add, 0); // 6

// Type guards work with size
if (Arr.size(data) > 0) {
  // TypeScript knows data is non-empty here
  const firstElement = data[0]; // Safe access
}

// Type inference examples
expectType<typeof tupleSize, IntersectBrand<PositiveNumber, SizeType.Arr>>('=');
expectType<typeof generalSize, SizeType.Arr>('=');
expectType<typeof emptySize, SizeType.Arr>('=');

export { arrays, data, dataSize, dynamicArray, dynamicSize, emptyArray, emptySize, generalArray, generalSize, indices, nonEmpty, nonEmptySize, sizes, totalElements, tuple, tupleSize, zeros };
