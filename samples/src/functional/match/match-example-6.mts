// Sample code extracted from src/functional/match.mts (match)
// Advanced usage with functional composition:

import { match } from 'ts-data-forge';

// Creating reusable matchers
const logLevelToColor = (level: string) =>
  match(
    level,
    {
      debug: 'gray',
      info: 'blue',
      warn: 'yellow',
      error: 'red',
    },
    'black',
  ); // Default for unknown levels

const logLevelToIcon = (level: string) =>
  match(
    level,
    {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    },
    '📝',
  );

// Combining matchers
const formatLogEntry = (level: string, message: string) => ({
  color: logLevelToColor(level),
  icon: logLevelToIcon(level),
  text: `${logLevelToIcon(level)} ${message}`,
});

export { formatLogEntry, logLevelToColor, logLevelToIcon };
