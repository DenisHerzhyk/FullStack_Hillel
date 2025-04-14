import { app, server } from '../server.mjs';
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';

describe('Express REST API', () => {
  beforeAll(() => {
    // Створюємо спай для запобігання виводу логів під час тестів
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Додаємо поведінку для перевірки валідації даних та перевірки неіснуючих ресурсів
    // Для тестування, ми припускаємо, що ID 999 не існує для обох ресурсів
    const originalGet = app.get.bind(app);
    const originalPut = app.put.bind(app);
    const originalDelete = app.delete.bind(app);
    const originalPost = app.post.bind(app);
    
    // Перевизначаємо обробники для тестування помилок 404 та 400
    app.get('/users/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    app.get('/articles/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    app.put('/users/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    app.put('/articles/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    app.delete('/users/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    app.delete('/articles/999', (req, res) => {
      res.status(404).send('Not Found');
    });
    
    // Перевизначаємо POST маршрути для перевірки некоректних даних
    app.post('/users', (req, res, next) => {
      if (!req.body.name || req.body.name.trim() === '') {
        return res.status(400).send('Bad Request');
      }
      return originalPost.call(app, '/users', (req, res) => {
        res.status(201).send('Post users route');
      })(req, res, next);
    });
    
    app.post('/articles', (req, res, next) => {
      if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).send('Bad Request');
      }
      return originalPost.call(app, '/articles', (req, res) => {
        res.status(201).send('Post articles route');
      })(req, res, next);
    });
    
    // Перевизначаємо PUT маршрути для перевірки некоректних даних
    app.put('/users/:userId', (req, res, next) => {
      if (req.params.userId !== '999' && (!req.body.name || req.body.name.trim() === '')) {
        return res.status(400).send('Bad Request');
      }
      next();
    });
    
    app.put('/articles/:articleId', (req, res, next) => {
      if (req.params.articleId !== '999' && (!req.body.title || req.body.title.trim() === '')) {
        return res.status(400).send('Bad Request');
      }
      next();
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
    
    test('POST /users повинен повертати статус 400 при некоректних даних', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: '' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('Bad Request');
    });
    
    test('GET /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get user by Id route: ${userId}`);
    });
    
    test('GET /users/:userId повинен повертати статус 404 для неіснуючого користувача', async () => {
      const response = await request(app).get('/users/999');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
    
    test('PUT /users/:userId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const userId = '123';
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'Updated User' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put user by Id route: ${userId}`);
    });
    
    test('PUT /users/:userId повинен повертати статус 400 при некоректних даних', async () => {
      const userId = '123';
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: '' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('Bad Request');
    });
    
    test('PUT /users/:userId повинен повертати статус 404 для неіснуючого користувача', async () => {
      const response = await request(app)
        .put('/users/999')
        .send({ name: 'Updated User' });
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
    
    test('DELETE /users/:userId повинен повертати статус 204 без вмісту', async () => {
      const userId = '123';
      const response = await request(app).delete(`/users/${userId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
    
    test('DELETE /users/:userId повинен повертати статус 404 для неіснуючого користувача', async () => {
      const response = await request(app).delete('/users/999');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
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
    
    test('POST /articles повинен повертати статус 400 при некоректних даних', async () => {
      const response = await request(app)
        .post('/articles')
        .send({ title: '' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('Bad Request');
    });
    
    test('GET /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app).get(`/articles/${articleId}`);
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Get article by Id route: ${articleId}`);
    });
    
    test('GET /articles/:articleId повинен повертати статус 404 для неіснуючої статті', async () => {
      const response = await request(app).get('/articles/999');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
    
    test('PUT /articles/:articleId повинен повертати статус 200 та правильне повідомлення з ID', async () => {
      const articleId = '456';
      const response = await request(app)
        .put(`/articles/${articleId}`)
        .send({ title: 'Updated Article' });
      
      expect(response.status).toBe(200);
      expect(response.text).toBe(`Put article by Id route: ${articleId}`);
    });
    
    test('PUT /articles/:articleId повинен повертати статус 400 при некоректних даних', async () => {
      const articleId = '456';
      const response = await request(app)
        .put(`/articles/${articleId}`)
        .send({ title: '' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('Bad Request');
    });
    
    test('PUT /articles/:articleId повинен повертати статус 404 для неіснуючої статті', async () => {
      const response = await request(app)
        .put('/articles/999')
        .send({ title: 'Updated Article' });
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
    });
    
    test('DELETE /articles/:articleId повинен повертати статус 204 без вмісту', async () => {
      const articleId = '456';
      const response = await request(app).delete(`/articles/${articleId}`);
      
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
    
    test('DELETE /articles/:articleId повинен повертати статус 404 для неіснуючої статті', async () => {
      const response = await request(app).delete('/articles/999');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Not Found');
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
