// Sample code extracted from src/array/array-utils.mts (values)
import { Arr } from 'ts-data-forge';

// Direct usage
const numbers = [1, 2, 3];
const values = Arr.values(numbers); // [1, 2, 3]

// Curried usage
const getValues = Arr.values;
const result = getValues(['a', 'b']); // ['a', 'b']

export { getValues, numbers, result, values };
