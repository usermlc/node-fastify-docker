/**
 * @implements {Entities.Product}
 */
class Product {
  /**
   * Creates a new Product instance with the specified attributes.
   * @param {EntityFields.Product} attributes - Required fields to define a product.
   */
  constructor(attributes) {
    const { id, name, description, price, releaseDate } = attributes;
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.releaseDate = releaseDate ? new Date(releaseDate) : new Date();
  }

  /**
   * Provides a formatted summary of the product details.
   * @returns {string} A summary of the product.
   */
  getProductSummary() {
    return `${this.name}: ${this.description} - $${this.price}`;
  }
}

module.exports = { Product };
