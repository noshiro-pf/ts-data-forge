// Sample code extracted from src/others/cast-mutable.mts (castMutable)
// Anti-pattern - Avoid mutating shared data

import { castMutable } from 'ts-data-forge';

// ❌ Bad: Mutating data that other code expects to be immutable
const sharedConfig: Readonly<Config> = getConfig();
const mutable = castMutable(sharedConfig);
mutable.apiKey = 'new-key'; // Dangerous! Other code expects this to be immutable

// ✅ Good: Create a copy if you need to mutate
const configCopy = castMutable({ ...sharedConfig });
configCopy.apiKey = 'new-key'; // Safe - operating on a copy

export { configCopy, mutable, sharedConfig };
