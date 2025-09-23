// Example: src/number/enum/int8.mts (isInt8)
import { isInt8 } from 'ts-data-forge';

assert.ok(isInt8(100));
assert.ok(isInt8(-50));
assert.ok(isInt8(127));
assert.ok(isInt8(-128));
assert.notOk(isInt8(128));
assert.notOk(isInt8(-129));
assert.notOk(isInt8(5.5));
