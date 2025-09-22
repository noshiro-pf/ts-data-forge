// Sample code extracted from src/others/cast-readonly.mts (castDeepReadonly)
// Basic usage with nested structures

import { castDeepReadonly } from 'ts-data-forge';

const mutableNested = {
  a: { b: [1, 2, 3] },
  c: { d: { e: 'value' } },
};

const readonlyNested = castDeepReadonly(mutableNested);
// readonlyNested.a.b.push(4); // ❌ Error: readonly at all levels
// readonlyNested.c.d.e = 'new'; // ❌ Error: readonly at all levels
// readonlyNested.a = {}; // ❌ Error: cannot reassign readonly property

export { mutableNested, readonlyNested };
