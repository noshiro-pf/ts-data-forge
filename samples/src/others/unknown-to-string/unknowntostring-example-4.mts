// Example: src/others/unknown-to-string.mts (unknownToString)
// API response formatting

import { unknownToString } from 'ts-data-forge';

// Type-safe logger
class Logger {
  log(message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const dataStr =
      data !== undefined
        ? unknownToString(data, { prettyPrintObject: true })
        : '';
    console.log(`[${timestamp}] ${message}`, dataStr);
  }
}

const logger = new Logger();

logger.log('User data:', { id: 123, name: 'John' });
