import { tsDataForgeRules } from './rules/index.mjs';
import { type ESLintPlugin } from './types.mjs';

export const eslintPluginTsDataForge: ESLintPlugin = {
  rules: tsDataForgeRules,
} as const;
