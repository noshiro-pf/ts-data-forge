// Sample code extracted from src/others/cast-readonly.mts (castReadonly)
// Creating immutable configurations

import { castReadonly } from 'ts-data-forge';

// Start with mutable object for initialization
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};

// Validate and process config...

// Export as readonly to prevent modifications
export const APP_CONFIG = castReadonly(config);
// APP_CONFIG.timeout = 10000; // ❌ TypeScript Error
