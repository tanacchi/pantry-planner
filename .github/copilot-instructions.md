# 実装・単体テスト・E2E テスト運用マニュアル（item モジュール例）

## 1. 実装方針

- **ドメイン層・アプリケーション層・インフラ層**の責務を明確に分離する。
- 例外・エラーケース（例: NotFound, バリデーションエラー）は必ず明示的にハンドリングする。
- `includeConsumed` などの分岐ロジックは、必ず全パターン網羅する。
- Prisma 等の外部依存はインフラ層でラップし、テスト容易性を高める。

## 2. 単体テスト方針

- **テスト対象ごとに spec ファイルを作成**（例: `item.repository.spec.ts`, `item.service.spec.ts`）。
- **分岐網羅（branch coverage 80%以上、理想は 100%）**を目指す。
  - 例: `includeConsumed: true/false` の両方、エラー/正常系、例外 throw 分岐など。
- **モック/スタブ**を活用し、外部依存（DB, Service 等）は直接叩かない。
- **テストケース例**:
  - CRUD 全パターン（正常/異常）
  - 存在しない ID での update/delete
  - `findAll`/`findByPantryId`の`includeConsumed`分岐
  - マッピング層の enum 変換・例外
- **テスト失敗時は原因を特定し、テスト/実装両面から修正する**。
- **TypeScript/ESLint エラーは必ず解消する**（引数・オブジェクトリテラルの整形等）。
- **各テストは Arrange-Act-Assert パターンで実装する**
- **必要に応じて Parameterized Test でコンパクトにテストを記述する**

## 3. E2E テスト方針

- E2E テストは`test/`配下に配置し、API のエンドツーエンド動作を検証する。
- **実 DB/外部 API は原則モックまたはテスト用 DB を利用**。
- **主要なユースケース（正常/異常）を網羅**。
- **コントローラ層のテスト**では、Service 層をモックし、リクエスト/レスポンスの流れを確認する。

## 4. カバレッジ運用

- `pnpm test:cov` でカバレッジを計測。
- **statement/line/branch/function いずれも 80%以上、理想は 100%**を目指す。
- カバレッジレポートで未カバー分岐・エラーケースを特定し、テストを追加。

## 5. コードレビュー・運用

- PR 時は必ずカバレッジレポートを確認。
- **分岐・例外・エラーケースの網羅性**を重点的にレビュー。
- **テストの可読性・保守性**も重視。

---

### 参考: item.controller.spec.ts テスト例

- Service 層を jest.mock で差し替え、各 API のリクエスト/レスポンス・Service 呼び出しを検証。
- CRUD, getItems, getItemsByPantry 等の全パスをテスト。

---

このマニュアルは今後の実装・テスト運用の標準とし、随時改善・拡充すること。

# 参照ドキュメント一覧・用途ガイド

このプロジェクトの開発・運用・設計・テスト・CI/CD・セキュリティ・障害対応・コミュニケーション等、あらゆる観点の規約・ガイドライン・運用ルールはすべて `docs/` 配下の Markdown に集約されています。

## 主なドキュメントと用途

- [architecture.md](../docs/architecture.md): 全体設計・レイヤー構成・依存関係
- [design-philosophy.md](../docs/design-philosophy.md): 設計思想・原則・意思決定
- [directory-structure.md](../docs/directory-structure.md): ディレクトリ構成・責務分離
- [code-style.md](../docs/code-style.md): コードスタイル・静的解析・自動整形
- [naming-convention.md](../docs/naming-convention.md): 命名規則・命名例
- [doc-style.md](../docs/doc-style.md): ドキュメント記述・運用スタイル
- [test-strategy.md](../docs/test-strategy.md): テスト戦略・単体/E2E/カバレッジ方針
- [coverage-guideline.md](../docs/coverage-guideline.md): カバレッジ運用・レポート活用
- [mock-policy.md](../docs/mock-policy.md): モック・スタブ・フェイク運用
- [test-data.md](../docs/test-data.md): テストデータ・フィクスチャ運用
- [ci-cd.md](../docs/ci-cd.md): CI/CD 運用・GitHub Actions 例
- [release-management.md](../docs/release-management.md): リリース管理・バージョニング
- [env-config.md](../docs/env-config.md): 環境変数・設定管理
- [dependency-management.md](../docs/dependency-management.md): 依存パッケージ管理
- [logging.md](../docs/logging.md): ロギング・監視運用
- [monitoring.md](../docs/monitoring.md): 監視・アラート運用
- [backup-policy.md](../docs/backup-policy.md): バックアップ・リストア運用
- [disaster-recovery.md](../docs/disaster-recovery.md): 災害復旧・BCP
- [security.md](../docs/security.md): セキュリティ運用・脆弱性対応
- [secrets-policy.md](../docs/secrets-policy.md): シークレット管理・漏洩防止
- [license-policy.md](../docs/license-policy.md): ライセンス・OSS 利用
- [CONTRIBUTING.md](../docs/CONTRIBUTING.md): コントリビュートガイド
- [onboarding.md](../docs/onboarding.md): 新規参入者向けオンボーディング
- [review-guideline.md](../docs/review-guideline.md): コードレビューガイド
- [branch-policy.md](../docs/branch-policy.md): ブランチ戦略・運用
- [issue-pr-policy.md](../docs/issue-pr-policy.md): Issue/PR 運用・テンプレート
- [communication.md](../docs/communication.md): チームコミュニケーション
- [incident-response.md](../docs/incident-response.md): 障害対応・インシデントレスポンス
- [migration.md](../docs/migration.md): DB マイグレーション・データ移行
- [api-guideline.md](../docs/api-guideline.md): API 設計・運用
- [error-handling.md](../docs/error-handling.md): エラー・例外ハンドリング
- [performance.md](../docs/performance.md): パフォーマンス・スケーラビリティ
- [accessibility.md](../docs/accessibility.md): アクセシビリティ・国際化
- [ux-ui.md](../docs/ux-ui.md): UI/UX 設計・運用
- [glossary.md](../docs/glossary.md): 用語集・略語ガイド
- [doc-index.md](../docs/doc-index.md): ドキュメント一覧・参照ガイド

## 参照例

- 設計・実装方針: architecture.md, design-philosophy.md
- 命名・スタイル: naming-convention.md, code-style.md
- テスト・カバレッジ: test-strategy.md, coverage-guideline.md
- CI/CD・リリース: ci-cd.md, release-management.md
- セキュリティ: security.md, secrets-policy.md
- 新規参入: onboarding.md, CONTRIBUTING.md
- API 設計・エラー処理: api-guideline.md, error-handling.md
- 障害・災害対応: incident-response.md, disaster-recovery.md
- その他: glossary.md, doc-style.md, doc-index.md

---

### どのような情報が必要なときに参照すべきか

- 設計・実装・テスト・運用・障害対応・リリース・セキュリティ・コミュニケーション等、あらゆる観点で迷った場合は、まず`doc-index.md`と本ファイルを参照し、該当ガイドラインを確認してください。
- 新規参入時・設計/実装/テスト/レビュー/運用/障害対応/リリース/CI/CD/セキュリティ等、全てのフェーズで活用できます。

---

本一覧・リンクは随時最新化してください。
