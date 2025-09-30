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

const summary = {
  deepMutableConfig,
  mutableUser,
  readonlyConfig,
  readonlyUser,
};

// embed-sample-code-ignore-below
export { summary };
