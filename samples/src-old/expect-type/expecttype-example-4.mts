// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type A = { a: number };
type B = { b: string };

expectType<A & B, A>('<=');
expectType<A | B, A>('>=');

assert.strictEqual(true, true);
