// Example: src/others/unknown-to-string.mts (unknownToString)
// API response formatting

import { unknownToString } from 'ts-data-forge';

// Safe error response formatting
function formatErrorResponse(error: unknown): string {
  const errorStr = unknownToString(error, { prettyPrintObject: true });

  return JSON.stringify({
    success: false,
    error: errorStr,
  });
}

try {
  // some operation
} catch (error) {
  const response = formatErrorResponse(error);
  res.status(500).send(response);
}

export { formatErrorResponse };
