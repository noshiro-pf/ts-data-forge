// Sample code extracted from src/guard/key-is-in.mts (keyIsIn)
// Dynamic key validation for safe property access:

import { keyIsIn } from 'ts-data-forge';

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} as const;

function getConfigValue(key: string): unknown {
  if (keyIsIn(key, config)) {
    // key is now narrowed to 'apiUrl' | 'timeout' | 'retries'
    return config[key]; // Safe access with proper typing
  }

  throw new Error(`Invalid config key: ${key}`);
}

// Usage
const apiUrl = getConfigValue('apiUrl'); // Returns string
const timeout = getConfigValue('timeout'); // Returns number
// getConfigValue('invalid') would throw an error

export { apiUrl, config, getConfigValue, timeout };
