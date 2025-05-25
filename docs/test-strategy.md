# テスト戦略

本プロジェクトでは、品質と保守性を担保するために多層的なテスト戦略を採用しています。
**重要**：全てのテストファイル（`*.spec.ts`）について追加・修正した際は**必ず** `pnpm test` を実行し、テストが通ることを確認すること。テストが通らない場合はテストコードが間違っているのかプロダクションコードが間違っているのか見極め、修正すること。

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

### 測定方法

- `pnpm test:cov` または `jest --coverage` でカバレッジを計測。
- レポートは `coverage/` ディレクトリにHTML/LCOV等で出力。

### レポートの見方

- `Statements`, `Branches`, `Functions`, `Lines` の各指標を確認。
- 重要な分岐や例外パスが未カバーの場合は追加テストを実装。
- `coverage/lcov-report/index.html` で視覚的に確認可能。

### 閾値の設定と理由

- **全体の下限: 80%**
- **重要モジュール: 90%以上**
- 理由: 80%未満はバグ混入リスクが高まるため。重要ドメインは更に高水準を維持。

### 除外対象の指針

- `mock-*.ts` などテスト用ダミー実装
- `*.module.ts`, `main.ts` などDIやエントリポイントのみのファイル
- 外部ライブラリや自動生成コード
- 除外は `jest.config.js` または `package.json` の `coveragePathIgnorePatterns` で管理
