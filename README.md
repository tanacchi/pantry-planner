# Pantry Planner

食材管理・買い物リスト作成アプリケーション

## 🚀 クイックスタート

### 開発サーバー起動

```bash
# 1. API サーバー起動 (Terminal 1)
cd api
npm install
npm run start:dev    # http://localhost:8000

# 2. UI サーバー起動 (Terminal 2)  
cd ui
npm install
npm run dev          # http://localhost:5173

# 3. E2E テスト (Terminal 3) - オプション
cd e2e
pnpm install
pnpm run test        # 上記2つのサーバーが起動済みである必要あり
```

### 初回セットアップ

```bash
# データベースセットアップ
cd api
npm run prisma:migrate:dev
npm run prisma:seed

# E2E ブラウザインストール
cd e2e
npx playwright install --with-deps
```

## 📁 プロジェクト構成

```
pantry-planner/
├── api/             # NestJS API (npm)
├── ui/              # Remix UI (npm)  
├── e2e/             # Playwright E2E (pnpm)
├── CLAUDE.md        # AI Assistant Guidelines
└── README.md        # このファイル
```

## 🔧 技術スタック

- **API**: NestJS + Prisma + PostgreSQL
- **UI**: Remix + React + Tailwind CSS
- **E2E**: Playwright + TypeScript

## 📝 開発ルール

### 必須実行フロー
**コード修正完了前に必ず実行:**

```bash
# API
cd api && npm run lint && npm run test && npm run build

# UI  
cd ui && npm run lint && npm run typecheck && npm run build

# E2E
cd e2e && pnpm run lint && npx tsc --noEmit
```

### パッケージ管理
- **API & UI**: `npm`
- **E2E**: `pnpm`

## 🎯 主要コマンド

### API開発
```bash
cd api
npm run start:dev        # 開発サーバー
npm run lint            # ESLint
npm run test            # Jest テスト
npm run prisma:studio   # Prisma Studio
```

### UI開発
```bash
cd ui
npm run dev             # 開発サーバー
npm run build           # 本番ビルド
npm run typecheck       # TypeScript チェック
```

### E2Eテスト
```bash
cd e2e
pnpm run test           # 全テスト
pnpm run test:headed    # ブラウザ表示
pnpm run lint           # Biome lint
```

## 🔗 アクセスURL

- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/api
- **UI**: http://localhost:5173
- **Prisma Studio**: http://localhost:5555

## 📚 詳細ドキュメント

- [AI Assistant Guidelines](./CLAUDE.md) - Claude Code/GitHub Copilot用
- [E2E Testing Guide](./e2e/README.md) - 詳細なE2Eテストガイド

## 🐛 トラブルシューティング

### よくある問題

1. **ポート競合**: 8000, 5173, 5555ポートが使用済み
2. **データベース接続エラー**: `npm run prisma:migrate:dev`
3. **E2Eテスト失敗**: API・UIサーバーが起動しているか確認
4. **依存関係エラー**: `npm ci` / `pnpm install` で再インストール

### ヘルプコマンド
```bash
cd e2e && make help      # E2E Makefileヘルプ
```

---

**重要**: 開発時は [CLAUDE.md](./CLAUDE.md) のガイドラインに従い、必ずlint・test・buildを実行してから作業を完了してください。