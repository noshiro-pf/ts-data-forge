import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';

type Options = readonly [];

type MessageIds = 'useIsNonNullObject';

const TS_DATA_FORGE_MODULE = 'ts-data-forge';

export const preferIsNonNullObject: TSESLint.RuleModule<MessageIds, Options> = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Replace `typeof u === "object" && u !== null` with `isNonNullObject(u)`',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useIsNonNullObject:
        'Replace the object/null check with `isNonNullObject()` from ts-data-forge.',
    },
  },

  create: (context) => {
    const sourceCode = context.sourceCode;

    const program = sourceCode.ast;

    const tsDataForgeImport = getTsDataForgeImport(program);

    const namedImports = getNamedImports(tsDataForgeImport);

    const hasIsNonNullObjectImport = namedImports.includes('isNonNullObject');

    let mut_needsIsNonNullObjectImport = false;

    let mut_importFixApplied = false;

    const getImportFixes = (
      fixer: TSESLint.RuleFixer,
    ): readonly TSESLint.RuleFix[] => {
      if (mut_importFixApplied) return [];

      if (!mut_needsIsNonNullObjectImport || hasIsNonNullObjectImport) {
        return [];
      }

      mut_importFixApplied = true;

      return buildImportFixes(fixer, program, tsDataForgeImport, [
        'isNonNullObject',
      ]);
    };

    /* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
    const reportIsNonNullObject = (
      node: TSESTree.LogicalExpression,
      identifierName: string,
    ): void => {
      mut_needsIsNonNullObjectImport = true;

      context.report({
        node,
        messageId: 'useIsNonNullObject',
        fix: (fixer) => {
          const replacement = `isNonNullObject(${identifierName})`;

          const importFixes = getImportFixes(fixer);

          return [...importFixes, fixer.replaceText(node, replacement)];
        },
      });
    };
    /* eslint-enable @typescript-eslint/prefer-readonly-parameter-types */

    return {
      LogicalExpression: (node) => {
        const identifierName = getNonNullObjectIdentifierName(node);

        if (identifierName === undefined) return;

        reportIsNonNullObject(node, identifierName);
      },
    };
  },
  defaultOptions: [],
};

const getNonNullObjectIdentifierName = (
  node: DeepReadonly<TSESTree.LogicalExpression>,
): string | undefined => {
  if (node.operator !== '&&') return undefined;

  const leftIdentifierName = getTypeofObjectIdentifierName(node.left);

  const rightIdentifierName = getNonNullCheckIdentifierName(node.right);

  if (leftIdentifierName === undefined) return undefined;

  if (rightIdentifierName === undefined) return undefined;

  if (leftIdentifierName !== rightIdentifierName) return undefined;

  return leftIdentifierName;
};

const getTypeofObjectIdentifierName = (
  node: DeepReadonly<TSESTree.Expression>,
): string | undefined => {
  if (node.type !== AST_NODE_TYPES.BinaryExpression) return undefined;

  if (node.operator !== '===') return undefined;

  const { left, right } = node;

  if (left.type !== AST_NODE_TYPES.UnaryExpression) return undefined;

  if (left.operator !== 'typeof') return undefined;

  if (right.type !== AST_NODE_TYPES.Literal) return undefined;

  if (right.value !== 'object') return undefined;

  if (left.argument.type !== AST_NODE_TYPES.Identifier) return undefined;

  return left.argument.name;
};

const getNonNullCheckIdentifierName = (
  node: DeepReadonly<TSESTree.Expression>,
): string | undefined => {
  if (node.type !== AST_NODE_TYPES.BinaryExpression) return undefined;

  if (node.operator !== '!==') return undefined;

  const { left, right } = node;

  if (left.type !== AST_NODE_TYPES.Identifier) return undefined;

  if (right.type !== AST_NODE_TYPES.Literal) return undefined;

  if (right.value !== null) return undefined;

  return left.name;
};

/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
const getTsDataForgeImport = (
  program: TSESTree.Program,
): TSESTree.ImportDeclaration | undefined =>
  program.body.find(
    (node): node is TSESTree.ImportDeclaration =>
      node.type === AST_NODE_TYPES.ImportDeclaration &&
      node.source.value === TS_DATA_FORGE_MODULE,
  );

const getNamedImports = (
  node: DeepReadonly<TSESTree.ImportDeclaration> | undefined,
): readonly string[] => {
  if (node === undefined) return [];

  return node.specifiers.flatMap((specifier) =>
    specifier.type === AST_NODE_TYPES.ImportSpecifier
      ? (() => {
          const importedName =
            specifier.imported.type === AST_NODE_TYPES.Identifier
              ? specifier.imported.name
              : specifier.imported.value;

          return typeof importedName === 'string' ? [importedName] : [];
        })()
      : [],
  );
};

const buildImportFixes = (
  fixer: TSESLint.RuleFixer,
  program: TSESTree.Program,
  tsDataForgeImport: TSESTree.ImportDeclaration | undefined,
  requiredNames: readonly string[],
): readonly TSESLint.RuleFix[] => {
  const specifierText = requiredNames.join(', ');

  if (tsDataForgeImport !== undefined) {
    const namedSpecifiers = tsDataForgeImport.specifiers.filter(
      (specifier) => specifier.type === AST_NODE_TYPES.ImportSpecifier,
    );

    if (namedSpecifiers.length > 0) {
      const lastSpecifier = namedSpecifiers.at(-1);

      if (lastSpecifier === undefined) return [];

      const insertion = [', ', specifierText].join('');

      return [fixer.insertTextAfter(lastSpecifier, insertion)];
    }
  }

  const importStatement = `import { ${specifierText} } from '${TS_DATA_FORGE_MODULE}';`;

  const newLine = '\n';

  const insertionText = `${importStatement}${newLine}`;

  const lastImport = getLastImportDeclaration(program);

  if (lastImport !== undefined) {
    const afterImport = `${newLine}${importStatement}`;

    return [fixer.insertTextAfter(lastImport, afterImport)];
  }

  return [fixer.insertTextBefore(program, insertionText)];
};

const getLastImportDeclaration = (
  program: TSESTree.Program,
): TSESTree.ImportDeclaration | undefined => {
  const importDeclarations = program.body.filter(
    (node): node is TSESTree.ImportDeclaration =>
      node.type === AST_NODE_TYPES.ImportDeclaration,
  );

  return importDeclarations.length > 0 ? importDeclarations.at(-1) : undefined;
};
/* eslint-enable @typescript-eslint/prefer-readonly-parameter-types */
