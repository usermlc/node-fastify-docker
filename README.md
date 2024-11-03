# Fastify API with Docker, PostgreSQL, and MongoDB Integration

This project sets up a Fastify server in a Docker environment, providing seamless integration with PostgreSQL and MongoDB for database operations. It also uses Nginx as a reverse proxy for serving static files and routing API requests.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This repository demonstrates a Fastify-based REST API containerized with Docker, orchestrated with Docker Compose, and configured with Nginx for handling API requests and static assets. The API supports CRUD functionality for resources stored in both PostgreSQL and MongoDB databases.

## Features
- **Fastify REST API**: Offers CRUD operations for managing resources.
- **Dual Database Support**: Access PostgreSQL and MongoDB with dedicated endpoints.
- **Nginx Integration**: Routes requests to Fastify and serves static files.
- **Dockerized**: Fully containerized for quick deployment and scaling with Docker Compose.

### API Endpoints

#### PostgreSQL Endpoints
- **GET** `/api/pg/resources`: Fetch all resources.
- **GET** `/api/pg/resources/:id`: Retrieve a resource by its ID.
- **POST** `/api/pg/resources`: Add a new resource.
- **PUT** `/api/pg/resources/:id`: Modify an existing resource.
- **DELETE** `/api/pg/resources/:id`: Remove a resource by ID.

#### MongoDB Endpoints
- **GET** `/api/mongo/resources`: Fetch all resources.
- **GET** `/api/mongo/resources/:id`: Retrieve a resource by its ID.
- **POST** `/api/mongo/resources`: Add a new resource.
- **PUT** `/api/mongo/resources/:id`: Modify an existing resource.
- **DELETE** `/api/mongo/resources/:id`: Remove a resource by ID.

## Setup

### Prerequisites
Ensure you have **Docker** and **Docker Compose** installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sangariusss/node-fastify-docker-integration.git
   cd node-fastify-docker-integration
   ```
2. Configure environment variables:
   - Rename `.env.example` to `.env` and fill in the necessary database configurations.

3. Build and launch the application:
   ```bash
   docker-compose up --build
   ```

## Usage
Once the containers are up and running, you can access the API and static files as follows:

### Access the API
- PostgreSQL:
  - `GET http://localhost/api/pg/resources`: List all resources.
  - `GET http://localhost/api/pg/resources/:id`: Get a resource by ID.
  - `POST http://localhost/api/pg/resources`: Create a new resource (JSON payload required).
  - `PUT http://localhost/api/pg/resources/:id`: Update a resource by ID (JSON payload required).
  - `DELETE http://localhost/api/pg/resources/:id`: Delete a resource by ID.

- MongoDB:
  - `GET http://localhost/api/mongo/resources`: List all resources.
  - `GET http://localhost/api/mongo/resources/:id`: Get a resource by ID.
  - `POST http://localhost/api/mongo/resources`: Create a new resource (JSON payload required).
  - `PUT http://localhost/api/mongo/resources/:id`: Update a resource by ID (JSON payload required).
  - `DELETE http://localhost/api/mongo/resources/:id`: Delete a resource by ID.

- **Nginx**: Access static files via `http://localhost` in your browser.

## File Structure
- **`html/`**: Contains static HTML files.
  - `404.html`: Custom error page.
- **`nginx/`**: Nginx configuration files.
  - `nginx.conf`: Defines routes and proxy settings.
- **`static/`**: Assets for the application.
  - `favicon.svg`: Site icon.
- **`.dockerignore`**: Docker ignore file.
- **`.gitignore`**: Git ignore file.
- **`app.js`**: Main Fastify server file.
- **`docker-compose.yml`**: Docker Compose file to manage services.
- **`Dockerfile`**: Docker build instructions.
- **`package.json`**: Node dependencies and metadata.
- **`README.md`**: Documentation.

## Contributing
Contributions are highly appreciated! Feel free to fork the repository, make improvements, and submit a pull request. Please check for open issues or create one if you encounter a bug or have a feature request.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.