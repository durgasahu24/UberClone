# UberClone Backend API Documentation

## Register

### POST /users/register

Register a new user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Success** (201):
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

- **Client Error** (400):
  - When required fields are missing:
    ```json
    {
      "errors": [
        {
          "msg": "All fields are required",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```
  - When validation fails:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```
  - When user already exists:
    ```json
    {
      "message": "User already exist"
    }
    ```

#### Notes

- The `fullname.firstname` field must be at least 3 characters long.
- The `password` field must be at least 6 characters long.
- The `email` field must be a valid email address.


### POST /users/login

This endpoint is used to log in an existing user.

#### Request

- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }

#### Response 

- **Success** (200):
```json
    {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
```

- **Client Error** (400):
  - When required fields are missing:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Unauthorized** (401):
  - When credentials are invalid:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```


# profile 

### GET /users/profile

This endpoint is used to get the profile of the logged-in user.

#### Request

- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`

#### Response

- **Success** (200):
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }

- **Unauthorized** (401):
  - When credentials are invalid:
    ```json
    {
      "message": "Unauthorized"
    }
  ```


## LogOut 

### GET /users/logout

This endpoint is used to logout user blacklist the token provided in cookie or headers .

- **Success** (200):
- When the user is logout:
  ```json
      {
        "message": "Logged out"
      }
  ```


# captain

## POST /captains/register

Register a new captain.

### Request

- **URL**: `/captains/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }


#### Response 

- **Success** (201):
 ```json
   {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  } 
 ```


 
- **Client Error** (400):
  - When required fields are missing:
    ```json
        {
      "errors": [
        {
          "msg": "All fields are required",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```
     - When validation fails:
    ```json
        {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Invalid vehicle type",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

    - When user already exists:
    ```json
    {
      "message": "Captain already exist"
    }
    ```


# Login

## POST /captain/login

This endpoint is used to log in an existing captain.

### Request

- **URL**: `/captain/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }


#### Response 

- **Success** (201):
```json
    {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
```

_ **client errors**(400):
 - When required fields are missing:
  ```json
    {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **Unauthorized** (401):
 - When credentials are invalid:
  ```json
      {
        "message": "Invalid email or password"
      }
  ```

# Profile 
## GET/captain/profile 

- **URL**: `/captain/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`


### Response 

_**Success**(200) : 
```json
    {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "status": "inactive",
      "location": {
        "ltd": null,
        "lng": null
      }
    }
  }
  ```

  _**Unauthorsed**(401) : 
  When the token is missing or invalid : 
  ```json
    {
    "message": "Unauthorized"
    }
  ```

# LogOut 

## GET /captain/logout

This endpoint is used to logout user blacklist the token provided in cookie or headers .

- **Success** (200):
- When the captain is logout:
  ```json
      {
        "message": "Logged out"
      }
  ```


  _**Unauthorsed**(401) : 
  When the token is missing or invalid : 
  ```json
    {
    "message": "Unauthorized"
    }
    ```

# Fare 

## Get Fare 

### POST /rides/create


Get the fare for a ride between two addresses.

#### Request

- **URL**: `/rides/get-fare`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`
- **Query parameter**:
  ```json
  {
    "pickup": "pickup_address",
    "destination": "destination_address",
  }


### Response 

_**Success**(200) : 
 ```json
{
  "auto": 50,
  "car": 100,
  "moto": 30
}
 ```
 

_**client Error**(400) : 
```json 
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid destination",
      "param": "destination",
      "location": "query"
    }
  ]
}
```


_**Server Error**(500) : 
```json
{
  "message": "Internal server error"
}
```



# Confirm ride 

### POST/rides/confirm


#### Request

- **URL**: `/rides/confirm`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`
  - `Content-Type:applcation/json `

  


- **Body**:
  ```json
  {
    "rideId": "ride_id"
  }

#### Response

- **Success** (200):
  ```json
  {
  "_id": "ride_id",
  "user": "user_id",
  "captain": "captain_id",
  "pickup": "pickup_address",
  "destination": "destination_address",
  "fare": 100,
  "otp": "123456",
  "status": "accepted"
  }
  ```

 
 _**client Error**(400) : 
  ```json 
{
  "errors": [
    {
      "msg": "Invalid ride id",
      "param": "rideId",
      "location": "body"
    }
  ]
}
```


_**Server Error**(500) : 
```json
{
  "message": "Internal server error"
}
```



# Start Ride 

### GET /rides/start-ride

Start a ride by the captain.

#### Request

- **URL**: `/rides/start-ride`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`

