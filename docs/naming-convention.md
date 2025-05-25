# 命名規則ガイドライン

## ディレクトリ・ファイル

- ディレクトリ: ケバブケース（例: `shopping-item/`）
- ファイル: ケバブケース＋用途（例: `item.controller.ts`, `user.entity.ts`）

## 変数・関数・クラス

- 変数・関数: キャメルケース（例: `findById`, `userName`）
- クラス・型: パスカルケース（例: `ItemService`, `UserEntity`）
- 定数: 全て大文字＋アンダースコア（例: `MAX_LENGTH`）

## DTO, Entity, UseCase等

- DTO: `*Dto`または`*RequestDto`/`*ResponseDto`（例: `CreateItemRequestDto`）
- Entity: `*Entity`または`*.entity.ts`（例: `UserEntity`, `user.entity.ts`）
- UseCase/Service: `*Service`または`*UseCase`（例: `ItemService`）
- Repository: `*Repository`（例: `ItemRepository`）

## その他

- テスト: `*.spec.ts`（ユニット/統合）、`*.e2e-spec.ts`（E2E）
- モック: `mock-*.ts`、`mock-*.spec.ts`

---
