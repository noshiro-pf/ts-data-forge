import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';
import { getImportedLocalName, getTsDataForgeImport } from './import-utils.mjs';

type Options = readonly [];

type MessageIds = 'useCanonicalGuard';

/**
 * Length guards whose bound makes them exactly equivalent to `Arr.isEmpty` /
 * `Arr.isNonEmpty`, keyed by guard name.
 *
 * Every entry is *type-identical*, not merely equivalent at runtime:
 *
 * - `FixedLengthTuple<0, E>` / `MaxLengthTuple<0, E>` /
 *   `BoundedLengthTuple<0, 0, E>` all resolve to `readonly []`, which is what
 *   `isEmpty` narrows to.
 * - `MinLengthArray<1, E>` is the definition of `NonEmptyArray<E>`, which is
 *   what `isNonEmpty` narrows to.
 *
 * The branded `isFixedLengthArray(xs, 0)` is deliberately absent: it narrows to
 * `FixedLengthArray<0, E>`, a strict subtype of `readonly []`, so rewriting it
 * to `isEmpty` would *widen* the narrowed type and can break call sites.
 */
const GUARD_REWRITES = [
  { guard: 'isFixedLengthTuple', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isMaxLengthTuple', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isBoundedLengthTuple', bounds: [0, 0], replacement: 'isEmpty' },
  { guard: 'isMinLengthArray', bounds: [1], replacement: 'isNonEmpty' },
] as const satisfies readonly Readonly<{
  guard: string;
  bounds: readonly number[];
  replacement: string;
}>[];

export const preferCanonicalLengthGuard: TSESLint.RuleModule<
  MessageIds,
  Options
> = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Normalize degenerate `Arr` length guards (e.g. `Arr.isFixedLengthTuple(xs, 0)`) to `Arr.isEmpty` / `Arr.isNonEmpty`.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useCanonicalGuard:
        'Replace `{{arrName}}.{{guard}}({{boundsText}})` with `{{arrName}}.{{replacement}}(...)`: it narrows to exactly the same type.',
    },
  },

  create: (context) => {
    const sourceCode = context.sourceCode;

    const arrLocalName = getImportedLocalName(
      getTsDataForgeImport(sourceCode.ast),
      'Arr',
    );

    if (arrLocalName === undefined) return {};

    return {
      CallExpression: (node) => {
        const guardName = getGuardName(node, arrLocalName);

        if (guardName === undefined) return;

        const rewrite = GUARD_REWRITES.find(
          (entry) => entry.guard === guardName,
        );

        if (rewrite === undefined || !matchesBounds(node, rewrite.bounds)) {
          return;
        }

        const [array] = node.arguments;

        if (array === undefined) return;

        const arrayText = sourceCode.getText(array);

        context.report({
          node,
          messageId: 'useCanonicalGuard',
          data: {
            arrName: arrLocalName,
            guard: guardName,
            boundsText: ['…', ...rewrite.bounds.map(String)].join(', '),
            replacement: rewrite.replacement,
          },
          fix: (fixer) =>
            fixer.replaceText(
              node,
              `${arrLocalName}.${rewrite.replacement}(${arrayText})`,
            ),
        });
      },
    };
  },
  defaultOptions: [],
} as const;

/** The `Arr.<guard>` method name of `node`, or `undefined` for other calls. */
const getGuardName = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  node: TSESTree.CallExpression,
  arrLocalName: string,
): string | undefined => {
  const { callee } = node;

  return callee.type === AST_NODE_TYPES.MemberExpression &&
    !callee.computed &&
    callee.object.type === AST_NODE_TYPES.Identifier &&
    callee.object.name === arrLocalName &&
    callee.property.type === AST_NODE_TYPES.Identifier
    ? callee.property.name
    : undefined;
};

/**
 * Whether the call is `guard(array, ...bounds)` with every bound written as the
 * exact numeric literal the rewrite requires.
 */
const matchesBounds = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  node: TSESTree.CallExpression,
  bounds: readonly number[],
): boolean => {
  const args = node.arguments;

  if (args.length !== bounds.length + 1 || node.typeArguments !== undefined) {
    return false;
  }

  return args.every(
    (arg, index) =>
      arg.type !== AST_NODE_TYPES.SpreadElement &&
      (index === 0 ||
        (arg.type === AST_NODE_TYPES.Literal &&
          arg.value === bounds[index - 1])),
  );
};
