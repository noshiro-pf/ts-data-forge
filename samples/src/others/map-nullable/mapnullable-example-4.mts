// Example: src/others/map-nullable.mts (mapNullable)
// Chaining nullable operations

import { mapNullable } from 'ts-data-forge';

// API response handling
interface ApiResponse {
  data?: {
    user?: {
      profile?: {
        displayName?: string;
      };
    };
  };
}

function getDisplayName(response: ApiResponse): string | undefined {
  return mapNullable(response.data?.user?.profile?.displayName, (name) =>
    name.trim().toUpperCase(),
  );
}

// Chain multiple transformations
function processNullableChain(value: string | null): string | undefined {
  const step1 = mapNullable(value, (v) => v.trim());
  const step2 = mapNullable(step1, (v) => (v.length > 0 ? v : null));
  const step3 = mapNullable(step2, (v) => v.toUpperCase());
  return step3;
}

export { getDisplayName, processNullableChain };
export type { ApiResponse };
