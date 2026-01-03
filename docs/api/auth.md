# Authentication API Endpoints

This document provides details for the authentication endpoints exposed by the FastAPI backend.

## Base URL

`/api/v1/auth`

---

## 1. User Registration (Sign Up)

### `POST /api/v1/auth/signup`

Registers a new user in the system.

**Request Body:** `application/json`
```json
{
  "email": "user@example.com",
  "password": "strongpassword123",
  "full_name": "John Doe"
}
```

**Response (Success - `200 OK`):** `application/json`
Returns an access token upon successful registration and automatic login.
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Response (Error - `400 Bad Request`):** `application/json`
If the email is already registered or password strength requirements are not met.
```json
{
  "detail": "Email already registered"
}
```
---

## 2. User Login

### `POST /api/v1/auth/login`

Authenticates a user and provides an access token.

**Request Body:** `application/json`
```json
{
  "email": "user@example.com",
  "password": "strongpassword123"
}
```

**Response (Success - `200 OK`):** `application/json`
Returns an access token upon successful login.
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Response (Error - `401 Unauthorized`):** `application/json`
If the email or password is incorrect.
```json
{
  "detail": "Incorrect email or password"
}
```
---

## 3. User Logout

### `POST /api/v1/auth/logout`

Logs out the current user. In a stateless JWT system, this primarily signals the client to discard its token.

**Request Body:** None (Authentication via `Authorization` header required but token is discarded client-side)

**Response (Success - `200 OK`):** `application/json`
```json
{
  "message": "Successfully logged out"
}
```
---

## 4. Get Current User Information

### `GET /api/v1/auth/me`

Retrieves information about the currently authenticated user.

**Request Headers:**
`Authorization: Bearer <access_token>`

**Response (Success - `200 OK`):** `application/json`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe"
}
```

**Response (Error - `401 Unauthorized`):** `application/json`
If no valid token is provided or the token is invalid/expired.
```json
{
  "detail": "Could not validate credentials"
}
```
---
