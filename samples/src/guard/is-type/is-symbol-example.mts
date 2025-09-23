// Example: src/guard/is-type.mts (isSymbol)
import { isSymbol } from 'ts-data-forge';

const id = Symbol('id');
const shared = Symbol.for('shared');
const tokens: unknown[] = [id, 'shared', shared];

const symbols = tokens.filter(isSymbol);

assert.deepStrictEqual(symbols, [id, shared]);
