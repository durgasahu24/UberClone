# UberClone Backend API Documentation

## Endpoints

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

