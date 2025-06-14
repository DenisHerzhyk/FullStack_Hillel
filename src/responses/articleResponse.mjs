const status400 = 'Bad Request'
const status404 = 'Not Found';

const VALID_ARTICLE_ID = '456';
const ARTICLES = {'456': 'Sample article detail'}

const articleResponse = (app) => {
    app.get('/articles', (req, res) => {
        const data = {title: 'articles get', articles: ARTICLES}
        res.status(200).render('articles', data)
    })  

    app.post('/articles', (req, res) => {
        req.session.hasPermission = true;
        if (!req.body || !req.body.title || req.body.title.trim() === '') {
            return res.status(400).send(status400);
        }

        res.status(201).send('Post articles route')
    })

    app.get('/articles/:articleId', (req, res) => {
        const articleId = req.params.articleId;
        if (articleId !== VALID_ARTICLE_ID) {
            return res.status(404).send(status404);
        }
        const data = {title: 'article detail', article: ARTICLES[articleId]}
        res.status(200).render('articleId', data)
    })

    app.put('/articles/:articleId', (req, res) => {
        const articleId = req.params.articleId;
        if (articleId !== VALID_ARTICLE_ID) {
            return res.status(404).send(status404);
        }
        if (!req.body || !req.body.title || req.body.title.trim() === '') {
            return res.status(400).send(status400);
        }
        res.status(200).send(`Put article by Id route: ${articleId}`);
    })

    app.delete('/articles/:articleId', (req, res) => {
        const articleId = req.params.articleId;
        if (articleId !== VALID_ARTICLE_ID) {
            return res.status(404).send(status404);
        }
        res.status(204).send();
    })
}

export {articleResponse}
