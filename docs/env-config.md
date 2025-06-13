# 環境変数・設定管理ガイド

このドキュメントは、pantry-plannerプロジェクトの環境変数・設定ファイル（.env等）管理・運用ルールをまとめたものです。

## 1. 管理方針

- .envファイルはgit管理外（.gitignore）
- サンプルは.env.exampleで管理
- 機密情報はGitHub Secrets/CI環境変数で管理

## 2. 主な環境変数例

- DB接続情報（DATABASE_URL等）
- APIキー・外部サービス認証情報
- NODE_ENV, PORT, LOG_LEVEL等

## 3. 設定変更フロー

- 変更時は必ず影響範囲を確認
- 本番・開発・テストで値を分離
- 変更内容はonboarding.md, README.md等に反映

## 4. セキュリティ

- シークレットは絶対にコミットしない
- 漏洩時は即時ローテーション

## 5. テンプレート運用

- .env.exampleを常に最新に
- 新規変数追加時は必ずサンプルも更新

---

詳細はsecurity.md, dependency-management.md, onboarding.md等を参照。
