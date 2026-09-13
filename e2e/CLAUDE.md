# E2E Testing - AI Assistant Guidelines

このファイルは E2E テストディレクトリ専用の AI アシスタントガイドラインです。

## 🔧 E2E 開発ルール

### 必須実行フロー（E2E作業時）
**E2Eテスト関連の作業完了前に必ず実行：**

```bash
# 1. Linting (Biome使用)
pnpm run lint

# 2. TypeScript型チェック
pnpm exec tsc --noEmit

# 3. E2Eテスト実行
# playwright.config.ts の webServer が api/ui サーバーを自動起動するため、
# 通常は個別のサーバー起動は不要:
# pnpm -C api run db:seed:e2e  （初回・データリセット時）
# cd e2e && pnpm run test
```

### パッケージ管理
- **このディレクトリでは `pnpm` のみ使用**
- `npm` は使用しない

### Lint設定
- **メインツール**: Biome（TypeScript完全サポート）
- **設定ファイル**: `biome.json`
- ESLint は使用しない（Biome のみで完結）

## 📝 コーディング規約

### TypeScript
```typescript
// 良い例：適切な型定義
import { type Request, expect, test } from "@playwright/test";

let addItemRequest: Request | null = null;
let requestData: unknown = null;

// 悪い例：any型の使用
let addItemRequest: any = null;  // ❌
```

### テストファイル構造
```typescript
import { expect, test } from "@playwright/test";
import { TEST_USER_ID, TEST_DATA } from "./fixtures/test-data";

test.describe("Page Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/path/${TEST_USER_ID}`);
  });

  test("should do something", async ({ page }) => {
    // data-testid を使用
    await page.getByTestId("action-button").click();
    await expect(page.getByTestId("result")).toBeVisible();
  });
});
```

### data-testid 使用
```typescript
// 良い例：data-testid使用
await page.getByTestId("add-item-button").click();
await expect(page.getByTestId("modal")).toBeVisible();

// 悪い例：セレクター直接指定
await page.click("button");  // ❌
await page.click(".btn-add");  // ❌
```

## 🎯 テストデータ

### 固定値（変更禁止）
```typescript
TEST_USER_ID = 27      // テスト用ユーザー
TEST_PANTRY_ID = 9     // テスト用パントリー
```

これらは `api/prisma/seed-e2e.ts`（`pnpm -C api run db:seed:e2e`、冪等）が実データとして
用意する。テストデータを変更する場合はこの seed ファイルと両方更新すること。

### テストデータファイル
- `tests/fixtures/test-data.ts` でテストデータ管理
- 新しいテストデータが必要な場合はここに追加

## 🚀 よく使用するコマンド

### テスト実行
```bash
# 基本テスト
pnpm run test                 # 全テスト実行
pnpm run test:headed          # ブラウザ表示
pnpm run test:ui              # Playwright UI

# プロジェクト別（Mobile Chrome / Mobile Safari の2つのみ）
pnpm run test:mobile-chrome   # Mobile Chrome のみ
pnpm run test:mobile-safari   # Mobile Safari のみ

# 特定ファイル
make test-file FILE=tests/shopping-list.spec.ts
```

### Lint・フォーマット
```bash
pnpm run lint                 # チェックのみ
pnpm run lint:fix             # 自動修正
pnpm run lint:check           # CI用（エラー時終了）
```

### サーバー管理
```bash
pnpm run servers:start        # API・UIサーバー起動
pnpm run servers:stop         # サーバー停止
```

### セットアップ
```bash
pnpm run setup                # 全セットアップ
pnpm run setup:browsers       # Playwright ブラウザ
pnpm run clean                # クリーンアップ
```

## 📁 ファイル構造

```
e2e/
├── tests/
│   ├── fixtures/
│   │   └── test-data.ts      # テストデータ定義
│   ├── shopping-list.spec.ts # 買い物リストテスト
│   ├── dashboard.spec.ts     # ダッシュボードテスト
│   ├── navigation.spec.ts    # ナビゲーションテスト
│   ├── api-integration.spec.ts # API統合テスト
│   └── responsive.spec.ts    # レスポンシブテスト
├── playwright.config.ts      # Playwright設定
├── tsconfig.json            # TypeScript設定
├── biome.json              # Biome設定
├── package.json            # pnpm設定
├── Makefile                # よく使うコマンドのショートカット
└── README.md               # 詳細ドキュメント
```

## 🐛 よくある問題と解決策

### 1. TypeScriptエラー
```bash
# 確認
pnpm exec tsc --noEmit

# よくある問題：
# - Request型のimport漏れ
# - any型の使用
# - DOM型の不足
```

### 2. Lintエラー
```bash
# 自動修正
pnpm run lint:fix

# よくある問題：
# - import順序
# - クォーテーション（ダブル必須）
# - 未使用変数
```

### 3. テスト失敗
```bash
# サーバー起動確認（通常は playwright.config.ts の webServer が自動起動する）
pnpm -C ../api run start:dev &
pnpm -C ../ui run dev &

# ブラウザ表示でデバッグ
pnpm run test:headed

# よくある問題：
# - サーバー未起動
# - data-testid属性なし
# - 非同期処理の待機不足
```

### 4. 依存関係の問題
```bash
# 再インストール
pnpm install

# Playwrightブラウザ
pnpm exec playwright install
```

## 📋 チェックリスト

テスト作成・修正時のチェックリスト：

- [ ] `pnpm run lint` が成功する
- [ ] `pnpm exec tsc --noEmit` が成功する  
- [ ] data-testid を適切に使用している
- [ ] 適切な型定義（any型を避ける）
- [ ] テストデータは fixtures を使用
- [ ] 非同期処理の適切な待機
- [ ] エラーハンドリングの実装

---

**重要**: このディレクトリでは必ず `pnpm` を使用し、作業完了前に lint と TypeScript チェックを実行してください。