# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerCreateUser**](#usercontrollercreateuser) | **POST** /users | |
|[**userControllerDeleteUser**](#usercontrollerdeleteuser) | **DELETE** /users/{id} | |
|[**userControllerGetUser**](#usercontrollergetuser) | **GET** /users/{id} | |
|[**userControllerGetUserByLineUid**](#usercontrollergetuserbylineuid) | **GET** /users/by-line-uid/{lineUid} | |
|[**userControllerGetUserDetail**](#usercontrollergetuserdetail) | **GET** /users/{id}/detail | |
|[**userControllerGetUserDetailByLineUid**](#usercontrollergetuserdetailbylineuid) | **GET** /users/by-line-uid/{lineUid}/detail | |
|[**userControllerGetUsers**](#usercontrollergetusers) | **GET** /users | |
|[**userControllerUpdateUser**](#usercontrollerupdateuser) | **PUT** /users/{id} | |

# **userControllerCreateUser**
> UserResponseDto userControllerCreateUser(createUserRequestDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    CreateUserRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createUserRequestDto: CreateUserRequestDto; //

const { status, data } = await apiInstance.userControllerCreateUser(
    createUserRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserRequestDto** | **CreateUserRequestDto**|  | |


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | ユーザーの作成に成功しました |  -  |
|**400** | 不正なリクエスト |  -  |
|**500** | サーバーエラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerDeleteUser**
> userControllerDeleteUser()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; //ユーザーID (default to undefined)

const { status, data } = await apiInstance.userControllerDeleteUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ユーザーID | defaults to undefined|


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
|**204** | ユーザーの削除に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUser**
> UserResponseDto userControllerGetUser()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; //ユーザーID (default to undefined)

const { status, data } = await apiInstance.userControllerGetUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ユーザーID | defaults to undefined|


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザーの取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserByLineUid**
> UserResponseDto userControllerGetUserByLineUid()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let lineUid: string; //LINE UID (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserByLineUid(
    lineUid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lineUid** | [**string**] | LINE UID | defaults to undefined|


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | LINE UID によるユーザー取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserDetail**
> UserDetailResponseDto userControllerGetUserDetail()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; //ユーザーID (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserDetail(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ユーザーID | defaults to undefined|


### Return type

**UserDetailResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザー詳細の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserDetailByLineUid**
> UserDetailResponseDto userControllerGetUserDetailByLineUid()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let lineUid: string; //LINE UID (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserDetailByLineUid(
    lineUid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lineUid** | [**string**] | LINE UID | defaults to undefined|


### Return type

**UserDetailResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | LINE UID によるユーザー詳細取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUsers**
> Array<UserResponseDto> userControllerGetUsers()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerGetUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザー一覧の取得に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUpdateUser**
> UserResponseDto userControllerUpdateUser(createUserRequestDto)


### Example

```typescript
import {
    UserApi,
    Configuration,
    CreateUserRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; //ユーザーID (default to undefined)
let createUserRequestDto: CreateUserRequestDto; //

const { status, data } = await apiInstance.userControllerUpdateUser(
    id,
    createUserRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserRequestDto** | **CreateUserRequestDto**|  | |
| **id** | [**number**] | ユーザーID | defaults to undefined|


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ユーザーの更新に成功しました |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

