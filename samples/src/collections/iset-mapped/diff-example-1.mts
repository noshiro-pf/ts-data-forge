// Example: src/collections/iset-mapped.mts (diff)
import { ISetMapped } from 'ts-data-forge';

type Tag = { name: string };
const tagToKey = (t: Tag): string => t.name;
const keyToTag = (name: string): Tag => ({ name });

const oldTags = ISetMapped.create<Tag, string>(
  [{ name: 'typescript' }, { name: 'javascript' }],
  tagToKey,
  keyToTag,
);
const newTags = ISetMapped.create<Tag, string>(
  [{ name: 'javascript' }, { name: 'react' }, { name: 'nextjs' }],
  tagToKey,
  keyToTag,
);

const diffResult = ISetMapped.diff(oldTags, newTags);

console.log(
  'Deleted tags:',
  diffResult.deleted.toArray().map((t) => t.name),
);
// Output: Deleted tags: ["typescript"]

console.log(
  'Added tags:',
  diffResult.added.toArray().map((t) => t.name),
);
// Output: Added tags: ["react", "nextjs"]

export { diffResult, keyToTag, newTags, oldTags, tagToKey };
export type { Tag };
