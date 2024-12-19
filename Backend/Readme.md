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


#### Response ####

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


