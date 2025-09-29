// Example: src/number/enum/uint8.mts (uint8)
is(100); // true
is(0); // true (minimum value)
is(255); // true (maximum value)
is(256); // false (exceeds max)
is(-1); // false (negative)
is(5.5); // false (not integer)
