const rootResponse = (app) => {
    app.get('/',(req, res) => {
        res.status(200).send('Get root route');
    })
}

export {rootResponse}