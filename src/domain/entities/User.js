/**
 * @implements {Entities.User}
 */
class User {
  /**
   * Initializes a new User instance with the specified fields.
   * @param {EntityFields.User} fields - The fields required for creating a user.
   */
  constructor(fields) {
    const { id, cartRef } = fields;
    this.id = id;
    this.cartRef = cartRef ?? null;
  }

  /**
   * Checks if the user has an active cart.
   * @returns {boolean} True if a cart reference exists; otherwise, false.
   */
  hasCart() {
    return this.cartRef !== null;
  }
}

module.exports = { User };
