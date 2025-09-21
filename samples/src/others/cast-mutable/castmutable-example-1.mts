// Sample code extracted from src/others/cast-mutable.mts (castMutable)
// Basic usage with arrays and objects

import { castMutable } from 'ts-data-forge';

const readonlyArr: readonly number[] = [1, 2, 3];
const mutableArr = castMutable(readonlyArr);
mutableArr.push(4); // Now allowed by TypeScript

const readonlyObj: { readonly x: number } = { x: 1 };
const mutableObj = castMutable(readonlyObj);
mutableObj.x = 2; // Now allowed by TypeScript
