import { logger } from './middlewares/logger.mjs';
import { articlePermission } from './middlewares/articlePermission.mjs';
import { validateUser } from './middlewares/validateUser.mjs';
import { rootAccess } from './middlewares/rootAccess.mjs';
import { authenticate } from './middlewares/authenticate.mjs';
import session from 'express-session'
import express from 'express';

const middlewaresHandler = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false
    }))
    app.use(logger)
    app.get('/', rootAccess)
    app.use('/users', authenticate, validateUser)
    app.use('/users/:userId', authenticate, validateUser)
    app.use('/articles', authenticate, articlePermission);
    app.use('/articles/:articleId', authenticate, articlePermission)
}

export {middlewaresHandler}