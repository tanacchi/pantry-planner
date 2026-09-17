# Pantry Planner E2E Tests

このディレクトリには、Pantry PlannerアプリケーションのEnd-to-End (E2E) テストが含まれています。

## 🚀 セットアップ

### 前提条件

- Node.js (v18以上)
- pnpm（api / ui / e2e すべて pnpm-lock.yaml で管理されている）
- PostgreSQL（`docker compose up -d db`。ルートの `.env` を `.env.example` から作成しておく）
- `api/.env`・`ui/.env` を各ディレクトリの `.env.example` から作成しておく

### インストール

```bash
# E2Eテストの依存関係をインストール
make install

# または
pnpm install
pnpm exec playwright install

# ローカル環境のセットアップ（依存関係 + ブラウザ + DB スキーマ・E2E 用データ投入）
make setup
```

## 🧪 テスト実行

### 基本的なテスト実行

```bash
# すべてのテストを実行
make test

# ブラウザを表示してテスト実行
make test-headed

# Playwright UIでテスト実行
make test-ui

# デバッグモードでテスト実行
make test-debug
```

### Lint実行

```bash
# Lintチェック実行
make lint
# または
pnpm run lint

# Lint自動修正
make lint-fix  
# または
pnpm run lint:fix

# Biome（推奨）のみ実行
pnpm run lint:biome
```

### 特定のテストファイルを実行

```bash
# 特定のテストファイルを実行
make test-file FILE=tests/shopping-list.spec.ts
make test-file FILE=tests/dashboard.spec.ts
make test-file FILE=tests/navigation.spec.ts
```

### プロジェクト別実行

`playwright.config.ts` の projects は `Mobile Chrome`（Pixel 5）と `Mobile Safari`（iPhone 12）の 2 つ。
iPhone SE 相当の画面サイズは `responsive.spec.ts` の viewport ループで別途カバーしている。

```bash
# モバイルChromeでのみテスト実行
make test-mobile-chrome

# モバイルSafari（WebKit）でのみテスト実行
make test-mobile-safari
```

### 特定のファイルを実行

```bash
make test-file FILE=tests/shopping-list.spec.ts
```

## 📁 テストファイル構成

```
e2e/
├── tests/
│   ├── fixtures/
│   │   └── test-data.ts          # テストデータ定義
│   ├── shopping-list.spec.ts     # 買い物リストページのテスト
│   ├── dashboard.spec.ts         # ダッシュボードページのテスト
│   ├── navigation.spec.ts        # ナビゲーションテスト
│   ├── api-integration.spec.ts   # APIインテグレーションテスト
│   └── responsive.spec.ts        # レスポンシブデザインテスト
├── playwright.config.ts          # Playwright設定
├── package.json
├── Makefile
└── README.md
```

## 🎯 テスト対象

### 1. 買い物リストページ (`shopping-list.spec.ts`)

- ページの基本表示
- 検索機能
- アイテムの追加/削除
- モーダルの表示/非表示
- フォームバリデーション
- エンプティステート

### 2. ダッシュボードページ (`dashboard.spec.ts`)

- ページの基本表示
- パントリーアイテムの追加/削除
- 検索機能
- フォーム操作
- 賞味期限の設定

### 3. ナビゲーション (`navigation.spec.ts`)

- ページ間の遷移
- URL直接アクセス
- ブラウザの戻る/進む
- クエリパラメータの保持
- エラーハンドリング

### 4. APIインテグレーション (`api-integration.spec.ts`)

- APIリクエストの送信
- レスポンス処理
- エラーハンドリング
- 同期処理
- リクエストデータの検証

### 5. レスポンシブデザイン (`responsive.spec.ts`)

- 複数デバイスサイズでの表示
- タッチ操作
- スクロール動作
- モーダル表示
- フォーム操作

## 🏷️ data-testid

すべてのテスト対象要素には `data-testid` 属性が設定されています。

### 買い物リストページ

