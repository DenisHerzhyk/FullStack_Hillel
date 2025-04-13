// Реалізація HTTP сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md

import http from 'http';
import url from 'url';
import querystring from 'querystring';

// Конфігурація порту сервера
const PORT = process.env.PORT || 3000;

// Максимальний розмір запиту (1MB)
const MAX_REQUEST_SIZE = 1024 * 1024;

// Генерація HTML сторінок
const generateHTML = (title, content) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <p>${content}</p>
</body>
</html>`;
};

// Сторінки для різних маршрутів
const pages = {
  '/': {
    title: 'Home',
    content: 'Welcome to the Home Page'
  },
  '/about': {
    title: 'About',
    content: 'Learn more about us'
  },
  '/contact': {
    title: 'Contact',
    content: 'Get in touch'
  }
};

// Санітизація введення для запобігання XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Відправка відповіді
const sendResponse = (res, statusCode, content, headers = {}) => {
  const buffer = Buffer.from(content, 'utf-8');
  
  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': buffer.length,
    'X-Content-Type-Options': 'nosniff',
    ...headers
  });
  
  res.end(buffer);
};

// Відправка помилки
const sendError = (res, statusCode, message) => {
  const errorHTML = generateHTML(`Error ${statusCode}`, message);
  sendResponse(res, statusCode, errorHTML);
};

// Обробник GET-запитів
const handleGET = (req, res, pathname) => {
  if (pages[pathname]) {
    const { title, content } = pages[pathname];
    const html = generateHTML(title, content);
    sendResponse(res, 200, html);
  } else {
    sendError(res, 404, 'Page Not Found');
  }
};

// Обробник POST-запитів
const handlePOST = (req, res, pathname) => {
  if (pathname === '/submit') {
    let body = '';
    let totalSize = 0;
    
    req.on('data', (chunk) => {
      // Перевірка розміру запиту
      totalSize += chunk.length;
      if (totalSize > MAX_REQUEST_SIZE) {
        sendError(res, 413, 'Payload Too Large');
        req.destroy();
        return;
      }
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        // Парсинг даних форми
        const formData = querystring.parse(body);
        const { name, email } = formData;
        
        // Валідація даних
        if (!name || !email) {
          sendError(res, 400, 'Invalid form data');
          return;
        }
        
        // Санітизація даних
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        
        // Генерація відповіді
        const confirmationHTML = generateHTML(
          'Form Submitted',
          `Name: ${sanitizedName}<br>Email: ${sanitizedEmail}`
        );
        
        sendResponse(res, 200, confirmationHTML);
      } catch (error) {
        sendError(res, 500, 'Server Error');
      }
    });
  } else {
    sendError(res, 404, 'Endpoint Not Found');
  }
};

// Створення HTTP сервера
const server = http.createServer((req, res) => {
  try {
    // Парсинг URL
    const parsedUrl = url.parse(req.url || '/', true);
    const pathname = parsedUrl.pathname;
    
    // Маршрутизація запитів
    switch (req.method) {
      case 'GET':
        handleGET(req, res, pathname);
        break;
      case 'POST':
        handlePOST(req, res, pathname);
        break;
      default:
        sendError(res, 405, 'Method Not Allowed');
    }
  } catch (error) {
    // Обробка неочікуваних помилок
    sendError(res, 500, 'Server Error');
  }
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Обробка помилок сервера
server.on('error', (error) => {
  console.error('Server error:', error.message);
});

export { server };
