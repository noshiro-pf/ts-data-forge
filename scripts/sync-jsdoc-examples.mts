#!/usr/bin/env tsx

import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * JSDocの@exampleブロックを*.example.test.mtsファイルの内容で同期するスクリプト
 */

type ExampleTest = Readonly<{
  testName: string;
  code: string;
}>;

/**
 * example.test.mtsファイルからテストコードを抽出する
 */
const parseExampleTestFile = (filePath: string): readonly ExampleTest[] => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tests: ExampleTest[] = [];

  // test関数を抽出（ネストした括弧に対応）
  const testMatches = content.matchAll(
    /test\s*\(\s*['"`]([^'"`]*)['"`]\s*,\s*(?:async\s+)?\(\s*\)\s*=>\s*\{/gu,
  );

  let index = 0;
  for (const match of testMatches) {
    const testName = match[1];
    const startPos = match.index + match[0].length;

    // 対応する閉じ括弧を見つける
    let braceCount = 1;
    let endPos = startPos;

    while (braceCount > 0 && endPos < content.length) {
      const char = content[endPos];
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;
      endPos++;
    }

    if (braceCount === 0) {
      const testBody = content.slice(startPos, endPos - 1);

      // インデントを調整
      const lines = testBody.split('\n');
      const nonEmptyLines = lines.filter((line) => line.trim() !== '');

      if (nonEmptyLines.length > 0) {
        const firstLineIndent = nonEmptyLines[0].match(/^\s*/)?.[0] || '';
        const indentLength = firstLineIndent.length;

        const adjustedLines = lines.map((line) => {
          if (line.trim() === '') return '';
          const currentIndent = /^\s*/.exec(line)?.[0] || '';
          return currentIndent.length >= indentLength
            ? line.slice(indentLength)
            : line;
        });

        const code = adjustedLines.join('\n').trim();

        tests.push({
          testName,
          code,
        });
      }
    }

    index++;
  }

  return tests;
};

/**
 * JSDocの@exampleブロックを更新する
 */
const updateJSDocExamples = (
  sourceFilePath: string,
  exampleTests: ExampleTest[],
): void => {
  let content = fs.readFileSync(sourceFilePath, 'utf-8');

  // 各テストに対応する@exampleブロックを探して更新
  for (const test of exampleTests) {
    // テスト名から対応する関数名を推測
    let functionName = '';

    // パターンマッチングで関数名を抽出
    if (test.testName.includes('.')) {
      // "Optional.some example" -> "some"
      functionName = test.testName.replace(/.*\.(\w+).*/, '$1');
    } else {
      // "createPromise example" -> "createPromise"
      functionName = test.testName.replace(/(\w+).*/, '$1');
    }

    // export const {functionName} または export function {functionName} の直前にある@exampleブロックを探す
    const exportPattern = new RegExp(
      `(.*@example\\s*\\n\\s*\`\`\`typescript\\s*\\n)([\\s\\S]*?)(\\n\\s*\`\`\`[\\s\\S]*?\\*/\\s*\\n\\s*(?:export\\s+(?:const|function)\\s+${functionName}\\s|export\\s+{[^}]*${functionName}[^}]*}))`,
      'gm',
    );

    let wasUpdated = false;
    const newContent = content.replace(
      exportPattern,
      (match, before, oldCode, after) => {
        // 新しいコードをJSDoc形式にフォーマット
        const formattedCode = test.code
          .split('\n')
          .map((line) => (line === '' ? ' *' : ` * ${line}`))
          .join('\n');

        wasUpdated = true;
        return `${before}${formattedCode}${after}`;
      },
    );

    if (wasUpdated) {
      content = newContent;
      console.log(
        `Updated @example for ${functionName} in ${path.relative(process.cwd(), sourceFilePath)}`,
      );
    } else {
      console.warn(
        `Could not find @example block for ${functionName} in ${path.relative(process.cwd(), sourceFilePath)}`,
      );
    }
  }

  fs.writeFileSync(sourceFilePath, content, 'utf-8');
};

/**
 * ファイルをグロブパターンで検索する（glob依存を避けるため）
 */
const findFiles = (dir: string, pattern: string): string[] => {
  const files: string[] = [];

  const traverse = (currentDir: string): void => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(pattern)) {
        files.push(fullPath);
      }
    }
  };

  traverse(dir);
  return files;
};

/**
 * メイン処理
 */
const main = async (): Promise<void> => {
  try {
    const srcDir = path.join(process.cwd(), 'src');

    // src配下の*.example.test.mtsファイルを探す
    const exampleTestFiles = findFiles(srcDir, '.example.test.mts');

    console.log(`Found ${exampleTestFiles.length} example test files`);

    for (const testFilePath of exampleTestFiles) {
      // 対応するソースファイルパスを生成
      const sourceFilePath = testFilePath.replace('.example.test.mts', '.mts');

      if (!fs.existsSync(sourceFilePath)) {
        console.warn(`Source file not found: ${sourceFilePath}`);
        continue;
      }

      console.log(`Processing: ${path.relative(process.cwd(), testFilePath)}`);

      // テストファイルからコードを抽出
      const exampleTests = parseExampleTestFile(testFilePath);

      if (exampleTests.length === 0) {
        console.warn(`No tests found in ${testFilePath}`);
        continue;
      }

      // ソースファイルのJSDocを更新
      updateJSDocExamples(sourceFilePath, exampleTests);
    }

    console.log('JSDoc examples synchronization completed!');
  } catch (error) {
    console.error('Error during synchronization:', error);
    process.exit(1);
  }
};

// スクリプトとして実行された場合
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main, parseExampleTestFile, updateJSDocExamples };
