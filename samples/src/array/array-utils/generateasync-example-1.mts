// Example: src/array/array-utils.mts (generateAsync)
import { Arr } from 'ts-data-forge';

const numbers = await Arr.generateAsync<number>(async function* () {
  yield 1;
  await Promise.resolve();
  yield 2;
});

const includeExtra = true;
const conditional = await Arr.generateAsync<number>(async function* () {
  yield 1;
  if (!includeExtra) {
    return;
  }
  await Promise.resolve();
  yield 2;
});

const summary = {
  conditional,
  includeExtra,
  numbers,
};

// embed-sample-code-ignore-below
export { summary };
