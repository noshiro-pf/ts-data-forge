#!/usr/bin/env node

import 'ts-repo-utils';

/**
 * Script to import test code from X.doc.test.mts files back to JSDoc @example blocks in X.mts files
 *
 * Processing flow:
 * 1. Search for all .doc.test.mts files
 * 2. Extract test function code blocks from each file
 * 3. Update JSDoc @example blocks in corresponding .mts files
 */

type TestBlock = Readonly<{
  testName: string;
  code: string;
}>;

/**
 * Extract test blocks from .doc.test.mts files
 */
function extractTestBlocks(content: string): TestBlock[] {
  const testBlocks: TestBlock[] = [];

  // Find describe blocks
  const describePattern =
    /describe\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*\(\)\s*=>\s*\{/gu;
  let describeMatch;

  while ((describeMatch = describePattern.exec(content)) !== null) {
    const functionName = describeMatch[1];
    const describeStart = describeMatch.index + describeMatch[0].length;

    // Find the end of this describe block
    const describeEnd = findClosingBrace(content, describeStart);
    if (describeEnd === -1) {
      continue;
    }

    // Extract content within this describe block only
    const describeContent = content.substring(describeStart, describeEnd);

    // Find tests within this describe block
    const testPattern =
      /test\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*\(\)\s*=>\s*\{/gu;
    let testMatch;

    while ((testMatch = testPattern.exec(describeContent)) !== null) {
      const testStart = testMatch.index + testMatch[0].length;
      const testName = testMatch[1];

      // Find the end position of test block (find matching closing brace)
      const testEnd = findClosingBrace(describeContent, testStart);

      if (testEnd !== -1) {
        // Extract test block content (adjust indentation)
        const testCode = describeContent.substring(testStart, testEnd);
        const cleanedCode = cleanTestCode(testCode);

        testBlocks.push({
          testName: `${functionName}:${testName}`,
          code: cleanedCode,
        });
      }
    }
  }

  return testBlocks;
}

/**
 * Find the matching closing brace
 */
function findClosingBrace(content: string, start: number): number {
  let braceCount = 1;
  let i = start;

  while (i < content.length && braceCount > 0) {
    if (content[i] === '{') {
      braceCount += 1;
    } else if (content[i] === '}') {
      braceCount -= 1;
    }
    i += 1;
  }

  return braceCount === 0 ? i - 1 : -1;
}

/**
 * Clean up test code (adjust indentation, etc.)
 */
function cleanTestCode(code: string): string {
  const lines = code.split('\n');

  // Remove empty lines at the beginning and end
  while (lines.length > 0 && lines[0] !== undefined && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0) {
    const lastLine = lines.at(-1);
    if (lastLine !== undefined && lastLine.trim() === '') {
      lines.pop();
    } else {
      break;
    }
  }

  if (lines.length === 0) return '';

  // Calculate minimum indentation
  const minIndent = lines
    .filter((line) => line.trim() !== '')
    .reduce((min, line) => {
      const match = /^(\s*)/u.exec(line);
      const indent = match?.[1] !== undefined ? match[1].length : 0;
      return Math.min(min, indent);
    }, Number.POSITIVE_INFINITY);

  // Adjust indentation
  return lines
    .map((line) => line.substring(Math.min(minIndent, line.length)))
    .join('\n');
}

/**
 * Update @example blocks in .mts files
 */
function updateExampleBlocks(
  content: string,
  testBlocks: readonly TestBlock[],
): string {
  // Group by function name and sort by JSDoc example number
  const testsByFunction = new Map<string, TestBlock[]>();

  for (const testBlock of testBlocks) {
    const [functionName, testName] = testBlock.testName.split(':');

    if (functionName === undefined || testName === undefined) {
      continue;
    }

    // Only process tests that are JSDoc examples
    if (!testName.startsWith('JSDoc example')) {
      continue;
    }

    if (!testsByFunction.has(functionName)) {
      testsByFunction.set(functionName, []);
    }

    const functionTests = testsByFunction.get(functionName);
    if (functionTests !== undefined) {
      functionTests.push(testBlock);
    }
  }

  let updatedContent = content;

  // Update @example blocks for each function
  for (const [functionName, tests] of testsByFunction) {
    // Sort tests by JSDoc example number
    tests.sort((a, b) => {
      const aMatch = /JSDoc example (\d+)/u.exec(a.testName);
      const bMatch = /JSDoc example (\d+)/u.exec(b.testName);
      const aNum = aMatch !== null ? Number.parseInt(aMatch[1] ?? '0', 10) : 0;
      const bNum = bMatch !== null ? Number.parseInt(bMatch[1] ?? '0', 10) : 0;
      return aNum - bNum;
    });

    // Find function declarations first
    const functionDeclarationPattern = new RegExp(
      `(?:export\\s+)?(?:const|function|class)\\s+${functionName}\\b`,
      'gu',
    );

    // Find all function declarations first
    const functionDeclarations = [];
    let declMatch;
    while (
      (declMatch = functionDeclarationPattern.exec(updatedContent)) !== null
    ) {
      functionDeclarations.push(declMatch);
    }

    // For each function declaration, find the preceding JSDoc comment
    const matches = [];
    for (const decl of functionDeclarations) {
      const declStart = decl.index;

      // Look backwards from the function declaration to find the nearest JSDoc comment
      const precedingText = updatedContent.substring(0, declStart);
      const jsDocPattern = /\/\*\*[\s\S]*?\*\//gu;

      let lastJsDocMatch = null;
      let jsDocMatch;

      while ((jsDocMatch = jsDocPattern.exec(precedingText)) !== null) {
        lastJsDocMatch = jsDocMatch;
      }

      if (lastJsDocMatch !== null) {
        // Check if the JSDoc comment is immediately followed by the function declaration
        const jsDocEnd = lastJsDocMatch.index + lastJsDocMatch[0].length;
        const textBetween = updatedContent.substring(jsDocEnd, declStart);

        // Allow only whitespace and single-line comments between JSDoc and function
        if (/^\s*(?:\/\/[^\n]*\n\s*)*$/u.test(textBetween)) {
          const fullMatch = updatedContent.substring(
            lastJsDocMatch.index,
            decl.index + decl[0].length,
          );
          matches.push({
            0: fullMatch,
            1: lastJsDocMatch[0],
            index: lastJsDocMatch.index,
          });
        }
      }
    }

    // Process matches in reverse order to maintain correct positions
    for (let i = matches.length - 1; i >= 0; i--) {
      const functionMatch = matches[i];
      const jsDocContent = functionMatch?.[1];

      if (jsDocContent === undefined) {
        continue;
      }

      // Remove existing @example blocks
      const cleanedJsDoc = jsDocContent.replace(
        /(\s*\*\s*@example[\s\S]*?)(?=\s*\*\s*@|\s*\*\/)/gu,
        '',
      );

      // Add new @example blocks
      const newExamples = tests
        .map((test) => {
          const codeLines = test.code
            .split('\n')
            .map((line) => ` * ${line}`)
            .join('\n');

          return [
            //
            ' * @example',
            ' * ```ts',
            codeLines,
            ' * ```',
          ].join('\n');
        })
        .join('\n *\n');

      // Insert @example before JSDoc end ("*/")
      const updatedJsDoc = cleanedJsDoc.replace(
        '*/',
        [
          //
          newExamples,
          ' *',
          ' */',
        ].join('\n'),
      );

      // Replace the JSDoc content
      updatedContent = updatedContent.replace(jsDocContent, updatedJsDoc);
    }
  }

  return updatedContent;
}

async function main(): Promise<void> {
  console.log(
    'Starting import of JSDoc examples from .doc.test.mts files...\n',
  );

  // Search for all .doc.test.mts files
  const docTestFiles = await glob('src/**/*.doc.test.mts', {
    cwd: process.cwd(),
  });

  for (const docTestFile of docTestFiles) {
    console.log(`Processing ${docTestFile}...`);

    // Generate corresponding .mts file path
    const sourceFile = docTestFile.replace('.doc.test.mts', '.mts');

    try {
      // Read files
      // eslint-disable-next-line no-await-in-loop
      const docTestContent = await fs.readFile(docTestFile, 'utf8');
      // eslint-disable-next-line no-await-in-loop
      const sourceContent = await fs.readFile(sourceFile, 'utf8');

      // Extract test blocks
      const testBlocks = extractTestBlocks(docTestContent);

      if (testBlocks.length === 0) {
        console.log(`  No test blocks found in ${docTestFile}`);
        continue;
      }

      console.log(`  Found ${testBlocks.length} test blocks`);

      // Update @example blocks
      const updatedContent = updateExampleBlocks(sourceContent, testBlocks);

      // Write back to file
      // eslint-disable-next-line no-await-in-loop
      await fs.writeFile(sourceFile, updatedContent);

      console.log(`  Updated ${sourceFile}`);
    } catch (error) {
      console.error(`  Error processing ${docTestFile}:`, error);
    }
  }

  await $('npm run fmt');

  console.log('\nImport completed!');
}

// Execute script
main().catch(console.error);
