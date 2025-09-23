// Example: src/guard/is-type.mts (isNotSymbol)
import { isNotSymbol } from 'ts-data-forge';

const id = Symbol('id');
const tokens: unknown[] = [id, 'shared'];

const nonSymbols = tokens.filter(isNotSymbol);

assert.deepStrictEqual(nonSymbols, ['shared']);
