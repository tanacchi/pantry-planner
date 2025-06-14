# 設計思想・原則

## 採用している設計原則

- **SOLID原則**: 単一責任・オープン/クローズド・リスコフ置換・インターフェース分離・依存性逆転を徹底
- **関心の分離**: レイヤー/モジュール/関数ごとに責務を明確化
- **DI（依存性注入）**: テスト容易性・拡張性のため必須

## エラーハンドリング戦略

- 例外はアプリケーション層で明示的にcatchし、適切なレスポンス/ログを返す
- ドメイン層では原則throwのみ、UI/インフラ層でユーザー向け変換
- 例外型（NotFound, ValidationError等）は共通定義

## 境界を守る思想

- 外部API/DBの型と内部ドメイン型を明確に分離
- DTO/Entity/ValueObjectを使い分け、変換層を設ける
- 直接的な型流用・暗黙変換を禁止

## 非同期処理・例外伝播

- Promise/async-awaitを標準とし、catch漏れを防ぐ
- 例外は上位レイヤーで集約的にハンドリング
- 非同期処理の副作用はテストで明示的に検証

## チーム意思決定の要旨

- 重要な設計判断・例外方針・命名規則はdocs/配下で明文化
- Pull Request時は設計原則・テスト網羅性・可読性を重点レビュー
- 新規参加者も迷わずキャッチアップできるドキュメント整備を推進

---
