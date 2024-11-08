/**
 * @implements {Entities.Receipt}
 */
class Receipt {
  /**
   * Initializes a new Receipt instance with the provided fields.
   * @param {EntityFields.Receipt} fields - Fields required to create a receipt instance.
   */
  constructor(fields) {
    const { id, userId, items, totalAmount, createdAt } = fields;
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  /**
   * Provides a brief description of the receipt.
   * @returns {string} A summary of the receipt details.
   */
  getSummary() {
    return `Receipt for user ${this.userId} with a total of ${this.totalAmount}`;
  }
}

module.exports = { Receipt };
