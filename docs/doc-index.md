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
- [coverage-guideline.md](coverage-guideline.md): カバレッジ運用・レポート活用
- [mock-policy.md](mock-policy.md): モック・スタブ・フェイク運用
- [test-data.md](test-data.md): テストデータ・フィクスチャ運用

## 4. CI/CD・運用

- [ci-cd.md](ci-cd.md): CI/CD運用・GitHub Actions例
- [release-management.md](release-management.md): リリース管理・バージョニング
- [env-config.md](env-config.md): 環境変数・設定管理
- [dependency-management.md](dependency-management.md): 依存パッケージ管理
- [logging.md](logging.md): ロギング・監視運用
- [monitoring.md](monitoring.md): 監視・アラート運用
- [backup-policy.md](backup-policy.md): バックアップ・リストア運用
- [disaster-recovery.md](disaster-recovery.md): 災害復旧・BCP

## 5. セキュリティ・法務

- [security.md](security.md): セキュリティ運用・脆弱性対応
- [secrets-policy.md](secrets-policy.md): シークレット管理・漏洩防止
- [license-policy.md](license-policy.md): ライセンス・OSS利用

## 6. 開発フロー・運用

- [CONTRIBUTING.md](CONTRIBUTING.md): コントリビュートガイド
- [onboarding.md](onboarding.md): 新規参入者向けオンボーディング
- [review-guideline.md](review-guideline.md): コードレビューガイド
- [branch-policy.md](branch-policy.md): ブランチ戦略・運用
- [issue-pr-policy.md](issue-pr-policy.md): Issue/PR運用・テンプレート
- [communication.md](communication.md): チームコミュニケーション
- [incident-response.md](incident-response.md): 障害対応・インシデントレスポンス
- [migration.md](migration.md): DBマイグレーション・データ移行

## 7. API・実装

- [api-guideline.md](api-guideline.md): API設計・運用
- [error-handling.md](error-handling.md): エラー・例外ハンドリング
- [performance.md](performance.md): パフォーマンス・スケーラビリティ
- [accessibility.md](accessibility.md): アクセシビリティ・国際化
- [ux-ui.md](ux-ui.md): UI/UX設計・運用

## 8. 用語集

- [glossary.md](glossary.md): 用語集・略語ガイド

---

### 参照タイミング例

- 設計・実装方針を知りたい: architecture.md, design-philosophy.md
- 命名・スタイルで迷った: naming-convention.md, code-style.md
- テスト・カバレッジ運用: test-strategy.md, coverage-guideline.md
- CI/CD・リリース: ci-cd.md, release-management.md
- セキュリティ・シークレット: security.md, secrets-policy.md
- 新規参入・開発フロー: onboarding.md, CONTRIBUTING.md
- API設計・エラー処理: api-guideline.md, error-handling.md
- 障害・災害対応: incident-response.md, disaster-recovery.md
- その他: glossary.md, doc-style.md

---

本一覧は随時更新。新規ドキュメント追加時は必ずここに追記。
