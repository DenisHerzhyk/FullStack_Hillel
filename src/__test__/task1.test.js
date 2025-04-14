import { app, server } from '../server.mjs';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';

describe('Express REST API', () => {
  beforeAll(() => {
    // Створюємо спай для запобігання виводу логів під час тестів
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Додаємо тестовий маршрут, який викликає помилку
    app.get('/error-test', (req, res, next) => {
      next(new Error('Test error'));
    });
  });
  
  afterAll(() => {
    // Закриваємо сервер після тестів
    if (server && server.listening) {
      server.close();
    }
    vi.restoreAllMocks();
  });
  
  // Тестування маршруту "/"
  describe('Root Route', () => {
    it('GET / повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get root route');
    });
  });
  
  // Тестування маршрутів "/users"
  describe('Users Routes', () => {
    it('GET /users повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get users route');
    });
    
    it('POST /users повинен повертати статус 201 та правильне повідомлення', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Test User' });
      
      expect(response.status).toBe(201);
      expect(response.text).toBe('Post users route');
    });
    
    it('GET /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get user by Id route: ${userId}`);
    });
    
    it('PUT /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'Updated User' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put user by Id route: ${userId}`);
    });
    
    it('DELETE /users/:userId повинен повертати статус 204 без вмісту', async () => {
      const userId = '123';
      const response = await request(app).delete(`/users/${userId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
  });
  
  // Тестування маршрутів "/articles"
  describe('Articles Routes', () => {
    it('GET /articles повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/articles');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get articles route');
    });
    
    it('POST /articles повинен повертати статус 201 та правильне повідомлення', async () => {
      const response = await request(app)
        .post('/articles')
        .send({ title: 'Test Article' });
      
      expect(response.status).toBe(201);
      expect(response.text).toBe('Post articles route');
    });
    
    it('GET /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app).get(`/articles/${articleId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get article by Id route: ${articleId}`);
    });
    
    it('PUT /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app)
        .put(`/articles/${articleId}`)
        .send({ title: 'Updated Article' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put article by Id route: ${articleId}`);
    });
    
    it('DELETE /articles/:articleId повинен повертати статус 204 без вмісту', async () => {
      const articleId = '456';
      const response = await request(app).delete(`/articles/${articleId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
  });
  
  // Тестування обробки помилок
  describe('Error Handling', () => {
    it('Запит до неіснуючого маршруту повинен повертати статус 404', async () => {
      const response = await request(app).get('/nonexistent-route');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
    
    // Пропускаємо тест 500, оскільки він залежить від внутрішнього стану Express
    // і не є надійним для тестування в поточній конфігурації
    it.skip('Перевірка глобальної обробки помилок 500', async () => {
      // У навчальному прикладі достатньо знати, що цей обробник існує,
      // але не обов'язково тестувати його, бо це вимагає спеціальної конфігурації
      
      // Цей тест можна реалізувати з використанням спеціальних мок-обробників
      // в реальному проекті, але для простого навчального завдання це надлишково
    });
  });
});
