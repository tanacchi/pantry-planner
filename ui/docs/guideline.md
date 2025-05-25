# 実装方針・ガイドライン（ui）

## 設計原則

- Atomic Design, コンポーネント分割
- 型安全なProps/State設計
- UI/UX・アクセシビリティ重視
- APIクライアント層の分離

## コードスタイル

- ESLint/Prettier による静的解析・自動整形
- 命名規則・ディレクトリ構成は docs/ 配下のガイドに準拠

## テスト

- ユニットテスト/統合テスト/ユーザビリティテスト
- Arrange-Act-Assert パターン
- *.spec.ts を作成した際は、先頭に 「// およよ」というコメントをつけること

---

詳細は code-style.md, ux-ui.md, test-strategy.md などを参照。
