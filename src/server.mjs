// Реалізація EXPRESS сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md

// Імпортуємо необхідні модулі
import express from 'express';
import {responses} from './responses.mjs';
import {middlewares} from './middlewares.mjs';
// Створюємо EXPRESS сервер
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

responses(app);
middlewares(app);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Експорт для тестів
export { server, app };
