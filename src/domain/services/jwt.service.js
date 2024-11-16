const jwt = require('jsonwebtoken');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('./../../../config');

/**
 * @implements {Services.IJwtService}
 */
class JwtService {
  #accessTokenSecret;
  #refreshTokenSecret;

  constructor() {
    // Use secrets from configuration
    this.#accessTokenSecret = ACCESS_TOKEN_SECRET;
    this.#refreshTokenSecret = REFRESH_TOKEN_SECRET;
  }

  /**
   * Generate an access token with a default lifespan of 15 minutes
   * @param {Object} payload - Data to encode in the token
   * @returns {string} - The generated token
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, this.#accessTokenSecret, { expiresIn: '15m' });
  }

  /**
   * Generate a refresh token with configurable expiration
   * @param {Object} payload - Data to encode in the token
   * @param {number} expiresAt - Expiration timestamp (optional)
   * @returns {string} - The generated refresh token
   */
  generateRefreshToken(payload, expiresAt) {
    const expirationOptions = expiresAt
      ? { expiresIn: Math.max(0, expiresAt - Date.now()) } // Avoid negative expiration
      : { expiresIn: '7d' };

    return jwt.sign(payload, this.#refreshTokenSecret, expirationOptions);
  }

  /**
   * Validate an access token and return its decoded payload
   * @param {string} token - The token to validate
   * @returns {Object|null} - The decoded payload or null if invalid
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.#accessTokenSecret);
    } catch {
      return null;
    }
  }

  /**
   * Validate a refresh token and return its decoded payload
   * @param {string} token - The token to validate
   * @returns {Object|null} - The decoded payload or null if invalid
   */
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.#refreshTokenSecret);
    } catch {
      return null;
    }
  }
}

module.exports = { jwtService: new JwtService() };
