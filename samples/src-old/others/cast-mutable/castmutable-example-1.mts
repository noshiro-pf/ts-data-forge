// Example: src/others/cast-mutable.mts
import { castDeepMutable, castMutable } from 'ts-data-forge';

type User = { id: number; profile: { active: boolean } };
const readonlyUser: Readonly<User> = { id: 1, profile: { active: false } };
const mutableUser = castMutable(readonlyUser);
mutableUser.profile.active = true;

const readonlyConfig: Readonly<{ settings: { theme: string } }> = {
  settings: { theme: 'light' },
};
const deepMutableConfig = castDeepMutable(readonlyConfig);
deepMutableConfig.settings.theme = 'dark';

assert.deepStrictEqual(deepMutableConfig, {
  settings: {
    theme: 'dark',
  },
});
assert.deepStrictEqual(mutableUser, {
  id: 1,
  profile: {
    active: true,
  },
});
assert.deepStrictEqual(readonlyConfig, {
  settings: {
    theme: 'dark',
  },
});
assert.deepStrictEqual(readonlyUser, {
  id: 1,
  profile: {
    active: true,
  },
});
