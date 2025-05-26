// Реалізація HTTP сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md
// Імпортуємо необхідні модулі
// Створюємо HTTP сервер
// Обов'язково експортувати створений сервер для тестів
import http from 'node:http'
import {parse} from 'node:querystring'
import htmlTemplate from './htmlTemplate.js';
import form from './form.js';
import setHeaderTemplate from './setHeaderTemplate.js';

const PORT = 3000;

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
                try {
                    const parsedBody = parse(body);

                    if (!('name' in parsedBody) || !('email' in parsedBody)) {
                        throw new Error("Invalid form data");
                    }

                    const name = parsedBody.name || '';
                    const email = parsedBody.email || '';
                    if (name == '' || email == '') {
                        const errMessage = htmlTemplate("400 Bade Request", "Invalid form data");
                        setHeaderTemplate(400, res, errMessage);
                        res.end(errMessage);
                        return;
                    }

                    const loginResponse = htmlTemplate('Form Submitted', `Name: ${name}<br/>Email: ${email}`);
                    setHeaderTemplate(200, res, loginResponse);
                    res.end(loginResponse);
                    return;
                }
                catch(error) {
                    const errMessage = htmlTemplate("Error 500", "Server Error");
                    setHeaderTemplate(500, res, errMessage);
                    res.end(errMessage);
                }
            });

            
        }
        else if (req.method == 'GET' && req.url == '/') {
            const message = htmlTemplate("Home","Welcome to the Home Page");
            setHeaderTemplate(200, res, message) 
            res.end(message);
        }
        else if (req.method == 'GET' && req.url == "/about") {
            const message = htmlTemplate("About", "Learn more about us");
            setHeaderTemplate(200, res, message)
            res.end(message)
        }
        else if (req.method == 'GET' && req.url == "/contact") {
            const message = htmlTemplate("Contact", "Get in touch");
            setHeaderTemplate(200, res, message)
            res.end(message)
        }
        else if (req.method !== 'GET' && req.method !== 'POST') {
            const errMessage = htmlTemplate("405 Method Not Allowed", "Method Not Allowed");
            setHeaderTemplate(405, res, errMessage);
            res.end(errMessage);
        }
        else {
            const errMessage = htmlTemplate("404 Not Found", "Page Not Found");
            setHeaderTemplate(404, res, errMessage);
            res.end(errMessage);
        }
    }
    catch {
        const errMessage = htmlTemplate("500 Internal Server Error", "Server Error");
        setHeaderTemplate(500, res, errMessage)
        res.end(errMessage);
    }
})

// Only start the server if this file is run directly (not imported by tests)
if (import.meta.url === `file://${process.argv[1]}`) {
    server.listen(PORT, () => {
        console.log("PORT 3000 in usage");
    });
}

export { server };
