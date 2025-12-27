import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';

type Options = readonly [];

type MessageIds = 'useAsInt';

const TS_DATA_FORGE_MODULE = 'ts-data-forge';

export const preferAsInt: TSESLint.RuleModule<MessageIds, Options> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Replace `as Int` with `asInt()` from ts-data-forge',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useAsInt: 'Replace `as Int` with `asInt()` from ts-data-forge.',
    },
  },

  create: (context) => {
    const sourceCode = context.sourceCode;

    const program = sourceCode.ast;

    const tsDataForgeImport = getTsDataForgeImport(program);

    const namedImports = getNamedImports(tsDataForgeImport);

    const hasAsIntImport = namedImports.includes('asInt');

    let mut_needsAsIntImport = false;

    let mut_importFixApplied = false;

    const getImportFixes = (
      fixer: TSESLint.RuleFixer,
    ): readonly TSESLint.RuleFix[] => {
      if (mut_importFixApplied) return [];

      if (!mut_needsAsIntImport || hasAsIntImport) return [];

      mut_importFixApplied = true;

      return buildImportFixes(fixer, program, tsDataForgeImport, ['asInt']);
    };

    /* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
    const reportAsInt = (node: TSESTree.TSAsExpression): void => {
      mut_needsAsIntImport = true;

      context.report({
        node,
        messageId: 'useAsInt',
        fix: (fixer) => {
          const replacement = `asInt(${sourceCode.getText(node.expression)})`;

          const importFixes = getImportFixes(fixer);

          return [...importFixes, fixer.replaceText(node, replacement)];
        },
      });
    };
    /* eslint-enable @typescript-eslint/prefer-readonly-parameter-types */

    return {
      TSAsExpression: (node) => {
        if (!isIntTypeAssertion(node.typeAnnotation)) return;

        reportAsInt(node);
      },
    };
  },
  defaultOptions: [],
};

const isIntTypeAssertion = (
  typeAnnotation: DeepReadonly<TSESTree.TypeNode>,
): boolean => {
  if (typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) return false;

  if (typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier) return false;

  return typeAnnotation.typeName.name === 'Int';
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
