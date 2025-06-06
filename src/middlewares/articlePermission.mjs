const articlePermission = (req, res, next) => {
    switch(req.method) {
        case 'GET':
        case 'POST':
        case 'PUT':
        case 'DELETE':
            return next();
        default:
            return res.status(404).send('Not Found');
    }
}

export {articlePermission}