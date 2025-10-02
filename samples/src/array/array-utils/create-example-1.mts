// Example: src/array/array-utils.mts (create)
import { Arr } from 'ts-data-forge';

const strings = Arr.create(3, 'hello');
const numbers = Arr.create(2, 42);
const empty = Arr.create(0, 'unused');

const obj = { id: 1, name: 'test' };
const objects = Arr.create(3, obj);
obj.id = 999;
const sharedMutation = objects[0].id;

const count = 3;
const nonEmpty = Arr.create(count, 'item');

const summary = {
  count,
  empty,
  nonEmpty,
  numbers,
  obj,
  objects,
  sharedMutation,
  strings,
};

// embed-sample-code-ignore-below
export { summary };
