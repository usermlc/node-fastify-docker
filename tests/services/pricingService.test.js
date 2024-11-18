const assert = require('node:assert');
const { describe, it } = require('node:test');
const { pricingService } = require('../../src/domain/services/pricing.service');

describe('PricingService', () => {
  it('💰 Повинен коректно обчислювати загальну суму кошика з урахуванням знижок і податків', () => {
    const cart = { items: [{ product: { price: 100 }, quantity: 2 }] }; // Приклад кошика з одним товаром
    // @ts-ignore - детальна реалізація не потрібна для тесту
    const total = pricingService.calculateTotal(cart); // Обчислення загальної суми кошика

    // Перевіряємо, чи правильно застосовані знижки та податки
    assert.strictEqual(total, 189, 'Загальна сума має враховувати знижки і податки');
  });

  it('🛍️ Повинен обчислювати суму для окремого товару', () => {
    const item = { product: { price: 50 }, quantity: 2 }; // Приклад товару з ціною і кількістю
    // @ts-ignore - детальна реалізація не потрібна для тесту
    const itemTotal = pricingService.calculateItemTotal(item); // Обчислення суми для товару

    // Перевіряємо, чи сума відповідає ціні товару, помноженій на кількість
    assert.strictEqual(
      itemTotal,
      100,
      'Сума для товару повинна відповідати ціні, помноженій на кількість'
    );
  });
});
