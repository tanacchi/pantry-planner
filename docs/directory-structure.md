# ディレクトリ構成ガイドライン

## 基本構成例（単一リポジトリ）

```
api/
  src/
    modules/
      item/
        application/
        domain/
        infrastructure/
      pantry/
      user/
      ...
    shared/
    middleware/
    infrastructure/
    main.ts
    app.module.ts
  test/
    item.e2e-spec.ts
    ...
```

## モジュールごとの粒度と分割

- `application/` ... ユースケース・サービス・DTO
- `domain/` ... エンティティ・値オブジェクト・ドメインサービス
- `infrastructure/` ... DB/外部API実装・リポジトリ
- `interfaces/` ... Controller, GraphQL Resolver等（必要に応じて）

## ファイル命名規則

- `*.controller.ts` ... コントローラ
- `*.service.ts` ... サービス/ユースケース
- `*.entity.ts` ... エンティティ
- `*.repository.ts` ... リポジトリ
- `*.dto.ts` ... DTO
- `*.spec.ts` ... テスト

## モノレポ構成例

```
apps/
  api/
  ui/
  ...
packages/
  domain/
  shared/
  ...
```

---
