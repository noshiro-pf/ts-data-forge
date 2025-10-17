import { formatFiles } from 'ts-repo-utils';
import { projectRootPath } from '../project-root-path.mjs';

const codeBlockStart = '```ts';
const codeBlockEnd = '```';

const ignoreAboveKeyword = '// embed-sample-code-ignore-above';
const ignoreBelowKeyword = '// embed-sample-code-ignore-below';

type SourceFileMapping = Readonly<{
  sourcePath: string;
  sampleFiles: readonly string[];
}>;

/**
 * Mapping from source files to their sample code files.
 * Sample files should be listed in the order they appear in the source file's JSDoc.
 *
 * HOW TO USE:
 * 1. In the source file JSDoc, replace @see links to sample files with @example blocks:
 *    Before: @see {@link https://github.com/.../at-example.mts|Sample code}.
 *    After:  @example
 *            ```ts
 *            ```
 *
 * 2. Add the source file path and its sample files to this mapping in the order
 *    they appear in the source file (top to bottom).
 *
 * 3. Run: npm run doc:embed-jsdoc (or npx tsx scripts/cmd/embed-jsdoc-examples.mts)
 *
 * The script will replace each ```ts block sequentially with the corresponding sample code.
 */
const sourceFileMappings: readonly SourceFileMapping[] = [
  {
    sourcePath: 'src/array/array-utils.mts',
    sampleFiles: [
      // Add sample files in the order they appear in the source file
      // Example:
      'samples/src/array/array-utils/at-example.mts',
      // Add more sample files here as you convert @see links to @example blocks
    ],
  },
] as const;

/**
 * Embeds sample code from samples/src into JSDoc @example code blocks in src files.
 * Replaces code blocks sequentially in the order defined in sourceFileMappings.
 */
export const embedJsDocExamples = async (): Promise<
  Result<undefined, unknown>
> => {
  try {
    const mut_modifiedFiles: string[] = [];

    for (const { sourcePath, sampleFiles } of sourceFileMappings) {
      const sourceFilePath = path.resolve(projectRootPath, sourcePath);
      const sourceContent = await fs.readFile(sourceFilePath, 'utf8');

      const mut_results: string[] = [];
      let mut_rest: string = sourceContent;

      for (const sampleFile of sampleFiles) {
        const samplePath = path.resolve(projectRootPath, sampleFile);

        // Read sample content
        const sampleContent = await fs.readFile(samplePath, 'utf8');
        const sampleContentSliced = extractSampleCode(sampleContent);

        // Find next code block
        const codeBlockStartIndex = mut_rest.indexOf(codeBlockStart);

        if (codeBlockStartIndex === -1) {
          return Result.err(
            `❌ Code block start not found for ${sampleFile} in ${sourcePath}`,
          );
        }

        const codeBlockEndIndex = mut_rest.indexOf(
          codeBlockEnd,
          codeBlockStartIndex + codeBlockStart.length,
        );

        if (codeBlockEndIndex === -1) {
          return Result.err(
            `❌ Code block end not found for ${sampleFile} in ${sourcePath}`,
          );
        }

        // Replace the code block content
        const beforeBlock = mut_rest.slice(
          0,
          Math.max(0, codeBlockStartIndex + codeBlockStart.length),
        );
        const afterBlock = mut_rest.slice(Math.max(0, codeBlockEndIndex));

        // Indent the sample code to match JSDoc style (3 spaces + ' * ')
        const indentedSampleCode = sampleContentSliced
          .split('\n')
          .map((line) => (line.trim() === '' ? '   *' : `   * ${line}`))
          .join('\n');

        mut_results.push(beforeBlock, '\n', indentedSampleCode, '\n   * ');

        mut_rest = afterBlock;

        console.log(
          `✓ Updated code block for ${sampleFile} in ${path.relative(projectRootPath, sourceFilePath)}`,
        );
      }

      mut_results.push(mut_rest);

      // Write updated source file
      const updatedContent = mut_results.join('');
      await fs.writeFile(sourceFilePath, updatedContent, 'utf8');
      mut_modifiedFiles.push(sourceFilePath);
    }

    if (mut_modifiedFiles.length > 0) {
      console.log(`\nFormatting ${mut_modifiedFiles.length} modified files...`);
      await formatFiles(mut_modifiedFiles);
      console.log('✓ Formatting completed');
    }

    return Result.ok(undefined);
  } catch (error) {
    return Result.err(`❌ Failed to embed JSDoc examples: ${String(error)}`);
  }
};

/**
 * Extracts the relevant sample code, removing ignore markers
 */
const extractSampleCode = (content: string): string => {
  const startIndex = content.indexOf(ignoreAboveKeyword);
  const endIndex = content.indexOf(ignoreBelowKeyword);

  const start = startIndex === -1 ? 0 : startIndex + ignoreAboveKeyword.length;
  const end = endIndex === -1 ? content.length : endIndex;

  return content
    .slice(start, end)
    .replaceAll(/IGNORE_EMBEDDING\(.*\);\n/gu, '')
    .trim();
};

if (isDirectlyExecuted(import.meta.url)) {
  const result = await embedJsDocExamples();
  if (Result.isErr(result)) {
    console.error(result.value);
    process.exit(1);
  }
}
