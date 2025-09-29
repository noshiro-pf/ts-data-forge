// Example: src/number/enum/uint8.mts (uint8)

const byte = castType(200); // Uint8
const zero = castType(0); // Uint8 (minimum)
const max = castType(255); // Uint8 (maximum)

// These throw TypeError:
// castType(256);              // Exceeds maximum
// castType(-1);               // Negative value
// castType(1.5);              // Not an integer

export { byte, max, zero };
