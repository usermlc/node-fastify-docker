const { HttpException } = require('../../../presentation/errors/http'); // Import custom HttpException for handling HTTP errors

const { redisClient } = require('./../../../infra/database/redis'); // Import the Redis client instance

class ListProductsAction {
  /**
   * @param {Object} dependencies - Dependencies required by the action
   * @param {Repositories.IProductRepository} dependencies.productRepository - Product repository interface
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository; // Initialize product repository
  }

  /**
   * Retrieves a list of products based on filters.
   * @param {Object} filters - Filters to apply when retrieving products
   * @param {string} [filters.term] - Search term for filtering products
   * @param {number} [filters.limit] - Limit the number of results
   * @param {number} [filters.offset] - Offset for pagination
   * @param {string} [filters.sort] - Sort order for results
   * @returns {Promise<Entities.ProductsList>} - List of products
   */
  async execute(filters) {
    const cacheKey = `Products:${this.normalizeFilters(filters)}`; // Create a unique cache key based on filters

    const cachedProducts = await redisClient.get(cacheKey); // Retrieve cached products from Redis

    if (cachedProducts) {
      const products = JSON.parse(cachedProducts); // Parse the cached JSON string

      if (products.items.length === 0) {
        throw new HttpException(404, 'No products found'); // Throw an exception if no products are found
      }

      return products; // Return the cached products
    }

    const products = await this.productRepository.find(filters); // Retrieve products from the repository

    // Cache the result for 1 hour to reduce load on the database
    redisClient.set(cacheKey, JSON.stringify(products), 'EX', 3600); // Don't wait for the cache to be set, return the products immediately

    if (products.items.length === 0) {
      throw new HttpException(404, 'No products found'); // Throw an exception if no products are found
    }

    return products; // Return the products retrieved from the repository
  }

  /**
   * Normalizes the filters object for consistent cache key generation.
   * @param {Object} filters - Filters to normalize
   * @returns {string} - Normalized and stringified filters
   */
  normalizeFilters(filters) {
    // Convert the object into sorted entries
    const sortedEntries = Object.entries(filters).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    ); // Sort by keys alphabetically

    // Convert sorted entries back into an object to ensure JSON.stringify order
    const normalizedObject = Object.fromEntries(sortedEntries);

    // Stringify the normalized object
    return JSON.stringify(normalizedObject);
  }
}

module.exports = { ListProductsAction }; // Export the ListProductsAction class for use in other modules
