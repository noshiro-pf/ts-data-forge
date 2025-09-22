// Sample code extracted from src/expect-type.mts (expectType)
// Testing function return types
const createUser = () => ({ id: 1, name: 'John' });
expectType<ReturnType<typeof createUser>, { id: number; name: string }>('~=');

// Generic function type inference
const identity = <T,>(x: T): T => x;
const result = identity('hello');
expectType<typeof result, string>('=');

export { createUser, identity, result };
