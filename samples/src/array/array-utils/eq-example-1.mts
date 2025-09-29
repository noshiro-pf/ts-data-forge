// Example: src/array/array-utils.mts (eq)
import { Arr } from 'ts-data-forge';

Arr.eq([1, 2, 3], [1, 2, 3]); // true
Arr.eq([1, 2, 3], [1, 2, 4]); // false
Arr.eq([1, 2], [1, 2, 3]); // false
Arr.eq([{ a: 1 }], [{ a: 1 }]); // false (different object references)
Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a); // true
