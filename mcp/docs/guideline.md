# 実装方針・ガイドライン（mcp）

## 設計原則

- MCP仕様に準拠したAPI設計
- OpenAPI Generatorによる型安全なクライアント生成
- ドメイン層・API層の分離
- テスト容易性・拡張性重視

## コードスタイル

- ESLint/Prettier による静的解析・自動整形
- 命名規則・ディレクトリ構成は docs/ 配下のガイドに準拠

## テスト

- ユニットテスト/統合テスト/モック活用
- Arrange-Act-Assert パターン

---

詳細は code-style.md, test-strategy.md などを参照。
