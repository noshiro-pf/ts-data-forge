// Example: src/others/cast-readonly.mts
import { castDeepReadonly, castReadonly } from 'ts-data-forge';

const user = { id: 1, profile: { active: true } };
const readonlyUser = castReadonly(user);

const config = { settings: { theme: 'dark', language: 'en' } };
const deepReadonlyConfig = castDeepReadonly(config);

assert.deepStrictEqual(deepReadonlyConfig, {
  settings: {
    theme: 'dark',
    language: 'en',
  },
});
assert.deepStrictEqual(readonlyUser, {
  id: 1,
  profile: {
    active: true,
  },
});
assert.deepStrictEqual(user, {
  id: 1,
  profile: {
    active: true,
  },
});
