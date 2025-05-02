# CreateItemRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | アイテム名 | [default to undefined]
**category** | **string** | カテゴリ | [default to undefined]
**pantryId** | **number** | パントリーID | [default to undefined]
**quantity** | **number** | 数量 | [default to undefined]
**unit** | **string** | 単位 | [default to undefined]
**expiresAt** | **object** | 賞味期限 | [optional] [default to undefined]

## Example

```typescript
import { CreateItemRequestDto } from './api';

const instance: CreateItemRequestDto = {
    name,
    category,
    pantryId,
    quantity,
    unit,
    expiresAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
