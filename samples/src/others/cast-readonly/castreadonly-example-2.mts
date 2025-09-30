// Example: src/others/cast-readonly.mts
import { castDeepReadonly, castReadonly } from 'ts-data-forge';

const user = { id: 1, profile: { active: true } };
const readonlyUser = castReadonly(user);

const config = { settings: { theme: 'dark', language: 'en' } };
const deepReadonlyConfig = castDeepReadonly(config);

const summary = {
  deepReadonlyConfig,
  readonlyUser,
  user,
};

// embed-sample-code-ignore-below
export { summary };
