# ブランチ戦略・運用ルール

このドキュメントは、pantry-plannerプロジェクトのブランチ戦略・命名・運用ルールをまとめたものです。

## 1. ブランチ戦略

- main: 本番リリース用
- develop: 開発統合用（必要に応じて）
- feature/xxx: 機能追加
- fix/yyy: バグ修正
- hotfix/zzz: 緊急修正
- release/vX.Y.Z: リリース準備

## 2. 命名規則

- 英小文字・ハイフン区切り
- 目的・内容が分かる命名

## 3. 運用ルール

- 1トピック1ブランチ
- mainへの直接コミット禁止
- PR経由でマージ
- コンフリクトは必ず解消

## 4. CI/CD連携

- PR作成時に自動テスト・カバレッジ計測
- mainマージ時に本番デプロイ

---

詳細はCONTRIBUTING.md, ci-cd.md, review-guideline.md等を参照。
