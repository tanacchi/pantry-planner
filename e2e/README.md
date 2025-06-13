# Pantry Planner E2E Tests

このディレクトリには、Pantry PlannerアプリケーションのEnd-to-End (E2E) テストが含まれています。

## 🚀 セットアップ

### 前提条件

- Node.js (v18以上)
- npm
- APIサーバーとUIサーバーが起動していること

### インストール

```bash
# E2Eテストの依存関係をインストール
make install

# または
npm ci
npx playwright install --with-deps

# ローカル環境のセットアップ
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

```bash
# Chromiumでのみテスト実行
make test-project PROJECT=chromium

# Webkitでのみテスト実行
make test-project PROJECT=webkit

# モバイルChromeでのみテスト実行
make test-project PROJECT="Mobile Chrome"
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

#### ESLint（Basic JS用）
- **設定ファイル**: `.eslintrc.js`
- **ルール**: ESLint recommended（基本的なルールのみ）
- **クォーテーション**: ダブルクォート強制
- **対象**: `**/*.js`（TypeScriptはBiomeが処理）
- **除外**: `node_modules/`, `playwright-report/`, `test-results/`, `*.config.ts`

### 環境変数

テスト実行時に以下の環境変数を設定できます：

- `CI`: CI環境での実行フラグ
- `API_HOST`: APIサーバーのURL (デフォルト: http://localhost:8000)
- `UI_HOST`: UIサーバーのURL (デフォルト: http://localhost:5173)

### テストデータ

テスト用の固定データは `tests/fixtures/test-data.ts` で定義されています：

- `TEST_USER_ID`: テスト用ユーザーID (27)
- `TEST_PANTRY_ID`: テスト用パントリーID (9)

## 📊 レポート

テスト結果は以下の方法で確認できます：

```bash
# HTML レポートを表示
make report

# または
npx playwright show-report
```

## 🐛 トラブルシューティング

### サーバーが起動していない

```bash
# APIとUIサーバーを起動
make start-servers

# 手動でサーバーを起動
cd ../api && npm run start:dev &
cd ../ui && npm run dev &
```

### Playwrightブラウザがインストールされていない

```bash
npx playwright install --with-deps
```

### テストが失敗する

1. サーバーが正常に起動しているか確認
2. テストデータが正しく設定されているか確認
3. `--headed` モードで実行して動作を確認

```bash
make test-headed
```

## 🚀 CI/CD

GitHub Actionsでの自動テスト実行設定は `.github/workflows/e2e.yml` に定義されています。

### 実行条件

- `main` および `develop` ブランチへのpush
- `main` ブランチへのプルリクエスト

### テストマトリックス

- Chromium
- WebKit
- Mobile Chrome

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