const validateUser = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || !req.body.name) {
            return res.status(403).send('Invalid data for user')
        }
    }
    next()
}

export {validateUser}