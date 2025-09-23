// Example: src/array/array-utils.mts (values)
import { Arr } from 'ts-data-forge';

const players = ['Ada', 'Grace', 'Alan'];

const valueList = Array.from(Arr.values(players));

assert.deepStrictEqual(valueList, players);
