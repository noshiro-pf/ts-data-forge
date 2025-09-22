// Sample code extracted from src/array/array-utils.mts (countBy)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
Arr.countBy([1, 2, 2, 3, 1, 1], (x) => x);
// IMap { 1 => 3, 2 => 2, 3 => 1 }

// Curried usage for pipe composition
const countByType = Arr.countBy((x: { type: string }) => x.type);
const data = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
const result = pipe(data).map(countByType).value;
// IMap { 'a' => 2, 'b' => 1 }

export { countByType, data, result };
