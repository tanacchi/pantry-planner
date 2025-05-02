# ItemApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**itemControllerCreateItem**](#itemcontrollercreateitem) | **POST** /items | |
|[**itemControllerDeleteItem**](#itemcontrollerdeleteitem) | **DELETE** /items/{id} | |
|[**itemControllerGetItem**](#itemcontrollergetitem) | **GET** /items/{id} | |
|[**itemControllerGetItems**](#itemcontrollergetitems) | **GET** /items | |
|[**itemControllerGetItemsByPantry**](#itemcontrollergetitemsbypantry) | **GET** /items/by-pantry/{pantryId} | |
|[**itemControllerUpdateItem**](#itemcontrollerupdateitem) | **PUT** /items/{id} | |

# **itemControllerCreateItem**
> ItemResponseDto itemControllerCreateItem(createItemRequestDto)


### Example

```typescript
import {
    ItemApi,
    Configuration,
    CreateItemRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let createItemRequestDto: CreateItemRequestDto; //

const { status, data } = await apiInstance.itemControllerCreateItem(
    createItemRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createItemRequestDto** | **CreateItemRequestDto**|  | |


### Return type

**ItemResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | アイテムの作成に成功しました |  -  |
|**400** | 不正なリクエスト |  -  |
|**500** | サーバーエラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **itemControllerDeleteItem**
> itemControllerDeleteItem()


### Example

```typescript
import {
    ItemApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let id: number; //アイテムID (default to undefined)

const { status, data } = await apiInstance.itemControllerDeleteItem(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | アイテムID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | アイテムの削除に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **itemControllerGetItem**
> ItemResponseDto itemControllerGetItem()


### Example

```typescript
import {
    ItemApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let id: number; //アイテムID (default to undefined)

const { status, data } = await apiInstance.itemControllerGetItem(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | アイテムID | defaults to undefined|


### Return type

**ItemResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | アイテムの取得に成功しました |  -  |
|**404** | リソースが見つかりません |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **itemControllerGetItems**
> Array<ItemResponseDto> itemControllerGetItems()


### Example

```typescript
import {
    ItemApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let name: Array<string>; // (optional) (default to undefined)
let category: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.itemControllerGetItems(
    name,
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **category** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**Array<ItemResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | アイテム一覧の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **itemControllerGetItemsByPantry**
> Array<ItemResponseDto> itemControllerGetItemsByPantry()


### Example

```typescript
import {
    ItemApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let pantryId: number; //パントリーID (default to undefined)

const { status, data } = await apiInstance.itemControllerGetItemsByPantry(
    pantryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pantryId** | [**number**] | パントリーID | defaults to undefined|


### Return type

**Array<ItemResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | アイテム一覧の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **itemControllerUpdateItem**
> ItemResponseDto itemControllerUpdateItem(createItemRequestDto)


### Example

```typescript
import {
    ItemApi,
    Configuration,
    CreateItemRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ItemApi(configuration);

let id: number; //アイテムID (default to undefined)
let createItemRequestDto: CreateItemRequestDto; //

const { status, data } = await apiInstance.itemControllerUpdateItem(
    id,
    createItemRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createItemRequestDto** | **CreateItemRequestDto**|  | |
| **id** | [**number**] | アイテムID | defaults to undefined|


### Return type

**ItemResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | アイテムの更新に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

