// Example: src/others/cast-readonly.mts (castReadonly)
// Basic usage with arrays and objects

import { castReadonly } from 'ts-data-forge';

const mutableArr: number[] = [1, 2, 3];
const readonlyArr = castReadonly(mutableArr);
// readonlyArr.push(4); // ❌ TypeScript Error: no 'push' on readonly array

const mutableObj = { x: 1, y: 2 };
const readonlyObj = castReadonly(mutableObj);
// readonlyObj.x = 5; // ❌ TypeScript Error: cannot assign to readonly property

export { mutableArr, mutableObj, readonlyArr, readonlyObj };
