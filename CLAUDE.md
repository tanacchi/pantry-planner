# Pantry Planner - AI Assistant Guidelines

このファイルは Claude Code や GitHub Copilot などの AI アシスタントに対するプロジェクト固有のガイドラインです。

## 📋 プロジェクト概要

Pantry Planner は食材管理・買い物リスト作成アプリケーションです。

### 技術スタック
- **API**: NestJS + Prisma + PostgreSQL
- **UI**: Remix + React + Tailwind CSS
- **E2E**: Playwright + TypeScript

## 🔧 開発ルール

### 必須実行フロー
**コード修正やタスク完了前に以下を必ず実行して、壊れないことを確認してください：**

```bash
# 1. API ディレクトリでの確認
cd api
npm run lint        # API linting
npm run test        # Unit tests
npm run build       # Build check

# 2. UI ディレクトリでの確認  
cd ui
npm run lint        # UI linting
npm run typecheck   # TypeScript check
npm run build       # Build check

# 3. E2E ディレクトリでの確認
cd e2e
pnpm run lint       # E2E linting (Biome)
npx tsc --noEmit    # TypeScript check
pnpm run test       # E2E tests (optional, サーバー起動が必要)
```

### パッケージ管理
- **API**: `npm` を使用
- **UI**: `npm` を使用  
- **E2E**: `pnpm` を使用

### コーディング規約

#### 全体共通
- **クォーテーション**: ダブルクォート (`"`) を使用
- **インデント**: スペース2個
- **行幅**: 100文字

#### TypeScript
- 厳密な型定義を使用
- `any` 型の使用を避ける
- 適切な型アノテーションを記述

#### React/Remix (UI)
- 関数コンポーネントを使用
- TypeScript strict mode
- data-testid 属性を必ず追加（E2Eテスト用）

#### E2E テスト
- **メインツール**: Biome（linting + formatting）
- **補助ツール**: ESLint（基本的なJS用のみ）
- 全ての操作要素に `data-testid` 属性が必要

## 📁 ディレクトリ構造

```
pantry-planner/
├── api/                 # NestJS API
│   ├── src/
│   ├── prisma/
│   └── package.json     # npm
├── ui/                  # Remix UI
│   ├── app/
│   └── package.json     # npm
├── e2e/                 # Playwright E2E
│   ├── tests/
│   └── package.json     # pnpm
└── CLAUDE.md           # このファイル
```

## 🎯 data-testid 命名規則

E2Eテストのため、全てのインタラクティブ要素に data-testid を追加：

### 基本パターン
- **ページ全体**: `{page-name}-page`
- **フォーム**: `{action}-form`
- **ボタン**: `{action}-button`
- **入力フィールド**: `{field-name}-input`
- **リスト項目**: `{item-type}-{id}`

### 具体例
```tsx
// 良い例
<button data-testid="add-item-button">追加</button>
<input data-testid="name-input" />
<div data-testid="shopping-item-123">...</div>

// 悪い例（data-testid なし）
<button>追加</button>
<input />
```

## 🚀 よく使用するコマンド

### 開発サーバー起動
```bash
# API サーバー (port 8000)
cd api && npm run start:dev

# UI サーバー (port 5173)  
cd ui && npm run dev

# E2E テスト用セットアップ
cd e2e && pnpm run dev
```

### データベース操作
```bash
cd api
npm run prisma:migrate:dev    # マイグレーション
npm run prisma:seed           # シードデータ投入
npm run prisma:studio         # Prisma Studio起動
```

### テスト実行
```bash
# E2E テスト
cd e2e
pnpm run test                 # 全テスト
pnpm run test:headed          # ブラウザ表示
pnpm run test:ui              # Playwright UI
```

## 📝 重要な注意事項

### 1. 破壊的変更の防止
- **必ず** lint, test, build を実行してから変更を完了する
- TypeScript エラーは0個にする
- E2Eテストが通ることを確認

### 2. モバイルファースト
- UI はモバイルファーストで設計
- レスポンシブデザイン必須
- タッチ操作に最適化

### 3. テストデータ
- `TEST_USER_ID = 27`
- `TEST_PANTRY_ID = 9`
- テストデータは `e2e/tests/fixtures/test-data.ts` で管理

### 4. API エンドポイント
- ベースURL: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/api`
- UI: `http://localhost:5173`

### 5. lint 設定
- **E2E**: Biome（推奨、TypeScript完全サポート）
- **API/UI**: ESLint + Prettier
- 全てダブルクォート統一

## 🐛 トラブルシューティング

### よくある問題
1. **TypeScript エラー**: `npx tsc --noEmit` で確認
2. **lint エラー**: 該当ディレクトリで `npm run lint:fix` または `pnpm run lint:fix`
3. **E2E テスト失敗**: サーバーが起動しているか確認
4. **データベース接続エラー**: `npm run prisma:migrate:dev` 実行

### ヘルプコマンド
```bash
# E2E Makefile のヘルプ
cd e2e && make help

# 依存関係の再インストール
npm ci                        # API, UI
pnpm install                  # E2E
```

---

**重要**: このガイドラインに従い、常に品質と安定性を保ちながら開発を進めてください。変更前後で必ずテストを実行し、破壊的変更を防止してください。