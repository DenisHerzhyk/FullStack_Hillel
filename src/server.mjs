// Реалізація HTTP сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md

import http from 'http';
import url from 'url';
import querystring from 'querystring';

// Константи
const PORT = 3000;
const MAX_REQUEST_SIZE = 1024 * 1024; // 1MB

// HTML шаблон
const generateHTML = (title, content) => `<!DOCTYPE html>
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

// Сторінки
const PAGES = {
  '/': { title: 'Home', content: 'Welcome to the Home Page' },
  '/about': { title: 'About', content: 'Learn more about us' },
  '/contact': { title: 'Contact', content: 'Get in touch' }
};

// Створення сервера
const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url || '/', true).pathname;
  
  // Обробка GET запитів
  if (req.method === 'GET') {
    if (PAGES[pathname]) {
      const { title, content } = PAGES[pathname];
      sendHTML(res, 200, generateHTML(title, content));
    } else {
      sendHTML(res, 404, generateHTML('Error 404', 'Page Not Found'));
    }
    return;
  }
  
  // Обробка POST запитів
  if (req.method === 'POST' && pathname === '/submit') {
    let body = '';
    let size = 0;
    
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_REQUEST_SIZE) {
        sendHTML(res, 413, generateHTML('Error 413', 'Payload Too Large'));
        req.destroy();
        return;
      }
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { name, email } = querystring.parse(body);
        
        // Валідація
        if (!name || !email) {
          sendHTML(res, 400, generateHTML('Error 400', 'Invalid form data'));
          return;
        }
        
        // Мінімальна санітизація (вимога ТЗ) - заміна < на &lt;
        const safeName = String(name).replace(/</g, '&lt;');
        const safeEmail = String(email).replace(/</g, '&lt;');
        
        sendHTML(res, 200, generateHTML(
          'Form Submitted',
          `Name: ${safeName}<br>Email: ${safeEmail}`
        ));
      } catch (error) {
        sendHTML(res, 500, generateHTML('Error 500', 'Server Error'));
      }
    });
    return;
  }
  
  // Інші запити
  if (req.method === 'POST') {
    sendHTML(res, 404, generateHTML('Error 404', 'Endpoint Not Found'));
  } else {
    sendHTML(res, 405, generateHTML('Error 405', 'Method Not Allowed'));
  }
});

// Відправка HTML відповіді
function sendHTML(res, statusCode, html) {
  const buffer = Buffer.from(html);
  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': buffer.length,
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(buffer);
}

// Функція для запуску сервера
const startServer = (port = PORT) => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });
  });
};

// Запускаємо сервер, якщо файл викликано напряму
if (process.argv[1] === import.meta.url) {
  startServer();
}

export { server, startServer };
