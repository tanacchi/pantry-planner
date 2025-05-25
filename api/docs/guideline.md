# 実装方針・ガイドライン（api）

## 設計原則

- ドメイン層・アプリケーション層・インフラ層の責務分離
- 例外・エラーケースの明示的ハンドリング
- 外部依存（DB, API）はインフラ層でラップ
- DI（依存性注入）によるテスト容易性・拡張性の確保

## テスト

- Arrange-Act-Assert パターン
- モック/スタブ活用、分岐網羅
- E2E テストは test/ 配下

## コードスタイル

- ESLint/Prettier による静的解析・自動整形
- 命名規則・ディレクトリ構成は docs/ 配下のガイドに準拠

---

詳細は code-style.md, test-strategy.md, naming-convention.md などを参照。
