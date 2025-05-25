# テスト戦略

本プロジェクトでは、品質と保守性を担保するために多層的なテスト戦略を採用しています。

## テストの分類

- **ユニットテスト**: 各関数・クラス単位でのロジック検証。主に`*.spec.ts`で記述。
- **統合テスト**: 複数モジュールやレイヤーを組み合わせた動作検証。RepositoryやServiceの連携など。
- **E2Eテスト**: APIやUIを通じたシナリオ全体の検証。`test/`配下に配置。

## 使用フレームワーク

- **Jest**: ユニット・統合テストの標準。
- **Supertest**: NestJSのE2EテストでAPIリクエストを検証。
- **Playwright**（UIがある場合）: フロントエンドE2E。

## Arrange-Act-Assertパターン

- Arrange: テストデータやモックの準備
- Act: テスト対象の実行
- Assert: 結果の検証

**例：**

```ts
it('should return item', async () => {
  // Arrange
  itemRepository.findById.mockResolvedValue(item);
  // Act
  const result = await service.getItem(1);
  // Assert
  expect(result).toHaveProperty('id', 1);
});
```

## ディレクトリ構成例

- `src/modules/item/application/item.service.spec.ts`（ユニット）
- `src/modules/item/infrastructure/item.repository.spec.ts`（統合）
- `test/item.e2e-spec.ts`（E2E）

## Factory・Mock戦略

- 外部依存（DB, API）は必ずモック化。
- Factory関数でテストデータ生成を共通化。
- Jestの`jest.mock`や`jest.fn()`を活用。

## カバレッジとCI

- カバレッジは`pnpm test:cov`で計測。
- 主要モジュールは80%以上、重要箇所は90%以上を目標。
- CI（GitHub Actions等）で自動テスト・カバレッジチェックを実施。

---
