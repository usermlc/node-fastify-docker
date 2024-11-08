const { CartItem } = require('./CartItem');

/**
 * @implements {Entities.Cart}
 */
class Cart {
  /**
   * Initializes a new Cart instance with the given fields.
   * @param {EntityFields.Cart} fields - The essential fields to create a cart.
   */
  constructor(fields) {
    const { id, userId, items = [] } = fields;
    this.id = id;
    this.userId = userId;
    this.items = items;
  }
  removeItem(productId, quantity) {
    throw new Error('Method not implemented.');
  }
  clear() {
    throw new Error('Method not implemented.');
  }

  /**
   * Adds a product to the cart or updates the quantity if it already exists.
   * @param {Entities.Product} product - The product to add.
   * @param {number} quantity - The quantity to add (defaults to 1).
   */
  addItem(product, quantity = 1) {
    const item = this.items.find((cartItem) => cartItem.product.id === product.id);

    if (item) {
      item.quantity += quantity;
    } else {
      this.items.push(new CartItem({ product, quantity }));
    }
  }

  /**
   * Reduces the quantity of a product in the cart, or removes it if the quantity falls to zero.
   * @param {string} productId - ID of the product to remove or decrease.
   * @param {number} quantity - Quantity to decrease (defaults to 1).
   */
  decreaseItemQuantity(productId, quantity = 1) {
    const index = this.items.findIndex((cartItem) => cartItem.product.id === productId);

    if (index === -1) {
      throw new Error('Item not found in cart');
    }

    const item = this.items[index];
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      this.items.splice(index, 1); // Remove item if quantity is zero or less
    }
  }

  /**
   * Empties the cart, removing all items.
   */
  emptyCart() {
    this.items = [];
  }
}

module.exports = { Cart };
