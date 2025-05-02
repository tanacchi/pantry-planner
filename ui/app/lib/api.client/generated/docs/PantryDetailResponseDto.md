# PantryDetailResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | パントリーID | [default to undefined]
**userId** | **number** | ユーザーID | [default to undefined]
**createdAt** | **string** | 作成日時 | [default to undefined]
**updatedAt** | **string** | 更新日時 | [default to undefined]
**items** | [**Array&lt;ItemResponseDto&gt;**](ItemResponseDto.md) | このパントリーに属するアイテム一覧 | [default to undefined]

## Example

```typescript
import { PantryDetailResponseDto } from './api';

const instance: PantryDetailResponseDto = {
    id,
    userId,
    createdAt,
    updatedAt,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
