const articlePermission = (req, res, next) => {
    // Allow POST requests to set permission
    if (req.method === 'POST') {
        return next();
    }
    
    // Check permission for other methods
    if (!req.session.hasPermission) {
        return res.status(403).send('Insufficient permissions')
    }
    next()
}

export {articlePermission}