#### Query Parameters : 

- **rideId**: `The ride ID`
- **OTP**: `The OTP for the ride`


#### Response

- **Success** (200):
  ```json
   {
  "_id": "ride_id",
  "user": "user_id",
  "captain": "captain_id",
  "pickup": "pickup_address",
  "destination": "destination_address",
  "fare": 100,
  "otp": "123456",
  "status": "ongoing"
   }

- **Client Error** (400):
    ```json
        {
      "errors": [
        {
          "msg": "Invalid ride id",
          "param": "rideId",
          "location": "query"
        },
        {
          "msg": "Invalid OTP",
          "param": "otp",
          "location": "query"
        }
      ]
    }
  ```

- **Server Error** (400):
    ```json
      {
      "message": "Internal server error"
     }
  ```

# End Ride 

### POST/rides/start-ride

End a ride by the captain.

#### Request

- **URL**: `/rides/end-ride`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`
  - `Content-Type: application/json`

#### Body : 
```json
{
  "rideId": "ride_id"
}
```

#### Response

- **Success** (200):
  ```json
  {
  "_id": "ride_id",
  "user": "user_id",
  "captain": "captain_id",
  "pickup": "pickup_address",
  "destination": "destination_address",
  "fare": 100,
  "otp": "123456",
  "status": "completed"
  }

- **Client Error** (400):
    ```json
        {
      "errors": [
        {
          "msg": "Invalid ride id",
          "param": "rideId",
          "location": "body"
        }
      ]
    }
  ```

- **Server Error** (400):
    ```json
            {
        "message": "Internal server error"
      }
  ```

  
  # Map Routes
  
  ## Get Coordinates
  
  ### GET /maps/get-coordinates
  
  Get the coordinates (latitude and longitude) of an address.
  
  #### Request
  
  - **URL**: `/maps/get-coordinates`
  - **Method**: `GET`
  - **Headers**: 
    - `Authorization: Bearer <jwt_token>`
  - **Query Parameters**:
    - `address`: The address to get coordinates for.
  
  #### Response
  
  - **Success** (200):
    ```json
    {
      "lat": "latitude_value",
      "lon": "longitude_value"
    }
    ```
  
  - **Client Error** (400):
    ```json
    {
    "errors": [
      {
        "msg": "Invalid address",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```
  
  - **Not Found** (404):
    ```json
     {
      "message": "Coordinates not found"
      }
    ```



    
# Get Distance and Time

## GET/maps/get-distance-time

Get the distance and time between two addresses.

#### Request

- **URL**: `/maps/get-distance-time`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`
- **Query parameter**:
  ```json
  {
    "origin": "The origin address",
    "destination": "The destination address. ",
  }


### Response 

_**Success**(200) : 
 ```json
{
  "distance": "distance_value",
  "duration": "duration_value"
}
 ```
 

_**client Error**(400) : 
```json 
{
  "errors": [
    {
      "msg": "Invalid origin",
      "param": "origin",
      "location": "query"
    },
    {
      "msg": "Invalid destination",
      "param": "destination",
      "location": "query"
    }
  ]
}
```


_**Server Error**(500) : 
```json
{
  "message": "Internal server error"
}
```
    
# Get Suggestion

## GET/maps/get-suggestions

Get autocomplete suggestions for an address input.

#### Request

- **URL**: `/maps/get-suggestions`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <jwt_token>`
- **Query parameter**:
  ```json
  {
    "input": "The address input to get suggestions for.",
  }


### Response 

_**Success**(200) : 
 ```json
[
  "suggestion1",
  "suggestion2",
  "suggestion3"
]
 ```
 

_**client Error**(400) : 
```json 
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "input",
      "location": "query"
    }
  ]
}
```


_**Server Error**(500) : 
```json
{
  "message": "Internal server error"
}
```




  