- `shopping-list-page`: ページ全体
- `header`: ヘッダー
- `page-title`: ページタイトル
- `search-form`: 検索フォーム
- `search-input`: 検索入力
- `search-button`: 検索ボタン
- `shopping-items-list`: アイテムリスト
- `shopping-item-{id}`: 個別アイテム
- `item-name-{id}`: アイテム名
- `item-category-{id}`: アイテムカテゴリ
- `delete-button-{id}`: 削除ボタン
- `add-item-button`: 追加ボタン
- `add-item-modal`: 追加モーダル
- `name-input`: 名前入力
- `category-select`: カテゴリ選択
- `submit-button`: 送信ボタン
- `cancel-button`: キャンセルボタン

### ダッシュボードページ

- `dashboard-page`: ページ全体
- `pantry-items-list`: パントリーアイテムリスト
- `pantry-item-{id}`: 個別パントリーアイテム
- `add-pantry-item-button`: 追加ボタン
- `add-pantry-item-modal`: 追加モーダル
- `quantity-input`: 数量入力
- `unit-input`: 単位入力
- `expires-input`: 賞味期限入力

## 🔧 設定

### Lint設定

#### Biome（推奨）
- **設定ファイル**: `biome.json`
- **ルール**: Biome recommended
- **フォーマット**: ダブルクォート、スペース2個、行幅100
- **機能**: Linting + Formatting + Import組織化 + TypeScript完全サポート
- **対象**: `**/*.ts`, `**/*.js`
- **除外**: `node_modules/`, `playwright-report/`, `test-results/`, `*.config.js`

Lint は Biome のみで完結しており、ESLint は使用していない。

### 環境変数

テスト実行時に以下の環境変数を設定できます：

- `CI`: CI環境での実行フラグ
- `API_HOST`: UI サーバーが使う API のベース URL (デフォルト: http://localhost:8000)。`playwright.config.ts` の `webServer` が UI サーバー起動時にこの値を渡す
- `UI_HOST`: Playwright がテスト対象にする UI の URL (デフォルト: http://localhost:5173)

### テストデータ

テスト用の固定データは `tests/fixtures/test-data.ts` で定義されています：

- `TEST_USER_ID`: テスト用ユーザーID (27)
- `TEST_PANTRY_ID`: テスト用パントリーID (9)

これらは実データとして存在している必要があります。テスト実行前に一度だけ、または
データをリセットしたい場合に以下を実行してください（`api/prisma/seed-e2e.ts`。冪等）。

```bash
pnpm -C ../api run db:seed:e2e
```

## 📊 レポート

テスト結果は以下の方法で確認できます：

```bash
# HTML レポートを表示
make report

# または
pnpm exec playwright show-report
```

## 🐛 トラブルシューティング

### サーバーが起動していない

`pnpm run test` 自体が `playwright.config.ts` の `webServer` 経由で API・UI サーバーを自動起動するため、通常は個別起動が不要です。手動で確認したい場合は:

```bash
# APIとUIサーバーを起動
make servers-start

# 手動でサーバーを起動
pnpm -C ../api run start:dev &
pnpm -C ../ui run dev &
```

### Playwrightブラウザがインストールされていない

```bash
pnpm exec playwright install
```

### テストが失敗する

1. サーバーが正常に起動しているか確認
2. テストデータが正しく設定されているか確認
3. `--headed` モードで実行して動作を確認

```bash
make test-headed
```

## 🚀 CI/CD

GitHub Actions での自動テスト実行はまだ導入されていません（[#29](https://github.com/tanacchi/pantry-planner/issues/29) で導入予定）。現時点では手元で `pnpm run test` を実行して確認してください。

## 📝 ベストプラクティス

### テストの書き方

1. **明確なテスト名**: テストの目的が分かる名前を付ける
2. **独立性**: テスト間で依存関係を作らない
3. **データクリーンアップ**: テスト後のデータ削除（必要に応じて）
4. **適切な待機**: `waitForLoadState` や `expect` を使用
5. **エラーハンドリング**: 例外ケースもテストする

### data-testidの命名規則

- ページ全体: `{page-name}-page`
- セクション: `{section-name}`
- フォーム: `{action}-form`
- ボタン: `{action}-button`
- 入力: `{field-name}-input`
- リスト項目: `{item-type}-{id}`

### メンテナンス

1. **定期的な実行**: CI/CDでの自動実行
2. **テストデータ更新**: APIの変更に合わせてテストデータを更新
3. **セレクタ更新**: UI変更時のdata-testid更新
4. **パフォーマンス監視**: テスト実行時間の監視