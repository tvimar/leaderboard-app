# Leaderboard App API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Currently, the API is open and does not require authentication.

## Response Format
All responses are returned in JSON format. Successful responses will have a 2xx status code, while errors will have a 4xx or 5xx status code.

## Endpoints

### Users

#### List All Users
```http
GET /users
```

Returns a list of all users.

**Response**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 25,
    "address": "123 Main St",
    "score": 100,
    "created_at": "2025-06-13T10:00:00.000000Z",
    "updated_at": "2025-06-13T10:00:00.000000Z"
  }
]
```

**Status Codes**
- `200` - Success

#### Create User
```http
POST /users
```

Create a new user.

**Request Body**
```json
{
  "name": "John Doe",
  "age": 25,
  "address": "123 Main St"
}
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | User's full name |
| age | integer | Yes | User's age (must be positive) |
| address | string | Yes | User's address |

**Response**
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 25,
  "address": "123 Main St",
  "score": 0,
  "created_at": "2025-06-13T10:00:00.000000Z",
  "updated_at": "2025-06-13T10:00:00.000000Z"
}
```

**Status Codes**
- `201` - Created successfully
- `422` - Validation error

#### Update User Score
```http
PUT /users/{id}
```

Update a user's score.

**Request Body**
```json
{
  "score": 100
}
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| score | integer | Yes | New score value (must be non-negative) |

**Response**
```json
{
  "id": 1,
  "name": "John Doe",
  "score": 100,
  "updated_at": "2025-06-13T10:00:00.000000Z"
}
```

**Status Codes**
- `200` - Updated successfully
- `404` - User not found
- `422` - Validation error

#### Delete User
```http
DELETE /users/{id}
```

Delete a user.

**Response**
```
204 No Content
```

**Status Codes**
- `204` - Deleted successfully
- `404` - User not found

### Score Management

#### Get Users Grouped by Score
```http
GET /users-by-score
```

Get users grouped by their scores with average age calculation.

**Response**
```json
{
  "100": {
    "names": ["John Doe", "Jane Smith"],
    "average_age": 27.5
  },
  "50": {
    "names": ["Bob Wilson"],
    "average_age": 30
  }
}
```

**Status Codes**
- `200` - Success

#### Get Current Winner
```http
GET /current-winner
```

Get the current winner's information.

**Response**
```json
{
  "winner": {
    "user_id": 1,
    "name": "John Doe",
    "score": 100
  },
  "current_score": 120
}
```

**Status Codes**
- `200` - Success

### QR Codes

#### List QR Codes
```http
GET /qr-codes
```

Get a list of all generated QR codes.

**Response**
```json
[
  "qr/user_1_address.png",
  "qr/user_2_address.png"
]
```

**Status Codes**
- `200` - Success

#### Get QR Code
```http
GET /qr-codes/{filename}
```

Get a specific QR code image.

**Response**
- Content-Type: image/png
- Binary image data

**Status Codes**
- `200` - Success
- `404` - QR code not found

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| confirm | boolean | Yes | Confirmation to reset scores |

**Response**
```json
{
  "message": "All user scores have been reset to 0"
}
```

**Status Codes**
- `200` - Reset successful
- `422` - Missing confirmation

## Error Responses

When an error occurs, the API will return a JSON response with an error message:

```json
{
  "error": "Error message here"
}
```

For validation errors (422), the response will include validation details:

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "name": [
      "The name field is required."
    ]
  }
}
```

## Background Jobs

The following operations trigger background jobs:
- Creating a user (Generates QR code)

## Changelog

### Version 1.0.0 (2025-06-13)
- Initial API release
- Basic CRUD operations for users
- Score management
- QR code generation and retrieval
- Winner tracking
