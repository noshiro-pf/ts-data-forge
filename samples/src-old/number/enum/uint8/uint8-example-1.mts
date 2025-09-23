// Example: src/number/enum/uint8.mts (Uint8.is)
import { Uint8 } from 'ts-data-forge';

assert.ok(Uint8.is(100));
assert.ok(Uint8.is(0));
assert.ok(Uint8.is(255));
assert.notOk(Uint8.is(256));
assert.notOk(Uint8.is(-1));
assert.notOk(Uint8.is(5.5));
