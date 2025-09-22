// Sample code extracted from src/expect-type.mts (expectType)

// Primitive type equality
expectType<string, string>('='); // ✓ exact match
expectType<number, string>('!='); // ✓ different types
expectType<42, number>('<='); // ✓ literal extends primitive
expectType<number, 42>('>='); // ✓ primitive is supertype

// Type assertions will cause compilation errors for wrong relationships:
// expectType<string, number>("=");        // ❌ TypeScript error
// expectType<number, string>("<=");       // ❌ TypeScript error
