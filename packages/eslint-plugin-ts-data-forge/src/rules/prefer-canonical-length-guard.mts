import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';
import { getImportedLocalName, getTsDataForgeImport } from './import-utils.mjs';

type Options = readonly [];

type MessageIds = 'useCanonicalGuard';

/**
 * Length guards whose bound makes them redundant with `Arr.isEmpty` /
 * `Arr.isNonEmpty`, keyed by guard name.
 *
 * `isEmpty` narrows to `FixedLengthArray<0, E> & Xs` and `isNonEmpty` to
 * `MinLengthArray<1, E> & Xs`, so:
 *
 * - The `*Array` entries are **type-identical** — `isFixedLengthArray(xs, 0)`
 *   and `isMinLengthArray(xs, 1)` produce exactly those types.
 * - The `*Tuple` entries **narrow**: they resolve to the structural
 *   `readonly []` / `readonly [E, ...E[]]`, and the canonical guards add the
 *   brand on top. The result stays assignable everywhere the old type was, so
 *   the rewrite is safe, but it is a strengthening rather than a pure rename.
 */
const GUARD_REWRITES = [
  { guard: 'isFixedLengthArray', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isFixedLengthTuple', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isMaxLengthTuple', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isMaxLengthArray', bounds: [0], replacement: 'isEmpty' },
  { guard: 'isBoundedLengthTuple', bounds: [0, 0], replacement: 'isEmpty' },
  { guard: 'isBoundedLengthArray', bounds: [0, 0], replacement: 'isEmpty' },
  { guard: 'isMinLengthArray', bounds: [1], replacement: 'isNonEmpty' },
  { guard: 'isMinLengthTuple', bounds: [1], replacement: 'isNonEmpty' },
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
        'Replace `{{arrName}}.{{guard}}({{boundsText}})` with `{{arrName}}.{{replacement}}(...)`: the bound makes the two guards equivalent.',
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
