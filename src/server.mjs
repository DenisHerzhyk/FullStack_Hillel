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
                    const errMessage = "Invalid form data";
                    res.statusCode = 400;
                    setHeaderTemplate(res, errMessage);
                    return res.end(htmlTemplate("Error", errMessage));
                }

                const loginResponse = `
                    <h1>Form Submitted</h1>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    `;
                res.statusCode = 200;
                setHeaderTemplate(res, loginResponse);
                res.end(htmlTemplate("Form Submitted", loginResponse));
            });
        }
        else if (req.method == 'GET' && req.url == '/') {
            const message = "Welcome to the Home Page";
            res.statusCode = 200;
            setHeaderTemplate(res, message) 
            res.end(htmlTemplate("Home",message))
        }
        else if (req.method == 'GET' && req.url == "/about") {
            const message = "Learn more about us";
            res.statusCode = 200;
            setHeaderTemplate(res, message)
            res.end(htmlTemplate("About", message))
        }
        else if (req.method == 'GET' && req.url == "/contact") {
            const message = "Get in touch";
            res.statusCode = 200;
            setHeaderTemplate(res, message)
            res.end(htmlTemplate("Contact", message))
        }
        else if (req.method !== 'GET' && req.method !== 'POST') {
            const errMessage = "Method Not Allowed";
            res.statusCode = 405;
            setHeaderTemplate(res, errMessage);
            res.end(htmlTemplate("405 Method Not Allowed", errMessage));
        }
        else {
            const errMessage = "Page Not Found";
            res.statusCode = 404;
            setHeaderTemplate(res, errMessage);
            res.end(htmlTemplate("404 Not Found", errMessage));
        }
    }
    catch {
        const errMessage = "Server Error";
        res.statusCode = 500;
        setHeaderTemplate(res, errMessage)
        res.end(htmlTemplate("500 Internal Server Error", errMessage))
    }
})

server.listen(3000, () => {
    console.log("PORT 3000 in usage");
})

export { server };
