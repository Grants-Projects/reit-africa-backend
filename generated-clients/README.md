# @Grants-Projects/reit-africa-api-client

JavaScript/Typescript client for reit-africa service.

- API version: 1.0.0
- Package version: 1.0.1-SNAPSHOT.168598969


## Installation

* [Configure your NPM repository](https://github.com/Grants-Projects/artifacts/#npmyarn---nodejs--typescript) to point to the GitHub package repository
* Run NPM or Yarn installation:

```shell
npm install --save @Grants-Projects/reit-africa-api-client
```

## Using Generated API Clients

All URIs are relative to *https://api.reit-africa*, this can however be overwritten by changing the configuration.

## API Client Configuration
The example below shows how to create configuration file for your API clients. The preferred way to specify auth token is by using the [Authenticator class](https://github.com/NestcoinCo/artifacts/tree/dev/nodejs-libs/service-authenticator#using-authenticator-with-api-clients) from the service-authenticator package to instantiate API clients.

```typescript
// config.ts
import ReitAfrica from '@Grants-Projects/reit-africa-api-client';
// alternative: import { Configuration } from '@Grants-Projects/reit-africa-api-client';

export const config = new ReitAfrica.Configuration();

// set new basePath, if ONLY you wish to override default basePath set in SDK, e.g. for development environment.
config.basePath = 'https://my-custom-api-base.nestcoin.com';


// auth: authToken
// API Key authentication, e.g. auth token.
config.apiKey = '_AUTH_TOKEN_';
/**
 * alternatively, you can specify a function, that returns Promise<string>, where, the promise resolves
 * to a valid apiKey
 */
config.apiKey = async () => authTokenProvider.getToken();

// auth: bearerToken
// bearer token, specify bearer token
config.accessToken = '_BEARER TOKEN_';
/**
* alternatively, you can specify a function, that returns Promise<string>, where, the promise resolves
* to a valid accessToken
* e.g.
*/
config.accessToken = async () => authTokenProvider.getToken();
```

## Summary of API Operations
Below is a list of API operations, which are available within reit-africa service.

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
**ReitAfrica.AuthApi** | [**loginUser**](#loginUser) | **POST** /api/v1/auth/login | Endpoint to login users
**ReitAfrica.OnboardingApi** | [**registerUser**](#registerUser) | **POST** /api/v1/onboarding/ | Endpoint to signup users



## ReitAfrica.AuthApi

### loginUser

> LoginResponse loginUser(opts)

Endpoint to login users

**Example**
For details about `config` object, see the section on [Client Configuration](#api-client-configuration)

```typescript
import ReitAfrica from '@Grants-Projects/reit-africa-api-client';
import {config} from './path/to/config.ts';

const apiInstance = new ReitAfrica.AuthApi(config);
const opts = {
  'userLogin': '' // UserLogin | 
};

apiInstance.loginUser(opts).then(({data}) => { 
   // data is an instance of ReitAfrica.LoginResponse
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
```

**Parameters**


Name | Type | Location | Description  | Notes
------------- | ------------- | ------------- | ------------- | -------------
 **userLogin** | [**UserLogin**](#ReitAfricaUserLogin)|body|  | [optional] 


**Return Type**

[**LoginResponse**](#ReitAfricaLoginResponse)

**Authorization**

[bearerToken](#bearerToken)

**HTTP request headers**

- **Content-Type**: application/json
- **Accept**: application/json



## ReitAfrica.OnboardingApi

### registerUser

> SignupResponse registerUser(opts)

Endpoint to signup users

**Example**
For details about `config` object, see the section on [Client Configuration](#api-client-configuration)

```typescript
import ReitAfrica from '@Grants-Projects/reit-africa-api-client';
import {config} from './path/to/config.ts';

const apiInstance = new ReitAfrica.OnboardingApi(config);
const opts = {
  'userSignup': '' // UserSignup | 
};

apiInstance.registerUser(opts).then(({data}) => { 
   // data is an instance of ReitAfrica.SignupResponse
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});
```

**Parameters**


Name | Type | Location | Description  | Notes
------------- | ------------- | ------------- | ------------- | -------------
 **userSignup** | [**UserSignup**](#ReitAfricaUserSignup)|body|  | [optional] 


**Return Type**

[**SignupResponse**](#ReitAfricaSignupResponse)

**Authorization**

[bearerToken](#bearerToken)

**HTTP request headers**

- **Content-Type**: application/json
- **Accept**: application/json





## API Models
This is a list of available API models.

### ReitAfrica.LoginResponse

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accessToken** | *string* | authorizes a valid user | [optional] 



### ReitAfrica.SignupResponse

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | *string* | The id of the User | 
**firstName** | *string* | The firstname of user | 
**lastName** | *string* | The lastname of user | 
**email** | *string* | The email of  user | 
**address** | *string* | user\&#39;s address | [optional] 
**walletBalance** | *string* | user\&#39;s wallet | [optional] 
**createdAt** | *string* | created date | [optional] 
**updatedAt** | *string* | updated at | [optional] 



### ReitAfrica.SignupResponseAllOf

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | *string* | user\&#39;s address | [optional] 
**walletBalance** | *string* | user\&#39;s wallet | [optional] 
**createdAt** | *string* | created date | [optional] 
**updatedAt** | *string* | updated at | [optional] 



### ReitAfrica.SuccessMessage

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | *boolean* | Returns a true to state that action was successful | [optional] 
**message** | *string* | Message for successful operation | [optional] 



### ReitAfrica.User

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | *string* | The id of the User | 
**firstName** | *string* | The firstname of user | 
**lastName** | *string* | The lastname of user | 
**email** | *string* | The email of  user | 



### ReitAfrica.UserLogin

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | *string* | The email of the User attempting login | 
**appPubKey** | *string* | app pubkey | 
**idToken** | *string* | id token | 



### ReitAfrica.UserSignup

#### Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**firstName** | *string* | The fullname of User to be added | 
**lastName** | *string* | The fullname of User to be added | 
**email** | *string* | User\&#39;s email | 
**address** | *string* | User\&#39;s address | 
**appPubKey** | *string* | web3 auth pubkey | 
**idToken** | *string* | id token generated from web3 token | 




## Documentation for Authorization



### authToken


- **Type**: API key
- **API key parameter name**: x-auth-token
- **Location**: HTTP header



### bearerToken

- **Type**: Bearer authentication (JWT)

