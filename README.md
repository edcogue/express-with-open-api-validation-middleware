# Express CRUD API - User Management

A well-organized Express.js API with TypeScript for managing users with in-memory storage, featuring comprehensive OpenAPI validation and documentation.

## Features

- **Clean Architecture**: Organized with models, repositories, services, controllers, and routes
- **Dependency Injection**: Using TSyringe for proper dependency management
- **TypeScript**: Full type safety throughout the application
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for users
- **OpenAPI Integration**: Full OpenAPI 3.0 specification with request/response validation
- **Interactive Documentation**: Swagger UI for easy API exploration and testing
- **Request Validation**: Automatic validation of request bodies, parameters, and query strings
- **Response Validation**: Ensures all responses conform to OpenAPI schema
- **In-Memory Storage**: Simple array-based storage with automatic ID generation
- **Health Check**: Built-in health monitoring endpoint

## Project Structure

```
src/
├── config/
│   └── swagger.ts           # OpenAPI/Swagger configuration
├── controllers/
│   └── UserController.ts    # User route handlers
├── models/
│   └── User.ts              # User interfaces and DTOs
├── repositories/
│   └── UserRepository.ts    # User data access layer
├── routes/
│   └── userRoutes.ts        # User API routes
├── services/
│   └── UserService.ts       # User business logic
├── index.ts                 # Application entry point
└── openapi.yaml             # OpenAPI 3.0 specification
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm start
```

The server will start on port 3000 (or the PORT environment variable).

## OpenAPI Integration

### Interactive Documentation

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI Spec**: http://localhost:3000/openapi.json

### Validation Features

#### Request Validation

- **Body Validation**: Automatically validates request bodies against OpenAPI schemas
- **Parameter Validation**: Validates path and query parameters
- **Type Coercion**: Automatically converts string parameters to appropriate types
- **Format Validation**: Validates email formats, date formats, etc.
- **Enum Validation**: Ensures status fields match allowed values
- **Required Fields**: Validates that all required fields are present

#### Response Validation

- **Schema Compliance**: Ensures all responses match OpenAPI specifications
- **Type Safety**: Guarantees response structure consistency

#### Error Responses

Invalid requests return detailed validation errors:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "/body/email",
      "message": "must match format \"email\"",
      "errorCode": "format.openapi.validation"
    }
  ]
}
```

### Testing Validation

You can test the API validation by sending invalid requests to see how the OpenAPI validation middleware handles them.

## API Endpoints

### Health Check

#### Get Health Status

```
GET /health
```

Returns the health status of the API including timestamp and version information.

### Users API

#### Get All Users

```
GET /api/users
```

#### Get User by ID

```
GET /api/users/:id
```

#### Create User

```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

#### Update User

```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@company.com",
  "department": "Marketing"
}
```

#### Delete User

```
DELETE /api/users/:id
```

## Data Models

### User

```typescript
{
  id: string;
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Sample Data

The application starts with an prepopulated users array. You can create users via the API and they will be stored in memory during the application runtime.

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or business rule violations
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Unexpected server errors

All errors return JSON with an `error` message:

```json
{
  "error": "User not found"
}
```

## Architecture Notes

- **Dependency Injection**: Uses TSyringe for clean dependency management
- **Separation of Concerns**: Clear separation between data access, business logic, and presentation layers
- **Type Safety**: Full TypeScript coverage with interfaces and DTOs
- **Memory Storage**: Simple in-memory arrays with auto-incrementing IDs
- **Business Logic**: Services handle validation and business rules
- **RESTful Design**: Following REST conventions for URLs and HTTP methods
- **OpenAPI Validation**: Comprehensive request and response validation using OpenAPI specification

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Check API health
curl http://localhost:3000/health

# Get all users
curl http://localhost:3000/api/users

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@company.com","department":"Testing"}'

# Get a specific user
curl http://localhost:3000/api/users/1

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User","email":"updated@company.com","department":"Engineering"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1
```
