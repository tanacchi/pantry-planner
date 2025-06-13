# ドキュメント一覧・参照ガイド

このドキュメントは、pantry-plannerプロジェクトのdocs/配下にある全ドキュメントの一覧と、用途・参照タイミングをまとめたものです。

## 1. 設計・アーキテクチャ

- [architecture.md](architecture.md): 全体設計・レイヤー構成・依存関係
- [design-philosophy.md](design-philosophy.md): 設計思想・原則・意思決定
- [directory-structure.md](directory-structure.md): ディレクトリ構成・責務分離

## 2. コーディング・命名・スタイル

- [code-style.md](code-style.md): コードスタイル・静的解析・自動整形
- [naming-convention.md](naming-convention.md): 命名規則・命名例
- [doc-style.md](doc-style.md): ドキュメント記述・運用スタイル

## 3. テスト・品質

- [test-strategy.md](test-strategy.md): テスト戦略・単体/E2E/カバレッジ方針
- [mock-policy.md](mock-policy.md): モック・スタブ・フェイク運用
- [test-data.md](test-data.md): テストデータ・フィクスチャ運用

## 4. CI/CD・運用

- [ci-cd.md](ci-cd.md): CI/CD運用・GitHub Actions例
- [env-config.md](env-config.md): 環境変数・設定管理
- [migration.md](migration.md): DBマイグレーション・データ移行

## 5. セキュリティ

- [secrets-policy.md](secrets-policy.md): シークレット管理・漏洩防止

## 6. API・実装

- [api-guideline.md](api-guideline.md): API設計・運用
- [error-handling.md](error-handling.md): エラー・例外ハンドリング
- [ux-ui.md](ux-ui.md): UI/UX設計・運用

---

### 参照タイミング例

- 設計・実装方針を知りたい: architecture.md, design-philosophy.md
- 命名・スタイルで迷った: naming-convention.md, code-style.md
- テスト運用: test-strategy.md, mock-policy.md
- CI/CD: ci-cd.md, env-config.md
- セキュリティ: secrets-policy.md
- API設計・エラー処理: api-guideline.md, error-handling.md
- DB/マイグレーション: migration.md
- UI/UX: ux-ui.md
- その他: doc-style.md

---

本一覧は随時更新。新規ドキュメント追加時は必ずここに追記。
