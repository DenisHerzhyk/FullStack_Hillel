const middlewares = (app) => {
    app.use((req, res, next) => {
        res.status(404).send('Not Found');
        next();
    })

    app.use((err, req, res, next) => {
        console.log(err.stack);
        res.status(500).send('Internal Server Error');
        next();
    })
}

export {middlewares}