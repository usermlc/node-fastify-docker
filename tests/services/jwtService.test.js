const assert = require('node:assert');
const { describe, it } = require('node:test');
const { jwtService } = require('../../src/domain/services/jwt.service');

// Тестові дані для перевірки JWT
const payload = { userId: '1', sessionId: 'session123' };

describe('JwtService', () => {
  it('🔐 Повинен створювати валідний access токен і коректно його перевіряти', () => {
    const token = jwtService.generateAccessToken(payload); // Генерація токена
    const decoded = jwtService.verifyAccessToken(token); // Перевірка токена

    // Перевіряємо, чи userId у токені збігається з оригінальними даними
    assert.strictEqual(
      // @ts-ignore - userId існує у декодованому токені
      decoded.userId,
      payload.userId,
      'userId у декодованому токені повинен відповідати переданим даним'
    );
  });

  it('🔄 Повинен створювати валідний refresh токен і коректно його перевіряти', () => {
    const token = jwtService.generateRefreshToken(payload); // Генерація рефреш-токена
    const decoded = jwtService.verifyRefreshToken(token); // Перевірка токена

    // Перевіряємо, чи userId у токені збігається з очікуваними даними
    assert.strictEqual(
      // @ts-ignore - userId є валідною властивістю
      decoded.userId,
      payload.userId,
      'userId у декодованому токені повинен відповідати переданим даним'
    );
  });

  it('🚫 Повинен повертати null для невалідного access токена', () => {
    const decoded = jwtService.verifyAccessToken('invalidToken'); // Перевірка невалідного токена

    // Перевіряємо, що результат є null
    assert.strictEqual(decoded, null, 'Невалідний токен повинен повертати null');
  });

  it('🚫 Повинен повертати null для невалідного refresh токена', () => {
    const decoded = jwtService.verifyRefreshToken('invalidToken'); // Перевірка невалідного токена

    // Перевіряємо, що результат є null
    assert.strictEqual(decoded, null, 'Невалідний токен повинен повертати null');
  });
});
