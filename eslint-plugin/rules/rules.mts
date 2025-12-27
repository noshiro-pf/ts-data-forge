import { type ESLintPlugin } from '../types.mjs';
import { checkDestructuringCompleteness } from './check-destructuring-completeness.mjs';
import { preferAsInt } from './prefer-as-int.mjs';
import { preferIsNonNullObject } from './prefer-is-non-null-object.mjs';

export const tsDataForgeRules = {
  'check-destructuring-completeness': checkDestructuringCompleteness,
  'prefer-as-int': preferAsInt,
  'prefer-is-non-null-object': preferIsNonNullObject,
} as const satisfies ESLintPlugin['rules'];
