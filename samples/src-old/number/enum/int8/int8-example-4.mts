// Example: src/number/enum/int8.mts (int8)
import { Int8 } from 'ts-data-forge';

// Random signed byte
const randomByte = Int8.random(Int8.MIN_VALUE, Int8.MAX_VALUE);
assert.ok(randomByte >= Int8.MIN_VALUE && randomByte <= Int8.MAX_VALUE);

// Random small range
const dice = Int8.random(1, 6);
assert.ok(dice >= 1 && dice <= 6);

// Random offset
const offset = Int8.random(-10, 10);
assert.ok(offset >= -10 && offset <= 10);
