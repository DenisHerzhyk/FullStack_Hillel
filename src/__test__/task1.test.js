import { app, server } from '../server.mjs';
import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import request from 'supertest';

// MOCK для імітації бази даних
const mockUsers = new Map();
const mockArticles = new Map();

// ID, який гарантовано "не існує"
const NON_EXISTENT_ID = 'non-existent-id';

// Додавання тестових даних у МОКи
mockUsers.set('123', { name: 'Test User' });
mockArticles.set('456', { title: 'Test Article' });

// Мокуємо запити до сервера
const originalGet = app.get.bind(app);
const originalPost = app.post.bind(app);
const originalPut = app.put.bind(app);
const originalDelete = app.delete.bind(app);

describe('Express REST API', () => {
  beforeAll(() => {
    // Створюємо спай для запобігання виводу логів під час тестів
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Мокуємо маршрути сервера для тестування
    vi.spyOn(app, 'get').mockImplementation((path, ...handlers) => {
      // Обробляємо GET запити для неіснуючих ресурсів
      if (path === `/users/${NON_EXISTENT_ID}` || path === `/articles/${NON_EXISTENT_ID}`) {
        return app;
      }
      return originalGet(path, ...handlers);
    });
    
    vi.spyOn(app, 'post').mockImplementation((path, ...handlers) => {
      return originalPost(path, ...handlers);
    });
    
    vi.spyOn(app, 'put').mockImplementation((path, ...handlers) => {
      // Обробляємо PUT запити для неіснуючих ресурсів
      if (path === `/users/${NON_EXISTENT_ID}` || path === `/articles/${NON_EXISTENT_ID}`) {
        return app;
      }
      return originalPut(path, ...handlers);
    });
    
    vi.spyOn(app, 'delete').mockImplementation((path, ...handlers) => {
      // Обробляємо DELETE запити для неіснуючих ресурсів
      if (path === `/users/${NON_EXISTENT_ID}` || path === `/articles/${NON_EXISTENT_ID}`) {
        return app;
      }
      return originalDelete(path, ...handlers);
    });
  });
  
  afterEach(() => {
    // Очищаємо моки після кожного тесту
    vi.clearAllMocks();
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
    test('GET / повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get root route');
    });
  });
  
  // Тестування маршрутів "/users"
  describe('Users Routes', () => {
    test('GET /users повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get users route');
    });
    
    test('POST /users повинен повертати статус 201 та правильне повідомлення', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Test User' });
      
      expect(response.status).toBe(201);
      expect(response.text).toBe('Post users route');
    });
    
    test('GET /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get user by Id route: ${userId}`);
    });
    
    test('PUT /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'Updated User' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put user by Id route: ${userId}`);
    });
    
    test('DELETE /users/:userId повинен повертати статус 204 без вмісту', async () => {
      const userId = '123';
      const response = await request(app).delete(`/users/${userId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
  });
  
  // Тестування маршрутів "/articles"
  describe('Articles Routes', () => {
    test('GET /articles повинен повертати статус 200 та правильне повідомлення', async () => {
      const response = await request(app).get('/articles');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Get articles route');
    });
    
    test('POST /articles повинен повертати статус 201 та правильне повідомлення', async () => {
      const response = await request(app)
        .post('/articles')
        .send({ title: 'Test Article' });
      
      expect(response.status).toBe(201);
      expect(response.text).toBe('Post articles route');
    });
    
    test('GET /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app).get(`/articles/${articleId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get article by Id route: ${articleId}`);
    });
    
    test('PUT /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app)
        .put(`/articles/${articleId}`)
        .send({ title: 'Updated Article' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put article by Id route: ${articleId}`);
    });
    
    test('DELETE /articles/:articleId повинен повертати статус 204 без вмісту', async () => {
      const articleId = '456';
      const response = await request(app).delete(`/articles/${articleId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
  });
  
  // Тестування обробки помилок
  describe('Error Handling', () => {
    test('Запит до неіснуючого маршруту повинен повертати статус 404', async () => {
      const response = await request(app).get('/nonexistent-route');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
  });
});
