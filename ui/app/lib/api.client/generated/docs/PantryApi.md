# PantryApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**pantryControllerCreatePantry**](#pantrycontrollercreatepantry) | **POST** /pantries | |
|[**pantryControllerDeletePantry**](#pantrycontrollerdeletepantry) | **DELETE** /pantries/{id} | |
|[**pantryControllerGetPantries**](#pantrycontrollergetpantries) | **GET** /pantries | |
|[**pantryControllerGetPantriesByUser**](#pantrycontrollergetpantriesbyuser) | **GET** /pantries/by-user/{userId} | |
|[**pantryControllerGetPantry**](#pantrycontrollergetpantry) | **GET** /pantries/{id} | |
|[**pantryControllerGetPantryDetail**](#pantrycontrollergetpantrydetail) | **GET** /pantries/{id}/detail | |
|[**pantryControllerGetPantryDetailsByUser**](#pantrycontrollergetpantrydetailsbyuser) | **GET** /pantries/by-user/{userId}/detail | |
|[**pantryControllerUpdatePantry**](#pantrycontrollerupdatepantry) | **PUT** /pantries/{id} | |

# **pantryControllerCreatePantry**
> PantryResponseDto pantryControllerCreatePantry(createPantryRequestDto)


### Example

```typescript
import {
    PantryApi,
    Configuration,
    CreatePantryRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let createPantryRequestDto: CreatePantryRequestDto; //

const { status, data } = await apiInstance.pantryControllerCreatePantry(
    createPantryRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPantryRequestDto** | **CreatePantryRequestDto**|  | |


### Return type

**PantryResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | パントリーの作成に成功しました |  -  |
|**400** | 不正なリクエスト |  -  |
|**500** | サーバーエラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerDeletePantry**
> pantryControllerDeletePantry()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let id: number; //パントリーID (default to undefined)

const { status, data } = await apiInstance.pantryControllerDeletePantry(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | パントリーID | defaults to undefined|


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
|**204** | パントリーの削除に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerGetPantries**
> Array<PantryResponseDto> pantryControllerGetPantries()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

const { status, data } = await apiInstance.pantryControllerGetPantries();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PantryResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | パントリー一覧の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerGetPantriesByUser**
> Array<PantryResponseDto> pantryControllerGetPantriesByUser()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let userId: number; //ユーザーID (default to undefined)

const { status, data } = await apiInstance.pantryControllerGetPantriesByUser(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | ユーザーID | defaults to undefined|


### Return type

**Array<PantryResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザーに紐づくパントリー一覧の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerGetPantry**
> PantryResponseDto pantryControllerGetPantry()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let id: number; //パントリーID (default to undefined)

const { status, data } = await apiInstance.pantryControllerGetPantry(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | パントリーID | defaults to undefined|


### Return type

**PantryResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | パントリーの取得に成功しました |  -  |
|**404** | リソースが見つかりません |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerGetPantryDetail**
> PantryDetailResponseDto pantryControllerGetPantryDetail()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let id: number; //パントリーID (default to undefined)

const { status, data } = await apiInstance.pantryControllerGetPantryDetail(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | パントリーID | defaults to undefined|


### Return type

**PantryDetailResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | パントリー詳細の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerGetPantryDetailsByUser**
> Array<PantryDetailResponseDto> pantryControllerGetPantryDetailsByUser()


### Example

```typescript
import {
    PantryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let userId: number; //ユーザーID (default to undefined)

const { status, data } = await apiInstance.pantryControllerGetPantryDetailsByUser(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | ユーザーID | defaults to undefined|


### Return type

**Array<PantryDetailResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザーに紐づくパントリー詳細の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pantryControllerUpdatePantry**
> PantryResponseDto pantryControllerUpdatePantry(createPantryRequestDto)


### Example

```typescript
import {
    PantryApi,
    Configuration,
    CreatePantryRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PantryApi(configuration);

let id: number; //パントリーID (default to undefined)
let createPantryRequestDto: CreatePantryRequestDto; //

const { status, data } = await apiInstance.pantryControllerUpdatePantry(
    id,
    createPantryRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPantryRequestDto** | **CreatePantryRequestDto**|  | |
| **id** | [**number**] | パントリーID | defaults to undefined|


### Return type

**PantryResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | パントリーの更新に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

