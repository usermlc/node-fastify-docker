# Fastify API Example

A simple Fastify-based REST API for managing resources (CRUD operations).

## Installation

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Get all resources

- **URL**: `/api/resources`
- **Method**: `GET`
- **Description**: Retrieves all resources.

### 2. Get a resource by ID

- **URL**: `/api/resources/:id`
- **Method**: `GET`
- **Description**: Retrieves a single resource by its ID.

### 3. Create a new resource

- **URL**: `/api/resources`
- **Method**: `POST`
- **Description**: Creates a new resource.
- **Body**:
  ```json
  {
    "name": "Resource Name",
    "description": "Resource Description"
  }
  ```

### 4. Update a resource by ID

- **URL**: `/api/resources/:id`
- **Method**: `PUT`
- **Description**: Updates an existing resource by ID.
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description"
  }
  ```

### 5. Delete a resource by ID

- **URL**: `/api/resources/:id`
- **Method**: `DELETE`
- **Description**: Deletes a resource by its ID.

## License

This project is licensed under the MIT License.
