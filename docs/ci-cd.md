# CI/CD運用ガイド

このドキュメントは、pantry-plannerプロジェクトのCI/CD（継続的インテグレーション/継続的デリバリー）運用方針・設定例・ベストプラクティスをまとめたものです。

## 1. CI/CDの目的

- 品質担保（自動テスト・静的解析・カバレッジ計測）
- デプロイ自動化・ヒューマンエラー防止
- レビュー・マージフローの効率化

## 2. 主なCI/CDパイプライン

- Lint/Formatチェック（ESLint, Prettier）
- TypeScript型チェック
- ユニットテスト・E2Eテスト（Jest, Supertest）
- カバレッジ計測・レポート生成
- ビルド・デプロイ（Vercel, Netlify, Docker等）
- セキュリティスキャン（npm audit, Snyk等）

## 3. GitHub Actions例

```yaml
name: CI
on:
  pull_request:
    branches: [main, develop]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run test:cov
      - run: pnpm run build
```

## 4. カバレッジ・品質ゲート

- PR時にstatement/line/branch/function 80%以上を必須とする
- カバレッジレポートをPRコメントに自動投稿
- 失敗時は修正・再実行

## 5. デプロイ戦略

- mainマージ時に本番デプロイ、自動ロールバック設定
- ステージング環境での自動デプロイ・E2Eテスト
- 機密情報はGitHub Secrets/環境変数で管理

## 6. トラブルシュート

- CI失敗時はログを確認し、原因を特定・修正
- デプロイ失敗時はロールバック・アラート通知

---

詳細は各種ガイドライン（test-strategy.md, coverage-guideline.md, env-config.md等）を参照。
