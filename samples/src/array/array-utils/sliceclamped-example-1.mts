// Sample code extracted from src/array/array-utils.mts (sliceClamped)
import { Arr, pipe } from 'ts-data-forge';

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
