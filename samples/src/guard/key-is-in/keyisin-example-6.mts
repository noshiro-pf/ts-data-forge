// Example: src/guard/key-is-in.mts (keyIsIn)
// Working with union types:

import { keyIsIn } from 'ts-data-forge';

type Config =
  | { type: 'database'; host: string; port: number }
  | { type: 'file'; path: string }
  | { type: 'memory'; maxSize: number };

function getConfigProperty(config: Config, propName: string): unknown {
  if (keyIsIn(propName, config)) {
    // propName is narrowed to valid keys for the specific config type
    return config[propName];
  }

  return undefined;
}

export { getConfigProperty };
export type { Config };
