#!/usr/bin/env node
/* eslint-disable no-await-in-loop */

import 'ts-repo-utils';
import { projectRootPath } from './project-root-path.mjs';

// Constants and configuration
const srcDir = path.resolve(projectRootPath, './src');

// All possible imports that will be added to every doc test file
// Unused imports will be removed by prettier organizeImports
const ALL_IMPORTS = [
  'Optional',
  'Result',
  'pipe',
  'match',
  'Arr',
  'IMap',
  'ISet',
  'IMapMapped',
  'ISetMapped',
  'asUint32',
  'asPositiveUint32',
  'castMutable',
  'castReadonly',
  'castDeepMutable',
  'castDeepReadonly',
  'tp',
  'memoizeFunction',
  'mapNullable',
  'ifThen',
  'unknownToString',
  'expectType',
] as const;

// Type definitions
type ExampleBlock = Readonly<{
  functionName: string;
  exampleCode: string;
  startLine: number;
  exampleTitle?: string; // Optional title for the example
}>;

type FileExamples = Readonly<{
  filePath: string;
  examples: readonly ExampleBlock[];
}>;

// Main function - entry point
const main = async (): Promise<void> => {
  console.log('Cleaning up old doc test files...');
  await cleanupOldTests();

  console.log('\nExtracting JSDoc examples and generating test files...');
  await processDirectory(srcDir);

  console.log('\nCleaning up generated files with lint:fix and fmt...');
  try {
    // Use fmt to format the code properly
    await $('npm run fmt');

    console.log('✓ Generated files cleaned up successfully');
  } catch (error) {
    console.warn('Warning: Failed to clean up generated files:', error);
  }

  console.log('\nDone!');
};

const cleanupOldTests = async (): Promise<void> => {
  const files = await glob(path.resolve(srcDir, './**/*.doc.test.mts'));
  for (const file of files) {
    await fs.rm(file);
  }
};

const processDirectory = async (dir: string): Promise<void> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (
      entry.isDirectory() &&
      !entry.name.includes('node_modules') &&
      !entry.name.startsWith('.')
    ) {
      await processDirectory(fullPath);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.mts') &&
      !entry.name.includes('.test.') &&
      !entry.name.includes('.doc.test.')
    ) {
      const fileExamples = await extractExamplesFromFile(fullPath);

      if (fileExamples.examples.length > 0) {
        const testFileName = entry.name.replace('.mts', '.doc.test.mts');
        const testFilePath = path.join(dir, testFileName);
        const testContent = generateTestFile(fileExamples);

        await fs.writeFile(testFilePath, testContent);
        console.log(`Generated ${testFilePath}`);
      }
    }
  }
};

const extractExamplesFromFile = async (
  filePath: string,
): Promise<FileExamples> => {
  const content = await fs.readFile(filePath, 'utf-8');
  const examples: ExampleBlock[] = [];

  // Use regex to find all JSDoc blocks with their following function declarations
  // Allow for optional comments (like eslint-disable) between JSDoc and export
  const jsDocPattern =
    /\/\*\*([\s\S]*?)\*\/\s*(?:\/\/.*?\n\s*)*export\s+(?:const|function|class)\s+(\w+)/gu;
  let match;

  while ((match = jsDocPattern.exec(content)) !== null) {
    const [, jsDocContent, functionName] = match;
    if (
      jsDocContent !== undefined &&
      jsDocContent !== '' &&
      functionName !== undefined &&
      functionName !== ''
    ) {
      const extractedExamples = extractExamplesFromJsDocBlock(jsDocContent);

      for (const example of extractedExamples) {
        examples.push({
          functionName,
          exampleCode: example.exampleCode,
          startLine: example.startLine,
          exampleTitle: example.exampleTitle,
        });
      }
    }
  }

  return { filePath, examples };
};

const extractExamplesFromJsDocBlock = (
  jsDocContent: string,
): {
  exampleCode: string;
  startLine: number;
  exampleTitle?: string;
}[] => {
  const examples: {
    exampleCode: string;
    startLine: number;
    exampleTitle?: string;
  }[] = [];

  // Split JSDoc content into lines for processing
  const lines = jsDocContent.split('\n');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line === undefined || line === '') {
      i += 1;
      continue;
    }

    const trimmedLine = line.trim();

    // Look for @example tag
    if (trimmedLine.startsWith('* @example')) {
      const example = extractSingleExampleFromJsDoc(lines, i);
      if (example !== null) {
        examples.push(example);
        i = example.endIndex;
      } else {
        i += 1;
      }
    } else {
      i += 1;
    }
  }

  return examples;
};

