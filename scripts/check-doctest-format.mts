#!/usr/bin/env node

import 'ts-repo-utils';
import { projectRootPath } from './project-root-path.mjs';

const main = async (): Promise<void> => {
  const srcDir = 'src';
  console.log(`🔍 Checking doctest format in ${srcDir}/ directory...\n`);

  const files = await glob(`${path.resolve(projectRootPath, srcDir)}/**/*.mts`);
  let totalIssues = 0;
  const fileIssues = new Map<string, readonly DoctestIssue[]>();

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const issues = await checkFile(file);
    if (issues.length > 0) {
      fileIssues.set(file, issues);
      totalIssues += issues.length;
    }
  }

  if (totalIssues === 0) {
    console.log('✅ All files pass doctest format checks!');
    console.log(`📊 Checked ${files.length} .mts files`);
    process.exit(0);
  } else {
    console.log(
      `❌ Found ${totalIssues} doctest format issues in ${fileIssues.size} files:\n`,
    );

    for (const [file, issues] of fileIssues) {
      console.log(`📄 ${file}:`);
      for (const issue of issues) {
        console.log(`  Line ${issue.line}: ${issue.message}`);
        console.log(`    ${issue.content}`);
      }
      console.log('');
    }

    console.log('🔧 To fix these issues:');
    console.log('  1. Replace ```typescript with ```ts @import.meta.vitest');
    console.log('  2. Replace ```ts with ```ts @import.meta.vitest');

    process.exit(1);
  }
};

/**
 * Represents an issue found in doctest format checking
 */
type DoctestIssue = Readonly<{
  type: 'legacy-typescript' | 'missing-vitest';
  line: number;
  content: string;
  message: string;
}>;

/**
 * Check code block formats in a file
 */
const checkFile = async (
  filePath: string,
): Promise<readonly DoctestIssue[]> => {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues: DoctestIssue[] = [];

  for (const [i, line] of lines.entries()) {
    const lineNumber = i + 1;

    // Check for ```typescript blocks (should not exist)
    if (line.includes('```typescript')) {
      issues.push({
        type: 'legacy-typescript',
        line: lineNumber,
        content: line.trim(),
        message:
          'Found legacy ```typescript block, should be ```ts @import.meta.vitest',
      });
    }

    // Check for ```ts blocks that are not followed by @import.meta.vitest
    if (line.includes('```ts') && !line.endsWith('@import.meta.vitest')) {
      issues.push({
        type: 'missing-vitest',
        line: lineNumber,
        content: line.trim(),
        message: 'Found ```ts block without @import.meta.vitest annotation',
      });
    }
  }

  return issues;
};

await main();
