import parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import dedent from 'dedent';
import { preferAsInt } from './prefer-as-int.mjs';

const tester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
      tsconfigRootDir: `${import.meta.dirname}/../..`,
    },
  },
});

describe('prefer-as-int', () => {
  tester.run('prefer-as-int', preferAsInt, {
    valid: [
      {
        name: 'ignores non-Int assertions',
        code: dedent`
          const value = 1;
          const result = value as number;
        `,
      },
    ],
    invalid: [
      {
        name: 'replaces as Int with asInt import',
        code: dedent`
          const value = 1;
          const result = value as Int;
        `,
        output: dedent`
          import { asInt } from 'ts-data-forge';

          const value = 1;
          const result = asInt(value);
        `,
        errors: [{ messageId: 'useAsInt' }],
      },
      {
        name: 'keeps existing asInt import',
        code: dedent`
          import { asInt } from 'ts-data-forge';

          const value = 1;
          const result = value as Int;
        `,
        output: dedent`
          import { asInt } from 'ts-data-forge';

          const value = 1;
          const result = asInt(value);
        `,
        errors: [{ messageId: 'useAsInt' }],
      },
      {
        name: 'adds missing asInt to existing ts-data-forge import',
        code: dedent`
          import { isNonNullObject } from 'ts-data-forge';

          const value = 1;
          const result = value as Int;
        `,
        output: dedent`
          import { isNonNullObject, asInt } from 'ts-data-forge';

          const value = 1;
          const result = asInt(value);
        `,
        errors: [{ messageId: 'useAsInt' }],
      },
    ],
  });
}, 20000);
