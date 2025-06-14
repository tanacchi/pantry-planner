# Pantry Planner

食材管理・買い物リスト作成アプリケーション

## 🚀 クイックスタート

### 簡単セットアップ（推奨）

```bash
# Just (推奨)
just dev-setup      # 初回セットアップ
just dev            # 開発サーバー起動

# または Task
task dev:setup      # 初回セットアップ  
task dev            # 開発サーバー起動

# または Make
make dev-setup      # 初回セットアップ
make dev            # 開発サーバー起動
```

### 手動セットアップ

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
pnpm run test        # 上記2つのサーバーが起動済みである必要あり
```

### 初回セットアップ

```bash
# データベースセットアップ
cd api
pnpm exec prisma migrate dev
pnpm exec prisma db seed

# E2E ブラウザインストール
cd e2e
pnpm exec playwright install --with-deps
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
- **パッケージ管理**: pnpm（全プロジェクト統一）

## 📝 開発ルール

### 必須実行フロー
**コード修正完了前に必ず実行:**

```bash
# 簡単（推奨）
just ci              # lint + typecheck + test + build
# または
task ci              # lint + typecheck + test + build  
# または
make ci              # lint + typecheck + test + build

# 手動
just lint && just test && just build
# または各プロジェクトで個別実行
cd api && pnpm run lint && pnpm run test && pnpm run build
cd ui && pnpm run lint && pnpm run typecheck && pnpm run build
cd e2e && pnpm run lint && pnpm exec tsc --noEmit
```

### パッケージ管理
- **全プロジェクト**: `pnpm`（統一）
- **Commit前自動チェック**: Husky + lint-staged

## 🎯 主要コマンド

### 統合コマンド（推奨）

```bash
# 開発
just help               # ヘルプ表示
just dev-setup          # 初回セットアップ
just dev                # 開発サーバー起動
just ci                 # 全チェック（lint+test+build）

# 個別操作
just lint               # 全プロジェクトlint
just test               # 全プロジェクトテスト
just build              # 全プロジェクトビルド
just start-all          # 全サーバー起動
just stop-all           # 全サーバー停止

# データベース
just db-setup           # DB初期化
just db-studio          # Prisma Studio
```

### 個別プロジェクト

```bash
# API開発
cd api
pnpm run start:dev        # 開発サーバー
pnpm run lint            # Biome + ESLint
pnpm run test:cov        # Jest テスト + カバレッジ
pnpm exec prisma studio  # Prisma Studio

# UI開発
cd ui
pnpm run dev             # 開発サーバー
pnpm run build           # 本番ビルド
pnpm run typecheck       # TypeScript チェック

# E2Eテスト
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