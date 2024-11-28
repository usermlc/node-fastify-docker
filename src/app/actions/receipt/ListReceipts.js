const { HttpException } = require('../../../presentation/errors/http'); // Import custom HttpException for handling HTTP errors

const { redisClient } = require('./../../../infra/database/redis'); // Import the Redis client instance

class ListReceiptsForUserAction {
  /**
   * @param {Object} dependencies - Dependencies required by the action
   * @param {Repositories.IReceiptRepository} dependencies.receiptRepository - Receipt repository interface
   */
  constructor({ receiptRepository }) {
    this.receiptRepository = receiptRepository; // Initialize receipt repository
  }

  /**
   * Retrieves all receipts for a user.
   * @param {string} userId - ID of the user to retrieve receipts for
   * @returns {Promise<Entities.Receipt[]>} - List of receipts for the user
   */
  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required'); // Throw an error if user ID is not provided
    }

    const cacheKey = `Receipts:${userId}`; // Create a unique cache key based on user ID

    const cachedReceipts = await redisClient.get(cacheKey); // Retrieve cached receipts from Redis

    if (cachedReceipts) {
      const receipts = JSON.parse(cachedReceipts); // Parse the cached JSON string

      if (receipts.length === 0) {
        throw new HttpException(404, 'No receipts found'); // Throw an exception if no receipts are found
      }

      return receipts; // Return the cached receipts
    }

    const receipts = await this.receiptRepository.getByUserId(userId); // Retrieve receipts from the repository

    // Cache the result for 1 hour to reduce load on the database
    redisClient.set(cacheKey, JSON.stringify(receipts), 'EX', 3600); // Don't wait for the cache to be set, return the receipts immediately

    if (receipts.length === 0) {
      throw new HttpException(404, 'No receipts found'); // Throw an exception if no receipts are found
    }

    return receipts; // Return the receipts retrieved from the repository
  }
}

module.exports = { ListReceiptsForUserAction }; // Export the ListReceiptsForUserAction class for use in other modules
