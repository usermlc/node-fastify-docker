const assert = require('assert');
const { randomUUID } = require('node:crypto');
const { describe, it } = require('node:test');
const bcrypt = require('bcrypt');

// Імпорт сервісу авторизації
const { AuthService } = require('../../src/domain/services/auth.service');

// Мок-репозиторій для імітації роботи з користувачами
const mockUserRepository = {
  // Метод для отримання користувача за його іменем
  getByUsername: async (username) => {
    if (username === 'testuser') {
      return {
        id: randomUUID(), // Генерація унікального ID
        username, // Ім'я користувача
        passwordHash: await bcrypt.hash('password', 10), // Імітація збереженого хешу пароля
      };
    }
    return null; // Повертаємо null, якщо користувача не знайдено
  },
  // Метод для збереження нового/оновленого користувача
  save: async (user) => user, // Просто повертаємо передані дані
};

// Мок-сервіс для роботи з JWT
const mockJwtService = {
  generateAccessToken: () => 'accessToken', // Імітація генерації access токена
  generateRefreshToken: () => 'refreshToken', // Імітація генерації refresh токена
};

// Створюємо екземпляр AuthService (цю частину не чіпаємо)
const authService = new AuthService({
  // @ts-ignore - no need for full implementation
  userRepository: mockUserRepository,
  // @ts-ignore - no need for full implementation
  jwtService: mockJwtService,
});

// Тести для сервісу авторизації
describe('AuthService', () => {
  it('🔒 Повинен генерувати хеш, який не збігається з паролем', async () => {
    const password = 'myPassword123'; // Оригінальний пароль
    const hash = await authService.generatePasswordHash(password); // Генерація хешу

    // Перевіряємо, що хеш і пароль не співпадають
    assert.notEqual(
      hash,
      password,
      'Згенерований хеш не повинен збігатися з паролем'
    );
  });

  it('✅ Повинен повертати користувача, якщо облікові дані правильні', async () => {
    const username = 'testuser';
    const password = 'password';

    const user = await authService.authenticateUser(username, password); // Виконуємо аутентифікацію

    // Перевіряємо, чи ім'я користувача відповідає очікуваному
    assert.strictEqual(
      user.username,
      username,
      'Ім\'я користувача повинно відповідати переданому значенню'
    );
  });

  it('🔑 Повинен повертати access і refresh токени при логіні', async () => {
    const { accessToken, refreshToken } = await authService.login(
      'testuser',
      'password'
    ); // Логін

    // Перевіряємо наявність токенів
    assert.ok(accessToken, 'Токен доступу повинен бути створений');
    assert.ok(refreshToken, 'Токен оновлення повинен бути створений');
  });
});
