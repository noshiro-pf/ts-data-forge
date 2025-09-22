// Sample code extracted from src/guard/key-is-in.mts (keyIsIn)
// Safe object property iteration:

import { keyIsIn } from 'ts-data-forge';

const userPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: true,
};

const settingsToUpdate: string[] = getSettingsFromUser();

function updatePreferences(updates: Record<string, unknown>) {
  const validUpdates: Partial<typeof userPreferences> = {};

  for (const [key, value] of Object.entries(updates)) {
    if (keyIsIn(key, userPreferences)) {
      // key is now narrowed to valid preference keys
      validUpdates[key] = value as (typeof userPreferences)[typeof key];
    } else {
      console.warn(`Unknown preference key: ${key}`);
    }
  }

  return { ...userPreferences, ...validUpdates };
}

export { settingsToUpdate, updatePreferences, userPreferences };
