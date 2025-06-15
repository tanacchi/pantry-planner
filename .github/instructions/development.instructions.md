# Development Guide

## 🛠️ ツールのインストール

### 1. Just（推奨）

```bash
# macOS (Homebrew)
brew install just

# Linux/Windows (cargo)
cargo install just

# または直接ダウンロード
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to ~/bin
```

### 2. Task

```bash
# macOS (Homebrew)
brew install go-task/tap/go-task

# Linux/Windows (npm)
npm install -g @go-task/cli

# または直接ダウンロード
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b ~/bin
```

### 3. Make（通常プリインストール済み）

```bash
# macOS
xcode-select --install

# Ubuntu/Debian
sudo apt-get install build-essential

# Windows
# Git Bash または WSL を使用
```

## 🚀 開発フロー

### 初回セットアップ

```bash
# Just使用（推奨）
just dev-setup

# Task使用
task dev:setup

# Make使用
make dev-setup
```

### 日常の開発

```bash
# 開発サーバー起動
just dev

# コード品質チェック
just ci

# 個別操作
just lint           # 全プロジェクトlint
just test           # 全プロジェクトテスト
just build          # 全プロジェクトビルド
```

## 📋 利用可能なコマンド

| 操作 | Just | Task | Make |
|------|------|------|------|
| ヘルプ | `just help` | `task help` | `make help` |
| セットアップ | `just dev-setup` | `task dev:setup` | `make dev-setup` |
| 開発開始 | `just dev` | `task dev` | `make dev` |
| Lint | `just lint` | `task lint` | `make lint` |
| テスト | `just test` | `task test` | `make test` |
| ビルド | `just build` | `task build` | `make build` |
| CI | `just ci` | `task ci` | `make ci` |
| サーバー起動 | `just start-all` | `task start:all` | `make start-all` |
| サーバー停止 | `just stop-all` | `task stop:all` | `make stop-all` |
| DB初期化 | `just db-setup` | `task db:setup` | `make db-setup` |
| 状態確認 | `just status` | `task status` | `make status` |
| クリーンアップ | `just clean` | `task clean` | `make clean` |

## 🔧 ツール比較

| ツール | 特徴 | 推奨度 |
|--------|------|--------|
| **Just** | ・Rustベース、高速<br>・シンプルな構文<br>・クロスプラットフォーム | ⭐⭐⭐⭐⭐ |
| **Task** | ・Go製、YAML形式<br>・依存関係管理が強力<br>・ドキュメントが豊富 | ⭐⭐⭐⭐ |
| **Make** | ・標準的、互換性が高い<br>・どこでも使える<br>・学習コストが低い | ⭐⭐⭐ |

## 💡 Tips

### エディタ統合

- **VS Code**: Just、Task、Make用の拡張機能あり
- **Tasks.json**: エディタのタスクランナーと統合可能

### パフォーマンス

- **Just**: 最も高速、ほぼゼロコスト
- **Task**: 依存関係キャッシュで効率的
- **Make**: ファイル更新検知が強力

### 学習リソース

- [Just Manual](https://just.systems/man/en/)
- [Task Documentation](https://taskfile.dev/)
- [GNU Make Manual](https://www.gnu.org/software/make/manual/)