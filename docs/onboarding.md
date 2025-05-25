# オンボーディングガイド

このドキュメントは、新規参入開発者がpantry-plannerプロジェクトにスムーズに参加し、開発を始めるための手順・知識をまとめたものです。

## 1. プロジェクト概要

- サービス目的・主要機能・利用技術（NestJS, Prisma, TypeScript, React, Remix, etc.）
- モノレポ構成（api/, ui/, mcp/, docs/）

## 2. 開発環境セットアップ

1. リポジトリのクローン
2. Node.js, pnpm, Docker, VSCode等のインストール
3. `pnpm install` で依存解決
4. `.env`ファイルの作成（env-config.md参照）
5. DBセットアップ（Prisma, seed, migration）
6. `pnpm run dev` でローカル起動

## 3. コードリーディングのポイント

- docs/配下のアーキテクチャ・設計・命名・テスト戦略ガイドを熟読
- modules/配下のレイヤー構成・責務分離を理解
- 主要なService/Repository/Controllerの役割・依存関係を把握

## 4. 開発フロー

- Issue/PR運用、ブランチ戦略、レビュー基準（CONTRIBUTING.md, branch-policy.md, review-guideline.md参照）
- テスト・カバレッジ・CI/CD運用（test-strategy.md, coverage-guideline.md, ci-cd.md参照）

## 5. よくある質問・トラブルシュート

- 開発環境でのエラー対処
- DBマイグレーション・リセット方法
- テスト失敗時のデバッグ手順
- コミュニケーション・相談窓口

---

困ったときは必ずSlack/DiscordまたはIssueで相談してください。