const extractSingleExampleFromJsDoc = (
  lines: readonly string[],
  exampleStartIndex: number,
): {
  exampleCode: string;
  startLine: number;
  exampleTitle?: string;
  endIndex: number;
} | null => {
  const exampleLine = lines[exampleStartIndex];
  if (exampleLine === undefined || exampleLine === '') return null;

  // Extract title from the @example line
  const exampleMatch = /\*\s*@example\s*(.+)/u.exec(exampleLine);
  let exampleTitle = exampleMatch?.[1]?.trim() ?? '';

  let i = exampleStartIndex + 1;
  const exampleCode: string[] = [];
  let inCodeBlock = false;

  // Look for title on the next lines if not found on @example line
  if (exampleTitle === '') {
    while (i < lines.length) {
      const line = lines[i];
      if (line === undefined || line === '') break;

      const trimmedLine = line.trim();

      if (
        trimmedLine.startsWith('* @example') ||
        trimmedLine.includes('```ts')
      ) {
        break;
      }

      const cleanedLine = line.replace(/^\s*\*\s?/u, '').trim();
      if (cleanedLine !== '' && !cleanedLine.includes('```')) {
        exampleTitle = cleanedLine;
        break;
      }

      i += 1;
    }
  }

  // Reset i to look for code block
  i = exampleStartIndex + 1;

  // Find and extract all code blocks for this example
  while (i < lines.length) {
    const line = lines[i];
    if (line === undefined) break;

    const trimmedLine = line.trim();

    // Start of new @example - end this example
    if (trimmedLine.startsWith('* @example') && i > exampleStartIndex) {
      break;
    }

    // Start of code block
    if (trimmedLine.includes('```ts')) {
      inCodeBlock = true;
      i += 1;
      continue;
    }

    // End of code block
    if (
      inCodeBlock &&
      trimmedLine.includes('```') &&
      !trimmedLine.includes('```ts')
    ) {
      inCodeBlock = false;
      i += 1;
      continue;
    }

    // Collect code inside code blocks
    if (inCodeBlock && !trimmedLine.includes('```')) {
      const cleanedLine = line.replace(/^\s*\*\s?/u, '');
      exampleCode.push(cleanedLine);
    }

    i += 1;
  }

  if (exampleCode.length > 0) {
    return {
      exampleCode: exampleCode.join('\n'),
      startLine: exampleStartIndex + 1,
      exampleTitle: exampleTitle !== '' ? exampleTitle : undefined,
      endIndex: i,
    };
  }

  return null;
};

const generateTestFile = (fileExamples: FileExamples): string => {
  const { filePath, examples } = fileExamples;

  // Get relative import path from test file to source file
  const sourceFileName = path.basename(filePath, '.mts');
  const importPath = `./${sourceFileName}.mjs`;

  let testContent = '';

  // Add import from source file (extract all exported names)
  const sourceFileImports = examples.map((example) => example.functionName);
  if (sourceFileImports.length > 0) {
    const uniqueImports = [...new Set(sourceFileImports)].sort();
    testContent += `import { ${uniqueImports.join(', ')} } from '${importPath}';\n`;
  }

  // Add all possible imports (unused ones will be removed by prettier organizeImports)
  testContent += `import { ${ALL_IMPORTS.join(', ')} } from '${generateImportPath(filePath, 'src/index.mjs')}';\n`;

  testContent += '\n';

  // Group examples by function name
  const examplesByFunction = new Map<string, ExampleBlock[]>();
  for (const example of examples) {
    if (!examplesByFunction.has(example.functionName)) {
      examplesByFunction.set(example.functionName, []);
    }
    examplesByFunction.get(example.functionName)?.push(example);
  }

  // Generate describe blocks for each function
  for (const [functionName, functionExamples] of examplesByFunction) {
    testContent += `describe('${functionName}', () => {\n`;

    for (const [index, example] of functionExamples.entries()) {
      // Use the example title if available, otherwise use a numbered format
      let testName: string;
      if (example.exampleTitle !== undefined && example.exampleTitle !== '') {
        testName = example.exampleTitle;
      } else if (functionExamples.length === 1) {
        testName = 'JSDoc example';
      } else {
        testName = `JSDoc example ${index + 1}`;
      }

      // Check if the example uses await and needs to be async
      const needsAsync = example.exampleCode.includes('await ');
      const asyncKeyword = needsAsync ? 'async ' : '';

      // Escape apostrophes in test names
      const escapedTestName = testName.replace(/'/gu, "\\'");
      testContent += `  test('${escapedTestName}', ${asyncKeyword}() => {\n`;

      // Remove import statements from example code as they're already at the top
      const codeWithoutImports = example.exampleCode
        .split('\n')
        .filter((line) => !line.trim().startsWith('import '))
        .join('\n');

      const indentedCode = codeWithoutImports
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n');

      testContent += indentedCode;
      testContent += '\n  });\n';

      if (index < functionExamples.length - 1) {
        testContent += '\n';
      }
    }

    testContent += '});\n';

    if (
      Array.from(examplesByFunction.keys()).indexOf(functionName) <
      examplesByFunction.size - 1
    ) {
      testContent += '\n';
    }
  }

  return testContent;
};

// Helper functions and utilities
const generateImportPath = (filePath: string, targetModule: string): string => {
  const relativePath = path.relative(
    path.dirname(filePath),
    path.dirname(targetModule),
  );
  const moduleFile = path.basename(targetModule);
  return relativePath.length > 0
    ? `${relativePath}/${moduleFile}`
    : `./${moduleFile}`;
};

await main();
