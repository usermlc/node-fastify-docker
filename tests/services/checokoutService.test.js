const assert = require('node:assert');
const { mock, describe, it } = require('node:test');
const {
  CheckoutService,
} = require('../../src/domain/services/checkout.service');
const { pricingService } = require('../../src/domain/services/pricing.service');

// Моки для залежностей CheckoutService
const mockUserRepository = {
  // Отримання користувача за ID (імітується запит до бази даних)
  getById: async (id) => (id === '1' ? { id, username: 'testuser' } : null),
};

const mockCartRepository = {
  // Отримання даних кошика для конкретного користувача
  getByUserId: async (userId) =>
    userId === '1'
      ? { items: [{ product: { id: '101', price: 50 }, quantity: 2 }] }
      : null,
  // Видалення кошика після успішного оформлення замовлення
  deleteByUserId: mock.fn(async (userId) => (userId === '1' ? true : null)),
};

const mockReceiptRepository = {
  // Збереження інформації про створений чек
  save: async (receipt) => receipt,
};

// Ініціалізація CheckoutService (цей блок залишаємо без змін)
const checkoutService = new CheckoutService({
  // @ts-ignore - no need for full implementation
  cartRepository: mockCartRepository,
  // @ts-ignore - no need for full implementation
  receiptRepository: mockReceiptRepository,
  // @ts-ignore - no need for full implementation
  userRepository: mockUserRepository,
  pricingService,
});

// Тестовий набір для CheckoutService
describe('CheckoutService', () => {
  it('🛒 Повинен створювати чек та очищувати кошик після checkout', async () => {
    const userId = '1'; // Ідентифікатор користувача
    const receipt = await checkoutService.checkout(userId); // Виклик функції checkout

    // Перевірка, що чек містить правильний userId
    assert.strictEqual(
      receipt.userId,
      userId,
      'Чек має містити ID користувача, що оформив замовлення'
    );

    // Перевірка, що метод видалення кошика викликаний один раз
    assert.strictEqual(
      mockCartRepository.deleteByUserId.mock.callCount(),
      1,
      'Кошик повинен бути очищений після оформлення замовлення'
    );

    // Перевірка, що чек містить загальну суму
    assert.ok(receipt.totalAmount, 'Чек повинен містити загальну суму замовлення');

    // Перевірка, що у чеку присутні товари
    assert.ok(receipt.items.length > 0, 'Чек має містити список товарів');
  });
});
