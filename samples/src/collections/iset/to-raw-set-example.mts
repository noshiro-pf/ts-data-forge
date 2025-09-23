// Example: src/collections/iset.mts (toRawSet)
import is from '@sindresorhus/is';
import { ISet } from 'ts-data-forge';

const set = ISet.create(['alpha']);

const raw = set.toRawSet();

assert.ok(is.set(raw));
assert.strictEqual(raw.has('alpha'), true);
