# Pantry Planner - AI Assistant Guidelines

以下のガイドに厳密に従うこと。

## 📋 プロジェクト概要

Pantry Planner は食材管理・買い物リスト作成アプリケーションです。

### 技術スタック
- **API**: NestJS + Prisma + PostgreSQL
- **UI**: Remix + React + Tailwind CSS
- **E2E**: Playwright + TypeScript

## 🔧 開発ルール

### 必須実行フロー
**コード修正やタスク完了前に以下を必ず実行して、壊れないことを確認してください：**
プロジェクトのルートにて以下を実行
```bash
./.husky/_/pre-commit && ./.husky/_/post-commit
```

### パッケージ管理

- **全プロジェクト**: `pnpm` ワークスペースで統一管理
- **API/UI/E2E/MCP**: 全て `pnpm` 使用

### コーディング規約

#### 全体共通
- **クォーテーション**: ダブルクォート (`"`) を使用
- **インデント**: スペース2個
- **行幅**: 100文字

#### TypeScript

- 厳密な型定義を使用
- `any` 型の使用を禁止
- 適切な型アノテーションを記述

#### React/Remix (UI)

- 関数コンポーネントを使用
- TypeScript strict mode
- data-testid 属性を必ず追加（E2Eテスト用）
- **lint設定**: Biome + ESLint併用
- **テスト**: Jest使用

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
│   └── package.json     # pnpm
├── ui/                  # Remix UI
│   ├── app/
│   └── package.json     # pnpm
├── e2e/                 # Playwright E2E
│   ├── tests/
│   └── package.json     # pnpm
├── mcp/                 # MCP Server
│   └── package.json     # pnpm
├── package.json         # ルート (pnpm workspace)
├── pnpm-workspace.yaml  # ワークスペース設定
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

### データベース操作
```bash
cd api
pnpm run prisma:migrate:dev   # マイグレーション
pnpm run prisma:seed          # シードデータ投入
pnpm run prisma:studio        # Prisma Studio起動
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
- **必ず** 以下をを実行してから変更を完了する
  - `./.husky/_/pre-commit && ./.husky/_/post-commit`
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

---

**重要**: このガイドラインに従い、常に品質と安定性を保ちながら開発を進めてください。変更前後で必ずテストを実行し、破壊的変更を防止してください。
