import { logger } from '../middleware/logger.mjs';
import { articlePermission } from '../middleware/articlePermission.mjs';
import { validateUser } from '../middleware/validateUser.mjs';
import { rootAccess } from '../middleware/rootAccess.mjs';
import { authenticate } from '../middleware/authenticate.mjs';
import session from 'express-session'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middlewaresHandler = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false
    }))
    app.set('views', path.join(__dirname, '../views'))
    app.use(logger)
    app.get('/', rootAccess)
    app.use('/users', authenticate, validateUser)
    app.use('/users/:userId', authenticate, validateUser)
    app.use('/articles', authenticate, articlePermission);
    app.use('/articles/:articleId', authenticate, articlePermission)
}

export {middlewaresHandler}