// Реалізація EXPRESS сервера відповідно до завдання, описаного у файлі ASSIGNMENT.md
import express from 'express';
import {responses} from './responses.mjs';
import {errorHandler} from '../middleware/errorHandler.mjs';
import { middlewaresHandler } from './middlewaresHandler.mjs';

const PORT = 3000;
const app = express();

middlewaresHandler(app);
responses(app);
errorHandler(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server, app };
