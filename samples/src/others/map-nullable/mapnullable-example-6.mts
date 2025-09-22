// Sample code extracted from src/others/map-nullable.mts (mapNullable)
// Error handling patterns

import { mapNullable } from 'ts-data-forge';

// Safe JSON parsing
function parseJsonSafe<T>(json: string | null): T | undefined {
  return (
    mapNullable(json, (j) => {
      try {
        return JSON.parse(j) as T;
      } catch {
        return null;
      }
    }) ?? undefined
  );
}

// Safe property access with computation
function calculateAge(birthYear: number | null): string | undefined {
  return (
    mapNullable(birthYear, (year) => {
      const age = new Date().getFullYear() - year;
      return age >= 0 ? `${age} years old` : null;
    }) ?? undefined
  );
}

export { calculateAge, parseJsonSafe };
