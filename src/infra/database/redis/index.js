const { Redis } = require('ioredis'); // Import the Redis class from the 'ioredis' package
const { REDIS_HOST, REDIS_PORT } = require('../../../../config'); // Import the Redis host and port from the configuration file

// @ts-ignore - Ignore TypeScript errors for this line
const redisClient = new Redis({
  host: REDIS_HOST, // Set the host for Redis connection
  port: REDIS_PORT, // Set the port for Redis connection
});

// Event listener for successful connection to Redis
redisClient.on('connect', () => console.log('Connected to Redis'));

// Event listener for Redis connection errors
redisClient.on('error', (err) => console.error('Redis Error:', err));

module.exports = { redisClient }; // Export the Redis client instance for use in other modules
