// Sample code extracted from src/others/unknown-to-string.mts (unknownToString)
// Using with validation

import { unknownToString } from 'ts-data-forge';

// Simple validation helper
function validateAndStringify(input: unknown): string {
  const str = unknownToString(input);
  const trimmed = str.trim();

  if (trimmed.length === 0) {
    throw new Error('Empty string');
  }

  return trimmed;
}

export { validateAndStringify };
