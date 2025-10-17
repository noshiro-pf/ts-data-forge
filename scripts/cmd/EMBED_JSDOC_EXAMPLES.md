# JSDoc Example Embedding Script

このスクリプトは、`samples/src` 配下のサンプルコードを `src` 配下のソースコードのJSDoc内の `@example` ブロックに埋め込みます。

## 使い方

### 1. ソースファイルのJSDocを準備

JSDoc内で、`@see` リンクを `@example` ブロックに置き換えます。

**変更前:**
```typescript
/**
 * Function description...
 *
 * @param x Parameter description
 * @returns Return value description
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/at-example.mts|Sample code}.
 */
```

**変更後:**
```typescript
/**
 * Function description...
 *
 * @param x Parameter description
 * @returns Return value description
 * @example
 *
 * ```ts
 * ```
 *
 * @see {@link someOtherFunction} for related functionality
 */
```

### 2. マッピング定義を追加

`scripts/cmd/embed-jsdoc-examples.mts` の `sourceFileMappings` に、ソースファイルとサンプルファイルのマッピングを追加します。サンプルファイルは、ソースファイル内で **上から順番に** 並べてください。

```typescript
const sourceFileMappings: readonly SourceFileMapping[] = [
  {
    sourcePath: 'src/array/array-utils.mts',
    sampleFiles: [
      'samples/src/array/array-utils/at-example.mts',
      'samples/src/array/array-utils/head-example.mts',
      // ... 他のサンプルファイルを順番に追加
    ],
  },
  // 他のソースファイルのマッピング
];
```

### 3. スクリプトを実行

```bash
npm run doc:embed-jsdoc
```

または直接実行:

```bash
npx tsx scripts/cmd/embed-jsdoc-examples.mts
```

## 動作の仕組み

1. スクリプトは `sourceFileMappings` で定義された各ソースファイルを読み込みます
2. 各サンプルファイルに対して:
   - サンプルファイルの内容を読み込み、ignoreキーワードで囲まれた部分を除外します
   - ソースファイル内の次の ` ```ts ` コードブロックを検索します
   - コードブロックの内容をサンプルコードで置き換えます（適切にインデント）
3. 変更されたファイルをPrettierでフォーマットします

## サンプルコードのフォーマット

サンプルファイル内で、以下のキーワードを使用して埋め込み範囲を制御できます：

- `// embed-sample-code-ignore-above`: この行より上のコードは埋め込まれません
- `// embed-sample-code-ignore-below`: この行より下のコードは埋め込まれません
- `IGNORE_EMBEDDING(...)`: この行全体が除外されます

**例:**
```typescript
// embed-sample-code-ignore-above
import { Arr } from 'ts-data-forge';

const result = Arr.at([1, 2, 3], 1);
// embed-sample-code-ignore-below

// このコメントは埋め込まれません
```

## 注意事項

- サンプルファイルの順番は、ソースファイル内の `@example` ブロックの出現順序と一致させる必要があります
- コードブロックの数とサンプルファイルの数が一致しない場合、エラーが発生します
- 既存のコードブロック内容は完全に上書きされます
