# Table of Contents

1. users

    - [show user](#show-user)
    
    - [show all users](#show-all-users)

    - [create user](#create-user)

    - [update user](#update-user)

    - [delete user](#delete-user)

2. auth

    - [ login ](#login)
    
    - [register](#register)

    - [profile](#profile)

3. password

    - [send otp](#send-otp)

    - [verify otp](#verify-otp)

    - [Reset Password](#reset-password)

4. notifications

    a. show notifications

    b. delete notification

5. orders

    a. show orders

# Users

  <a id="show-user"></a>
## Show User

*Returns json data about a single user.*

- **URL**

  /users/:id

- **Method**

  `GET`

- **URL Params**

  **Required**

  `id=[integer]`

- **Query Params**

  none

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200
  
  
      **Content:** 
        
        {
          "id": 1,
          "firstName": "Denen",
          "lastName": "Awar",
          "email": "awardenen@gmail.com",
          "phoneNumber": "08076129062",
          "birthDate": "2024-11-01",
          "gender": "male",
          "bloodGroup": "A",
          "height": 35.5,
          "weight": 60,
          "activityLevel": "sedentary",
          "foodPreferences": "nonVegetarian",
          "occupation": "Software Developer",
          "role": "user",
          "createdAt": "2024-11-08T08:44:59.000Z"
        }

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

        { 
          status: "Unauthorized"
        }

    OR    

  - **Code:** 404 NOT FOUND

      **Content:** 

        {
          "message": "User not found"
        }

    OR

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { 
          message: 'Error fetching user', 
          error: (Error message)
        }


<a id="show-all-users"></a>
## Get all Users

*Returns a list of users in the database.*

- **URL**

  /users

- **Method**

  `GET`

- **URL Params**

  none

- **Query Params**

  none

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200
  
      **Content:** 
        
        [
          {
              "id": 1,
              "firstName": "Denen",
              "lastName": "Awar",
              "email": "awardenen@gmail.com",
              "phoneNumber": "08076129062",
              "birthDate": "2024-11-01",
              "gender": "male",
              "bloodGroup": "A",
              "height": 35.5,
              "weight": 60,
              "activityLevel": "sedentary",
              "foodPreferences": "nonVegetarian",
              "occupation": "Software Developer",
              "role": "user",
              "createdAt": "2024-11-08T08:44:59.000Z"
          },...
        ]

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

        { 
          status: "Unauthorized"
        }

    OR

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { 
          message: 'Error retrieving users', 
          error: (Error message)
        }

<a id="create-user"></a>
## Create Users

*Create a new user.*

- **URL**

  /users/create

- **Method**

  `POST`

- **URL Params**

  none

- **Query Params**

  none

- **Data Params**

  - **firstName:** `string`
  - **lastName:** `string`
  - **email:** `string` (Required)
  - **phoneNumber:** `string` (Required)
  - **birthDate:** `string`
  - **gender:** `string`
  - **bloodGroup:** `string`
  - **height:** `number`
  - **weight:** `number`
  - **activityLevel:** `string`
  - **foodPreferences:** `string` (Required)
  - **password:** `string`
  - **role:** `string`

- **Success Response:**

  - **Code:** 200
  
      **Content:** 

        same as show user

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

        { 
          status: "Unauthorized"
        }

    OR

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { 
          message: 'Error creating user', 
          error: (Error message)
        }

        <a id="update-user"></a>
## Update User

*Update an existing user.*

- **URL**

  /users/update/:id

- **Method**

  `PUT`

- **URL Params**

  `[id=integer]`

- **Query Params**

  none

- **Data Params**

  - **firstName:** `string`
  - **lastName:** `string`
  - **email:** `string` 
  - **phoneNumber:** `string` 
  - **birthDate:** `string`
  - **gender:** `string`
  - **bloodGroup:** `string`
  - **height:** `number`
  - **weight:** `number`
  - **activityLevel:** `string`
  - **foodPreferences:** `string`
  - **password:** `string`
  - **role:** `string`

- **Success Response:**

  - **Code:** 200
  
      **Content:** 

        same as show user

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

        { 
          status: "Unauthorized"
        }

    OR

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { 
          message: 'Error updating user', 
          error: (Error message)
        }


<a id="delete-user"></a>

## Delete User

*Delete an existing user.*

- **URL**

  /users/delete/:id

- **Method**

  `DELETE`

- **URL Params**

  `[id=integer]`

- **Query Params**

  none

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200
  
      **Content:** 

        {
          message: 'User deleted successfully'
        }

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

        { 
          status: "Unauthorized"
        }

    OR

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { 
          message: 'Error deleting user', 
          error: (Error message)
        }

# Auth

<a id="login"></a>

## login

*Login an existing user.*

- **URL**

  /auth/:status/login

- **Method**

  `POST`

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  - **email:** `string` (required)
  - **password:** `string` (required)

- **Success Response:**

  - **Code:** 200

      **Content:**

        {
          "message": "Login successful",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJlbWFpbCI6ImF3YXJhc29uQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTczMTA5MTYxMCwiZXhwIjoxNzMxMDk1MjEwfQ.znNi443S04Kue2ooROZGTNB9hoemfUsbGYekDsezogs"
        }

- **Error Response:**

  - **Code:** 400 BAD REQUEST

      **Content:** 

        { 
          error: "Invalid email"
        }

    OR

        {
          error: "Invalid password"
        }

  
<a id="register"></a>

## register

*Register a new user.*

- **URL**

  /auth/:status/register

- **Method**

  `POST`

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  - **email:** `string` (required)
  - **password:** `string` (required)
  - **phone:** `string` (required)

- **Success Response:**

  - **Code:** 200

      **Content:**

        {
          "message": "User created successfully",
          "user": {
            "id": 1,
            "email": "test@gmail.com",
            "phone": "1234567890",
            "role": "user"
          }
        }

- **Error Response:**

  - **Code:** 400 BAD REQUEST

      **Content:** 

          { 
            error: "Email already exists"
          }
        
    OR

        {
          error: "Email already exists"
        }

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

        { message: "Error creating user", error: error.message }

<a id="profile"></a>

## user profile

*get the profile of logged in user.*

- **URL**

  /auth/:status/me

- **Method**

  `POST`

- **Header Params**

  - **Authorization:** `string [Bearer Token]` (required)

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200

      **Content:**

        same a show user

- **Error Response:**

  - **Code:** 400 BAD REQUEST

      **Content:** 

          { 
            status: "Unauthorized"
          }

      OR 
          {
            "error" : "User not found"
          }

          #send-otp

<a id="#send-otp"></a>

## Send OTP

*send an email otp.*

- **URL**

  /:status/password/reset/request-otp

- **Method**

  `POST`

- **Header Params**

  - **Authorization:** `string [Bearer Token]` (unprotected for now)

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  - **email:** `string` (required)

- **Success Response:**

  - **Code:** 200

      **Content:**

        {
            message: 'OTP sent to your email',
            otp: (string),
            emailSendStatus: ['success', 'failed'],
            token: (string)
        }

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR

      **Content:** 

          { 
            message: "Internal server error",
            error: (json)
          }

   - **Code:** 404 NOT FOUND

      **Content:** 
          {
            "error" : "User not found"
          }


    <a id="#verify-otp"></a>

## Verify OTP

*verify the email otp.*

- **URL**

  /:status/password/reset/verify-otp
- **Method**

  `POST`

- **Header Params**

  - **Authorization:** `string [Bearer Token]`

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  - **email:** `string` (required)
  - **otp:** `string` (required)

- **Success Response:**

  - **Code:** 200

      **Content:**

        {
          message: 'Password reset approved',
          token: (string)
        }

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED

      **Content:** 

          { 
            error: "Unauthorized"
          }


    <a id="#reset-password"></a>

## Reset Password

*Reset your password.*

- **URL**

  /:status/password/reset/reset_password

- **Method**

  `POST`

- **Header Params**

  - **Authorization:** `string [Bearer Token]`

- **URL Params**

  `[status=string (user, provider)]`

- **Query Params**

  none

- **Data Params**

  - **password:** `string` (required)
  - **confirmPassword:** `string` (required)

- **Success Response:**

  - **Code:** 200

      **Content:**

        {
           message: 'Password reset successful'
        }

- **Error Response:**
 
 - **Code:** 400 BAD REQUEST

      **Content:** 

          { 
            error:  "Passwords do not match"
          }


  - **Code:** 401 UNAUTHORIZED

      **Content:** 

          { 
            error: "Unauthorized"
          }

        



