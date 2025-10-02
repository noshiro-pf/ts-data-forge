// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type A = { a: number };
type B = { b: string };

expectType<A & B, A>('<=');
expectType<A | B, A>('>=');

const summary = {
  ok: true,
};

// embed-sample-code-ignore-below
export { summary };
