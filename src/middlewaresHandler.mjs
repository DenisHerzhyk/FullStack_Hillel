import { logger } from '../middleware/logger.mjs';
import { articlePermission } from '../middleware/articlePermission.mjs';
import { validateUser } from '../middleware/validateUser.mjs';
import { rootAccess } from '../middleware/rootAccess.mjs';
import { authenticate } from '../middleware/authenticate.mjs';
import session from 'express-session'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pug from 'pug';
import ejs from 'ejs';
import fs from 'fs';

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
    
    const originalRender = app.response.render;
    app.response.render = function(view, options, callback) {
        const viewsDir = path.join(__dirname, '../views');
        
        const pugFile = path.join(viewsDir, `${view}.pug`);
        if (fs.existsSync(pugFile)) {
            const pugTemplate = pug.compileFile(pugFile);
            const html = pugTemplate(options);
            this.send(html);
        } else {
            const ejsFile = path.join(viewsDir, `${view}.ejs`);
            if (fs.existsSync(ejsFile)) {
                const template = fs.readFileSync(ejsFile, 'utf8');
                const html = ejs.render(template, options);
                this.send(html);
            } else {
                originalRender.call(this, view, options, callback);
            }
        }
    };
    
    app.use(logger)
    app.get('/', rootAccess)
    app.use('/users', authenticate, validateUser)
    app.use('/users/:userId', authenticate, validateUser)
    app.use('/articles', authenticate, articlePermission);
    app.use('/articles/:articleId', authenticate, articlePermission)
}

export {middlewaresHandler}