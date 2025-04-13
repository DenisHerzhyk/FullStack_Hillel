// Простий HTTP сервер

import http from 'http';
import url from 'url';
import querystring from 'querystring';

// Константи
const PORT = 3000;

// HTML шаблон
const html = (title, content) => `<!DOCTYPE html>
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

// Зчитування тіла запиту
const readBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => resolve(body));
  });
};

// Створення сервера
const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url || '/', true).pathname;
  
  // GET запити
  if (req.method === 'GET') {
    if (PAGES[pathname]) {
      const { title, content } = PAGES[pathname];
      send(res, 200, html(title, content));
    } else {
      send(res, 404, html('Error 404', 'Page Not Found'));
    }
    return;
  }
  
  // POST запити
  if (req.method === 'POST' && pathname === '/submit') {
    const body = await readBody(req);
    const { name, email } = querystring.parse(body);
    
    // Валідація
    if (!name || !email) {
      send(res, 400, html('Error 400', 'Invalid form data'));
      return;
    }
    
    // Мінімальна санітизація
    const safeName = String(name).replace(/</g, '&lt;');
    const safeEmail = String(email).replace(/</g, '&lt;');
    
    send(res, 200, html('Form Submitted', `Name: ${safeName}<br>Email: ${safeEmail}`));
    return;
  }
  
  // Інші запити
  if (req.method === 'POST') {
    send(res, 404, html('Error 404', 'Endpoint Not Found'));
  } else {
    send(res, 405, html('Error 405', 'Method Not Allowed'));
  }
});

// Відправка відповіді
function send(res, status, content) {
  const buffer = Buffer.from(content);
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': buffer.length,
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(buffer);
}

// Запуск сервера
const startServer = (port = PORT) => {
  return new Promise(resolve => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });
  });
};

if (process.argv[1] === import.meta.url) {
  startServer();
}

export { server, startServer };
