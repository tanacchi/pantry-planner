# Pantry Planner

食材管理・買い物リスト作成アプリケーション

## 🚀 クイックスタート

### 環境変数の準備

```bash
# DB接続情報（compose.yml が読む）
cp .env.example .env

# API（DATABASE_URL）
cp api/.env.example api/.env

# UI（API_HOST。LIFF関連は空のままでよい）
cp ui/.env.example ui/.env
```

### データベース起動

```bash
docker compose up -d db
```

### 開発サーバー起動

```bash
# 1. API サーバー起動 (Terminal 1)
cd api
pnpm install
pnpm run start:dev    # http://localhost:8000

# 2. UI サーバー起動 (Terminal 2)
cd ui
pnpm install
pnpm run dev          # http://localhost:5173

# 3. E2E テスト (Terminal 3) - オプション
cd e2e
pnpm install
pnpm run test        # webServer が上記2つのサーバーを自動起動する
```

### 初回セットアップ

```bash
# データベーススキーマ適用とサンプルデータ投入
cd api
pnpm run db:push
pnpm run db:seed

# E2E テスト用の固定データ投入（TEST_USER_ID=27 等。冪等）
pnpm run db:seed:e2e

# E2E ブラウザインストール
cd ../e2e
pnpm exec playwright install
```

## 📁 プロジェクト構成

```
pantry-planner/
├── api/             # NestJS API (pnpm)
├── ui/              # Remix UI (pnpm)
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
cd api && pnpm run lint && pnpm run test && pnpm run build

# UI
cd ui && pnpm run lint && pnpm run typecheck && pnpm run build

# E2E
cd e2e && pnpm run lint && pnpm exec tsc --noEmit
```

### パッケージ管理
- **API・UI・E2E**: すべて `pnpm`（各ディレクトリに `pnpm-lock.yaml` あり）

## 🎯 主要コマンド

### API開発
```bash
cd api
pnpm run start:dev      # 開発サーバー
pnpm run lint           # ESLint
pnpm run test           # Jest テスト（ユニット + e2e）
pnpm run db:push        # DBスキーマ適用（migrate 整備前の暫定）
pnpm run db:seed        # サンプルデータ投入
pnpm run db:seed:e2e    # E2Eテスト用固定データ投入（冪等）
pnpm run db:studio      # Prisma Studio
```

### UI開発
```bash
cd ui
pnpm run dev             # 開発サーバー
pnpm run build           # 本番ビルド
pnpm run typecheck       # TypeScript チェック
```

### E2Eテスト
```bash
cd e2e
pnpm run test              # 全テスト（Mobile Chrome / Mobile Safari）
pnpm run test:headed       # ブラウザ表示
pnpm run lint              # Biome lint
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
2. **データベース接続エラー**: `docker compose up -d db` でDBが起動しているか、`api/.env` の `DATABASE_URL` を確認。スキーマ未適用なら `cd api && pnpm run db:push`
3. **E2Eテスト失敗**: `api/.env`・`ui/.env` が用意されているか、`pnpm -C api run db:seed:e2e` を実行済みか確認
4. **依存関係エラー**: 各ディレクトリで `pnpm install` を再実行

### ヘルプコマンド
```bash
cd e2e && make help      # E2E Makefileヘルプ
```

---

**重要**: 開発時は [CLAUDE.md](./CLAUDE.md) のガイドラインに従い、必ずlint・test・buildを実行してから作業を完了してください。
