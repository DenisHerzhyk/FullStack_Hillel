const status400 = 'Bad Request'
const status404 = 'Not Found';

const VALID_ARTICLE_ID = '456';

const articleResponse = (app) => {
    app.get('/articles', (req, res) => {
        res.status(200).send('Get articles route')
    })  

    app.post('/articles', (req, res) => {
        if (!req.body.title || req.body.title.trim() === '') {
            return res.status(400).send(status400);
        }

        res.status(201).send('Post articles route')
    })

    app.get('/articles/:articleId', (req, res) => {
        const articleId = req.params.articleId;
        if (articleId !== VALID_ARTICLE_ID) {
            return res.status(404).send(status404);
        }
        res.status(200).send(`Get article by Id route: ${articleId}`);
    })

    app.put('/articles/:articleId', (req, res) => {
        const articleId = req.params.articleId;
        if (articleId !== VALID_ARTICLE_ID) {
            return res.status(404).send(status404);
        }
        if (!req.body.title || req.body.title.trim() === '') {
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
