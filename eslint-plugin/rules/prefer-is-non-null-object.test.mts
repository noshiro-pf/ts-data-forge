import parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import dedent from 'dedent';
import { preferIsNonNullObject } from './prefer-is-non-null-object.mjs';

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

describe('prefer-is-non-null-object', () => {
  tester.run('prefer-is-non-null-object', preferIsNonNullObject, {
    valid: [
      {
        name: 'ignores non-matching typeof checks',
        code: dedent`
          const u = {};
          const ok = typeof u === "object" && v !== null;
        `,
      },
    ],
    invalid: [
      {
        name: 'replaces typeof object check with isNonNullObject import',
        code: dedent`
          const u = {};
          const ok = typeof u === "object" && u !== null;
        `,
        output: dedent`
          import { isNonNullObject } from 'ts-data-forge';

          const u = {};
          const ok = isNonNullObject(u);
        `,
        errors: [{ messageId: 'useIsNonNullObject' }],
      },
      {
        name: 'keeps existing isNonNullObject import',
        code: dedent`
          import { isNonNullObject } from 'ts-data-forge';

          const ok = typeof u === "object" && u !== null;
        `,
        output: dedent`
          import { isNonNullObject } from 'ts-data-forge';

          const ok = isNonNullObject(u);
        `,
        errors: [{ messageId: 'useIsNonNullObject' }],
      },
      {
        name: 'adds missing isNonNullObject to existing ts-data-forge import',
        code: dedent`
          import { asInt } from 'ts-data-forge';

          const ok = typeof u === "object" && u !== null;
        `,
        output: dedent`
          import { asInt, isNonNullObject } from 'ts-data-forge';

          const ok = isNonNullObject(u);
        `,
        errors: [{ messageId: 'useIsNonNullObject' }],
      },
    ],
  });
}, 20000);
