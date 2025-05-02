# UserDetailResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | ユーザーID | [default to undefined]
**lineUid** | **string** | LINE UID | [default to undefined]
**createdAt** | **string** | 作成日時 | [default to undefined]
**updatedAt** | **string** | 更新日時 | [default to undefined]
**lastLoginAt** | **string** | 最終ログイン日時 | [default to undefined]
**pantry** | [**PantryDetailResponseDto**](PantryDetailResponseDto.md) | ユーザーに紐づくパントリー | [default to undefined]

## Example

```typescript
import { UserDetailResponseDto } from './api';

const instance: UserDetailResponseDto = {
    id,
    lineUid,
    createdAt,
    updatedAt,
    lastLoginAt,
    pantry,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
