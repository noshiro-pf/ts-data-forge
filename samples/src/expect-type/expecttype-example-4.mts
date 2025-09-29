// Example: src/expect-type.mts (expectType)

// Union type relationships
expectType<string, string | number>('<='); // string extends union
expectType<string | number, string>('>='); // union contains string
expectType<string | number, number>('>='); // union contains number

// Intersection type relationships
type A = { a: number };
type B = { b: string };
expectType<A & B, A>('>='); // intersection extends component
expectType<A, A & B>('<='); // component extends intersection

export type { A, B };
