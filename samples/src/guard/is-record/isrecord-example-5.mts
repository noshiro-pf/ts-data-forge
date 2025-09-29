// Example: src/guard/is-record.mts (isRecord)
// Object transformation and mapping:

function transformRecords(data: unknown[]): Record<string, unknown>[] {
  return data
    .filter(isRecord) // Keep only plain objects
    .map((record) => {
      // Transform each record
      const transformed: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(record)) {
        // Apply some transformation logic
        transformed[key.toLowerCase()] = value;
      }

      return transformed;
    });
}

export { transformRecords };
