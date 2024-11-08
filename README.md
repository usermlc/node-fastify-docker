# Fastify Docker Integration with PostgreSQL and MongoDB

## Table of Contents
- Overview
- Key Features
- Setup and Usage
- File Structure
- API Endpoints
- Contributions
- License

## Overview
This project sets up a **Fastify** server in a Docker environment, orchestrated with **Docker Compose**. The server integrates with **PostgreSQL** and **MongoDB** databases, providing CRUD operations for resources in each database. **Nginx** is used as a reverse proxy to route API requests and serve static files.

## Key Features
- **Fastify REST API**: Supports CRUD operations for managing resources in PostgreSQL and MongoDB.
- **Swagger Documentation**: Available at `/api/docs`, with Basic Authentication enabled for restricted access.
- **Nginx**: Routes API requests to the Fastify backend and serves static files, with caching to improve performance.
- **Docker**: Fully containerized for easy deployment and scaling with Docker Compose.

## Usage

### Setup and Deployment
1. **Install Docker and Docker Compose**: Make sure these tools are installed on your system.

2. **Configure Environment Variables**:
   - Create a `.env` file and set up the required environment variables, such as database credentials and other configurations.

3. **Run the Application**:
   - Use the following command to build and start the containers:
     ```bash
     docker-compose up --build
     ```

### Access the Application
- **API Endpoints**:
  - **PostgreSQL**:
    - `GET http://localhost/api/pg/resources` - Fetch all resources.
    - `GET http://localhost/api/pg/resources/:id` - Retrieve a resource by ID.
    - `POST http://localhost/api/pg/resources` - Create a new resource.
    - `PUT http://localhost/api/pg/resources/:id` - Update an existing resource.
    - `DELETE http://localhost/api/pg/resources/:id` - Delete a resource by ID.
  - **MongoDB**:
    - `GET http://localhost/api/mongo/resources` - Fetch all resources.
    - `GET http://localhost/api/mongo/resources/:id` - Retrieve a resource by ID.
    - `POST http://localhost/api/mongo/resources` - Add a new resource.
    - `PUT http://localhost/api/mongo/resources/:id` - Modify an existing resource.
    - `DELETE http://localhost/api/mongo/resources/:id` - Remove a resource by ID.

- **Nginx Static Files**:
  - Access static files at `http://localhost` in your browser.

## File Structure
- `html/`: Contains static HTML files served by Nginx.
  - `404.html`: Custom 404 error page.
- `nginx/`: Nginx configuration files.
  - `nginx.conf`: Sets up routes and reverse proxy configuration.
- `static/`: Assets such as icons and images.
  - `favicon.svg`: Application icon.
- `app.js`: Main Fastify server file.
- `docker-compose.yml`: Defines Docker services for Fastify, PostgreSQL, and MongoDB.
- `Dockerfile`: Instructions for building the Fastify application image.
- `LICENSE`: License for the project.
- `package.json`: Node.js dependencies and metadata.

## API Endpoints
### Product Endpoints
- `GET /api/products`: Retrieve all products.
- `GET /api/products/:id`: Retrieve a product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product by ID.
- `DELETE /api/products/:id`: Delete a product by ID.

### User Cart Endpoints
- `GET /api/user/cart`: Retrieve the user’s cart.
- `POST /api/user/cart`: Add a product to the cart.
- `DELETE /api/user/cart/:id`: Remove a product from the cart.
- `POST /api/user/cart/checkout`: Checkout the cart and create a receipt.

### User Endpoints
- `GET /api/user/:id`: Retrieve a user by ID.
- `POST /api/user`: Create a new user.
- `GET /api/user/receipts`: Retrieve all receipts for the user.
- `GET /api/user/receipts/:id`: Retrieve a receipt by ID.

### Receipts Endpoints
- `GET /api/user/receipts/:id`: Retrieve a specific receipt by ID.
- `GET /api/user/receipts`: Retrieve a list of all receipts.

### Additional Endpoints
- **Swagger Documentation**: Available at `/api/docs` (protected with Basic Authentication).
- **Static Files**:
  - `/`: Serves `index.html` and other static HTML files.
  - `/static/`: Caches static assets for seven days.

### Nginx Configuration Highlights
- **API Proxying**: Routes `/api` requests to the Fastify server, removing the `/api` prefix.
- **Swagger Documentation Protection**: `/api/docs` is secured with Basic Authentication.
- **Static File Caching**: Files served from `/docs/static/` are cached for seven days.

## Contributions
Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
