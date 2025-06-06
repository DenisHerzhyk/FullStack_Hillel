import { logger } from '../middleware/logger.mjs';
import { articlePermission } from '../middleware/articlePermission.mjs';
import { validateUser } from '../middleware/validateUser.mjs';
import { rootAccess } from '../middleware/rootAccess.mjs';
import { authenticate } from '../middleware/authenticate.mjs';
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