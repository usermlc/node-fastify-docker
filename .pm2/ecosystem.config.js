const fs = require('node:fs'); // Import the fs (filesystem) module from Node.js
const os = require('node:os'); // Import the os (operating system) module from Node.js

const dotenv = require('dotenv'); // Import the dotenv package for loading environment variables

// Determine which environment file to use (prod.env or .env)
const envFile = fs.existsSync('./prod.env') ? './prod.env' : './.env';

// Load environment variables from the chosen file
dotenv.config({ path: envFile });

console.log(`[PM2] Loaded environment variables from: ${envFile}`); // Log the loaded environment file

module.exports = {
  apps: [
    {
      name: 'node-fastify-docker-integration', // Application name
      script: './server.js', // Entry point script for the application
      exec_mode: 'cluster', // Enable cluster mode for better performance and reliability
      max_memory_restart: '500M', // Restart the application if it uses more than 500MB of memory
      instances: Math.min(4, os.cpus().length), // Number of instances to run (use 4 or the number of CPUs available)
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development', // Default environment is 'development'
      },
      env_production: {
        NODE_ENV: 'production', // Set NODE_ENV to 'production' for production environment
        APP_PORT: process.env.APP_PORT || 3000, // Application port, defaults to 3000
        APP_HOST: process.env.APP_HOST || '0.0.0.0', // Application host, defaults to '0.0.0.0'
        PRISMA_SYNC_DB: process.env.PRISMA_SYNC_DB || 'false', // Environment variable for Prisma database sync
        PRISMA_REBUILD_CLIENT: process.env.PRISMA_REBUILD_CLIENT, // Environment variable for Prisma client rebuild
        APP_PG_DATABASE_URL: process.env.APP_PG_DATABASE_URL, // Postgres database URL
        APP_MONGO_DATABASE_URL: process.env.APP_MONGO_DATABASE_URL, // MongoDB database URL
      },
    },
  ],
};
