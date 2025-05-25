# カバレッジ運用ガイドライン

## 測定方法

- `pnpm test:cov` または `jest --coverage` でカバレッジを計測。
- レポートは `coverage/` ディレクトリにHTML/LCOV等で出力。

## レポートの見方

- `Statements`, `Branches`, `Functions`, `Lines` の各指標を確認。
- 重要な分岐や例外パスが未カバーの場合は追加テストを実装。
- `coverage/lcov-report/index.html` で視覚的に確認可能。

## 閾値の設定と理由

- **全体の下限: 80%**
- **重要モジュール: 90%以上**
- 理由: 80%未満はバグ混入リスクが高まるため。重要ドメインは更に高水準を維持。

## 除外対象の指針

- `mock-*.ts` などテスト用ダミー実装
- `*.module.ts`, `main.ts` などDIやエントリポイントのみのファイル
- 外部ライブラリや自動生成コード
- 除外は `jest.config.js` または `package.json` の `coveragePathIgnorePatterns` で管理

## CIによる自動チェック例

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test:cov
      - name: Check coverage
        run: |
          COVERAGE=$(npx jest --coverage --json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage below threshold: $COVERAGE%" && exit 1
          fi
```

---
