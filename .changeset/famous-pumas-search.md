---
'eslint-plugin-ts-data-forge': minor
---

`prefer-is-record-and-has-key` now drops the `isRecord(...)` conjunct when the
object already satisfies `hasKey`'s `R extends UnknownRecord` constraint, so
`Object.hasOwn(record, key)` on a record-typed value rewrites to
`hasKey(record, key)` instead of `isRecord(record) && hasKey(record, key)`.

The check needs type information; without it the guard is kept, as before. It
is deliberately conservative — a type TypeScript would accept through an
_implicit_ index signature keeps the guard — and callables and arrays keep it
too, because `isRecord` rejects those at runtime.
