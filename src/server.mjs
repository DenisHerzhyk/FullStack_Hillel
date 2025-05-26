// Реалізація HTTP сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md
// Імпортуємо необхідні модулі
// Створюємо HTTP сервер
// Обов'язково експортувати створений сервер для тестів
import http from 'node:http'
import {parse} from 'node:querystring'
import htmlTemplate from './htmlTemplate.js';
import form from './form.js';
import setHeaderTemplate from './setHeaderTemplate.js';

const server = http.createServer(async (req, res) => {
    try {
        if (req.method == 'GET' && req.url == '/submit') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            res.end(form());
        }
        else if (req.method == 'POST' && req.url == '/submit') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const parsedBody = parse(body);
                const name = parsedBody.name || '';
                const email = parsedBody.email || '';
                
                if (!name || !email) {
                    const errMessage = htmlTemplate("Error", "Invalid form data");
                    res.statusCode = 400;
                    setHeaderTemplate(res, errMessage);
                    res.end(errMessage);
                }

                const loginResponse = `
                    <h1>Form Submitted</h1>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    `;
                res.statusCode = 200;
                setHeaderTemplate(res, loginResponse);
                res.end(loginResponse);
            });
        }
        else if (req.method == 'GET' && req.url == '/') {
            const message = htmlTemplate("Home","Welcome to the Home Page");
            res.statusCode = 200;
            setHeaderTemplate(res, message) 
            res.end(message);
        }
        else if (req.method == 'GET' && req.url == "/about") {
            const message = htmlTemplate("About", "Learn more about us");
            res.statusCode = 200;
            setHeaderTemplate(res, message)
            res.end(message)
        }
        else if (req.method == 'GET' && req.url == "/contact") {
            const message = htmlTemplate("Contact", "Get in touch");
            res.statusCode = 200;
            setHeaderTemplate(res, message)
            res.end(message)
        }
        else if (req.method !== 'GET' && req.method !== 'POST') {
            const errMessage = htmlTemplate("405 Method Not Allowed", "Method Not Allowed");
            res.statusCode = 405;
            setHeaderTemplate(res, errMessage);
            res.end(errMessage);
        }
        else {
            const errMessage = htmlTemplate("404 Not Found", "Page Not Found");
            res.statusCode = 404;
            setHeaderTemplate(res, errMessage);
            res.end(errMessage);
        }
    }
    catch {
        const errMessage = htmlTemplate("500 Internal Server Error", "Server Error");
        res.statusCode = 500;
        setHeaderTemplate(res, errMessage)
        res.end(errMessage);
    }
})

server.listen(3000, () => {
    console.log("PORT 3000 in usage");
})

export { server };
